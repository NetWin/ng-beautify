import vscode from 'vscode';
import { formatHtmlDocument } from './formatters/html';
import { replaceTextInDocument } from './utils';

/**
 * Format the given document based on its language
 */
export async function formatDocument(doc: vscode.TextDocument): Promise<void> {
  const language = doc?.languageId;
  if (!language) {
    vscode.window.showWarningMessage('No language found for active document');
    return;
  }

  const text = doc?.getText();
  if (!text) {
    vscode.window.showWarningMessage('No text found in active document');
    return;
  }

  if (language !== 'html') {
    vscode.window.showWarningMessage(`Unsupported language: ${language}`);
    return;
  }

  const formattedText = formatHtmlDocument(text);
  await replaceTextInDocument(doc, formattedText);
}
