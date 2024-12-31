#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use napi::Result;

use tao::{
  event::{Event, StartCause, WindowEvent}, 
  event_loop::{ControlFlow, EventLoopBuilder}, 
  window::{WindowBuilder}
};
use wry::{
  http::Request,
  WebViewBuilder,
};

use rfd::FileDialog;
use std::env;
use std::path::PathBuf;

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
  let event_loop = EventLoopBuilder::<UserEvent>::with_user_event().build();
  let window = WindowBuilder::new().build(&event_loop).unwrap();



  let proxy = event_loop.create_proxy();
  let handler = move |req: Request<String>| {
    println!("======handler=====");
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

  let _webview = WebViewBuilder::new()
  .with_url("http://localhost:5173/")
    .with_ipc_handler(handler)
    .build(&window)
  .unwrap();

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



