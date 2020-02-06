# MicroProfile Language Support for VS Code

Provides language support for MicroProfile specifications in Java files, making use of the [MicroProfile Language Server](https://github.com/MicroShed/microprofile-language-server).

# How to Build 
1. Clone [MicroProfile Language Server](https://github.com/MicroShed/microprofile-language-server)
1. Clone [MicroProfile Language Support for VS Code](https://github.com/MicroShed/microprofile-lsp-client-vscode)
1. From `microprofile-language-server` directory: `mvn clean package` to generate `microprofile-language-server-0.0.1-SNAPSHOT.jar`
1. From `microprofile-lsp-client-vscode` directory: `npm install`
1. Copy `microprofile-language-server/target/microprofile-language-server-0.0.1-SNAPSHOT.jar` to `microprofile-lsp-client-vscode/jars/` folder 

## To Package as Extension
1. From `microprofile-lsp-client-vscode` directory: `vsce package` to generate `vscode-microprofile-0.0.1.vsix`

## To Install Extension in VS Code
1. Press Shift Command P to open the Command Palette 
1. Type `Extensions: Install from VSIX...` then press Enter
1. Navigate to and install `vscode-microprofile-0.0.1.vsix` 
1. Wait for a prompt at the bottom right of the screen to indicate that the extension has been installed. Click Reload Now on that prompt if indicated.

## To Run Extension in VS Code Debug Mode
1. Open `microprofile-lsp-client-vscode` in VS Code and switch to `Debug Perspective` 
1. Select `Launch MicroProfile LSP Client Extension`
