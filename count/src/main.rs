use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::process::Command;

#[derive(Debug)]
enum DirectoryItem {
    File,
    Folder,
}

#[derive(Debug)]
struct File {
    name: String,
    path: PathBuf,
}

#[derive(Debug)]
struct Folder {
    name: String,
    // path: String,
    children: HashMap<String, DirectoryItem>, // Key is the name of the DirectoryItem
}

fn main() {
    let directory_tree = Folder {
        name: String::from(""),
        // path: String::from("/"),
        children: HashMap::new(),
    };

    let command_output = Command::new("git").arg("ls-files").output().unwrap();

    if !command_output.status.success() {
        panic!("Failed to execute command");
    }

    let files_string = String::from_utf8(command_output.stdout).unwrap();
    let files: Vec<File> = files_string
        .lines()
        .map(|path| {
            let pathbuf = Path::new(path);
            let filename = pathbuf.file_name().unwrap().to_str().unwrap();
            File {
                name: filename.to_string(),
                path: pathbuf.to_owned(),
            }
        })
        .collect();

    files.iter().for_each(|file| {
        add_to_directory_tree(directory_tree, file);
    });

    println!("{:?}", files);
}

fn add_to_directory_tree(directory_tree: Folder, file: &File) -> Folder {
    let mut current_location = directory_tree;
    let components = file.path.components();
    let folder_names = components.slice(0, -1);
    while folder_names.length > 0 {
        let folder_name = folder_names.shift();
        if !current_location.children.has(folder_name) {
            current_location.children.set(
                folder_name,
                Folder {
                    name: folder_name,
                    children: HashMap::new(),
                },
            );
        }
        current_location = current_location.children.get(folder_name);
    }
    current_location.children.set(file.name, file);
    return directory_tree;
}
