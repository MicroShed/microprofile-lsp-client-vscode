// This file was modified from https://github.com/camel-tooling/camel-lsp-client-vscode

'use strict';

import * as path from 'path';
import { workspace, ExtensionContext, window, StatusBarAlignment, commands, ViewColumn, TextEditor } from 'vscode';
import { LanguageClient, LanguageClientOptions, Executable } from 'vscode-languageclient';

const LANGUAGE_CLIENT_ID = 'LANGUAGE_ID_MICROPROFILE';

export function activate(context: ExtensionContext) {
	var path = require('path');
	var languageServerPath = context.asAbsolutePath(path.join('jars','microprofile-language-server-0.0.1-SNAPSHOT.jar'));
	console.log(languageServerPath);

    // Language server options 
	let serverOptions: Executable = {
		command: 'java',
		args: [ '-jar', languageServerPath],
		options: {stdio:'pipe'}
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		documentSelector: ['java'],
		synchronize: {
			configurationSection: ['java'],
			fileEvents: [
				workspace.createFileSystemWatcher('**/*.java')
			],
		}
	};

	let item = window.createStatusBarItem(StatusBarAlignment.Right, Number.MIN_VALUE);
	item.text = 'Starting MicroProfile Language Server...';
	toggleItem(window.activeTextEditor, item);
	// Create the language client and start the client.
	let languageClient = new LanguageClient(LANGUAGE_CLIENT_ID, 'Language Support for MicroProfile', serverOptions, clientOptions);
	languageClient.onReady().then(() => {
		item.text = 'MicroProfile Language Server started';
		toggleItem(window.activeTextEditor, item);
		commands.registerCommand('microprofile.open.output', ()=>{
            languageClient.outputChannel.show(ViewColumn.Three);
        }, (error: any) => {
            console.log(error)
        });

        window.onDidChangeActiveTextEditor((editor) =>{
            toggleItem(editor, item);
        });
    });

	let disposable = languageClient.start();
	context.subscriptions.push(disposable);
}

function toggleItem(editor: TextEditor, item) {
	if(editor && editor.document && (editor.document.languageId === 'java')) {
		item.show();
	} else {
		item.hide();
	}
}
