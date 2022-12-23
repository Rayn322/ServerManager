#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_download::init())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_store::PluginBuilder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
