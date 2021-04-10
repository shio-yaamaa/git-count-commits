use std::process::Command;

fn main() {
    let output = Command::new("git").arg("ls-files").output().unwrap();

    if !output.status.success() {
        panic!("Failed to execute command");
    }

    println!("{:?}", output.stdout);
}
