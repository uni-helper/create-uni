#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use napi::Result;

use tao::{
  event::{Event, WindowEvent},
  event_loop::{ControlFlow, EventLoop},
  window::WindowBuilder,
};
use wry::WebViewBuilder;

use rfd::FileDialog;
use std::env;
use std::path::PathBuf;

#[napi]
pub fn create_webview() -> Result<()> {
  let event_loop = EventLoop::new();
  let window = WindowBuilder::new().build(&event_loop).unwrap();

  let _webview = WebViewBuilder::new()
    .with_url("http://localhost:5173/")
    .build(&window)
    .unwrap();

  event_loop.run(move |event, _, control_flow| {
    *control_flow = ControlFlow::Wait;

    if let Event::WindowEvent {
      event: WindowEvent::CloseRequested,
      ..
    } = event
    {
      *control_flow = ControlFlow::Exit;
    }
  });
}


#[napi]
pub fn open() {
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
