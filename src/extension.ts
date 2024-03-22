import * as vscode from 'vscode';
import { formatDocument } from './format-document';

export function activate(context: vscode.ExtensionContext) {
	let subs = context.subscriptions;

	// Register the document formatting provider
	subs.push(vscode.languages.registerDocumentFormattingEditProvider('html', {
		provideDocumentFormattingEdits: async (doc) => {
			await formatDocument(doc);
			return [];
		}
	}));

	// Register the "Beautify File" command
	subs.push(vscode.commands.registerCommand('ng-beautify.format-file', async () => {
		const doc = vscode.window.activeTextEditor?.document;
		if (!doc) {
			vscode.window.showWarningMessage('No active document found');
			return;
		}

		await formatDocument(doc);
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }
