import { HTMLBeautifyOptions, html } from 'js-beautify';
import * as vscode from 'vscode';

const DEFAULT_OPTIONS: HTMLBeautifyOptions = {
  templating: ['angular'],
  indent_handlebars: true,
  max_preserve_newlines: 2,
  end_with_newline: true,
  indent_inner_html: true,
  wrap_attributes: 'preserve',
  wrap_line_length: 140,
};

/**
 * Format the given HTML text using js-beautify and some hard-coded options
 */
export function formatHtmlDocument(text: string): string {
  const conf = vscode.workspace.getConfiguration('editor');
  const tabSize = conf?.get<number>('tabSize') ?? 2;
  const insertSpaces = conf?.get<boolean>('insertSpaces') ?? true;

  let formattedText = html(text, {
    ...DEFAULT_OPTIONS,
    indent_size: tabSize,
    indent_with_tabs: !insertSpaces,
    wrap_attributes_indent_size: tabSize
  });

  // Add whitespaces between the "@<if|else|defer|...>" and the "(" in Angular bindings
  // e.g. "@if(condition){" -> "@if (condition) {"
  // This probably needs to be improved to handle more complex cases but should be good enough for now
  formattedText = formattedText.replace(/@(.*?)\s*\(\s*(.*?)\s*\)\s*\{/g, '@$1 ($2) \{');

  // Add whitespaces between control flow statements without parentheses and the "{" in Angular bindings
  // e.g. "@empty{" -> "@empty {"
  // This probably needs to be improved to handle more complex cases but should be good enough for now
  formattedText = formattedText.replace(/@(.*?)\s*\{/g, '@$1 {');

  // Add whitespaces between the closing "}" and the "@" statement in Angular bindings
  // e.g. "}@else{" -> "} @else {"
  // This probably needs to be improved to handle more complex cases but should be good enough for now
  formattedText = formattedText.replace(/\}[ |\t]*@(.*?)[ |\t]*\{/g, '} @$1 {');

  // Add whitespaces between the "{{" and the "}}" in Angular bindings
  // e.g. "{{value}}" -> "{{ value }}"1
  // This probably needs to be improved to handle more complex cases but should be good enough for now
  formattedText = formattedText.replace(/\{\{[ |\t]*(.*?)[ |\t]*\}\}/g, '{{ $1 }}');

  return formattedText;
}
