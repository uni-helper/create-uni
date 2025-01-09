#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use napi::Result;

use tao::{
  event::{Event, WindowEvent},
  event_loop::{ControlFlow, EventLoopBuilder},
  window::WindowBuilder,
};
use wry::{dpi::LogicalSize, http::Request, WebViewBuilder};

use rfd::FileDialog;
use std::env;
use std::path::PathBuf;
use webbrowser::{open_browser, Browser::Default};

enum UserEvent {
  FilePath,
  CloseWindow,
  DragWindow,
}

#[napi]
pub fn create_webview() -> Result<()> {
  let current_dir: PathBuf = env::current_dir().expect("Unable to get current working directory");
  let input = match env::var("CREATE_UNI_GUI_INPUT") {
    Ok(val) => val,
    Err(_) => String::from("default_value"),
  };

  let current_dir_str = current_dir.to_str().unwrap_or("");
  let escaped_current_dir_str = current_dir_str.replace("\\", "\\\\");

  let final_string = format!(
    "window.create_uni_current_dir=\"{}\";window.create_uni_data={}",
    escaped_current_dir_str, input
  );

  const WINDOW_WIDTH: u32 = 375;
  const WINDOW_HEIGHT: u32 = 667;

  let event_loop = EventLoopBuilder::<UserEvent>::with_user_event().build();
  let window = WindowBuilder::new()
    .with_inner_size(LogicalSize {
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
    })
    .with_title("Uni Creator")
    .with_resizable(false)
    .with_decorations(false)
    .build(&event_loop)
    .unwrap();

  let proxy = event_loop.create_proxy();
  let handler = move |req: Request<String>| {
    let body = req.body();
    let mut req = body.split(['|']);
    match req.next().unwrap() {
      "file_path" => {
        let _ = proxy.send_event(UserEvent::FilePath);
      }
      "drag_window" => {
        let _ = proxy.send_event(UserEvent::DragWindow);
      }
      "open" => {
        let url = req.next().unwrap();
        open_browser(Default, url).unwrap();
      }
      "close" => {
        let _ = proxy.send_event(UserEvent::CloseWindow);
      }
      "install" => {
        let message = req.next().unwrap();
        println!("{}", message);
        let _ = proxy.send_event(UserEvent::CloseWindow);
      }
      _ => {}
    }
  };

  #[cfg(debug_assertions)]
  let webview = WebViewBuilder::new()
    .with_url("http://localhost:4006/")
    .with_ipc_handler(handler)
    .with_initialization_script(&final_string)
    .build(&window)
    .unwrap();

  const HTML_CONTENT: &str = include_str!("ui/index.html");
  #[cfg(not(debug_assertions))]
  let webview = WebViewBuilder::new()
    .with_html(HTML_CONTENT)
    .with_ipc_handler(handler)
    .with_initialization_script(&final_string)
    .build(&window)
    .expect("Failed to build WebView in release mode");

  event_loop.run(move |event, _, control_flow| {
    *control_flow = ControlFlow::Wait;

    match event {
      Event::WindowEvent {
        event: WindowEvent::CloseRequested,
        ..
      }
      | Event::UserEvent(UserEvent::CloseWindow) => *control_flow = ControlFlow::Exit,

      Event::UserEvent(e) => match e {
        UserEvent::FilePath => {
          // Show file dialog to select a directory
          if let Some(path) = FileDialog::new()
            .set_title("Select a directory")
            .set_directory(&current_dir)
            .pick_folder()
          {
            let script = format!(
              r#"
              window.dispatchEvent(
                new CustomEvent('pathEvent', {{
                  detail: {{ path: '{}' }} 
              }})
              );
              "#,
              path.to_str().unwrap_or("").replace("\\", "\\\\")
            );
            webview.evaluate_script(&script).unwrap();
          }
        }
        UserEvent::DragWindow => window.drag_window().unwrap(),
        UserEvent::CloseWindow => { /* handled above */ }
      },
      _ => (),
    }
  });
}
