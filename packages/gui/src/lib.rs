#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use napi::Result;

use tao::{
  event::{Event, StartCause, WindowEvent},
  event_loop::{ControlFlow, EventLoopBuilder},
  window::WindowBuilder,
};
use wry::{
  dpi::LogicalSize,
  http::Request,
  WebViewBuilder
};

use rfd::FileDialog;
use std::env;
use std::path::PathBuf;
use std::io::{self, Read};

enum UserEvent {
  FilePath,
  CloseWindow,
}

fn open() {
  // 获取当前工作目录
  let current_dir: PathBuf = env::current_dir().expect("无法获取当前工作目录");

  // 弹出文件目录选择框
  let folder_path = FileDialog::new()
    .set_title("选择一个目录")
    .set_directory(&current_dir)
    .pick_folder();

  // 检查是否选择了目录
  match folder_path {
    Some(path) => {
      println!("选择的目录路径: {:?}", path);
    }
    None => {
      println!("没有选择目录");
    }
  }
}

#[napi]
pub fn create_webview() -> Result<()> {
  let mut input = String::new();

  // 从标准输入读取数据到字符串
  match io::stdin().read_to_string(&mut input) {
      Ok(_) => {
        input.insert_str(0, "window.create_uni_data=");
      },
      Err(e) => {
          println!("Failed to read from stdin: {}", e);
      }
  }

  const WINDOW_HEIGHT: u32 = 728;
  const WINDOW_WIDTH: u32 = 450;

  let event_loop = EventLoopBuilder::<UserEvent>::with_user_event().build();
  let window = WindowBuilder::new()
    .with_inner_size(LogicalSize {
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
    })  
    .build(&event_loop)
    .unwrap();

  let proxy = event_loop.create_proxy();
  let handler = move |req: Request<String>| {
    let body = req.body();
    let mut req = body.split(['-']);
    match req.next().unwrap() {
      "file_path" => {
        println!("File path selected");
        let _ = proxy.send_event(UserEvent::FilePath);
      }
      _ => {}
    }
  };

  #[cfg(debug_assertions)] 
    let _webview = WebViewBuilder::new()
    .with_url("http://localhost:5173/")
    .with_ipc_handler(handler)
    .with_initialization_script(&input)
    .build(&window)
    .unwrap();
  

  const HTML_CONTENT: &str = include_str!("ui/index.html");
  #[cfg(not(debug_assertions))] 
    let _webview = WebViewBuilder::new()
      .with_html(HTML_CONTENT)
      .with_ipc_handler(handler)
      .with_initialization_script(&input)
      .build(&window)
      .expect("Failed to build WebView in release mode");
  

  event_loop.run(move |event, _, control_flow| {
    *control_flow = ControlFlow::Wait;

    match event {
      Event::WindowEvent {
        event: WindowEvent::CloseRequested,
        ..
      }
      | Event::UserEvent(UserEvent::CloseWindow) => {
        // let _ = menu_webview.take();
        *control_flow = ControlFlow::Exit
      }

      Event::UserEvent(e) => match e {
        UserEvent::FilePath => open(),
        UserEvent::CloseWindow => { /* handled above */ }
      },
      _ => (),
    }
  });
}
