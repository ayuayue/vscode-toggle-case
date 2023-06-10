import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.toggleCase",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        let range: vscode.Range | undefined;
        let text: string = "";

        if (!selection.isEmpty) {
          // 如果有选中文本，则切换选中文本的大小写
          range = selection;
          text = document.getText(range);
        } else {
          // 如果没有选中文本，则切换光标所在位置的单词的大小写
          const position = selection.active;
          const wordRange = document.getWordRangeAtPosition(position);
          if (wordRange) {
            range = wordRange;
            text = document.getText(range);
          }
        }

        if (range && text) {
          const toggledText = toggleCase(text);
          editor.edit((editBuilder) => {
            editBuilder.replace(range!, toggledText);
          });
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

function toggleCase(text: string): string {
  if (text === text.toUpperCase()) {
    return text.toLowerCase();
  } else if (text === text.toLowerCase()) {
    return text.toUpperCase();
  } else {
    return text.toLowerCase();
  }
}
