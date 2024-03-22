import * as vscode from 'vscode';
import { getFullRange } from './get-full-range';

export async function replaceTextInDocument(document: vscode.TextDocument, newText: string): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  await editor?.edit((editBuilder) => {
    editBuilder.replace(getFullRange(document), newText);
  });
}
