#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{
    fs::File,
    io::{self, Cursor},
};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn download_file(url: String, file_path: String) -> bool {
    let response = reqwest::get(url).await.expect("Error while downloading");
    let bytes = response
        .bytes()
        .await
        .expect("Error while reading response");

    let mut content = Cursor::new(bytes);
    let mut out = File::create(&file_path).expect("failed to create file");
    io::copy(&mut content, &mut out).expect("failed to copy content");
    println!("Successfully downloaded file to {}", file_path);
    return true;
}