import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.toggleCase', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            const toggledText = toggleCase(text);
            editor.edit(editBuilder => {
                editBuilder.replace(selection, toggledText);
            });
        }
    });

    context.subscriptions.push(disposable);
}

function toggleCase(text: string): string {
    console.log(text);
	if (text === text.toUpperCase()) {
		return text.toLowerCase();
	} else if (text === text.toLowerCase()) {
		return text.toUpperCase();
	} else {
		return text.toLowerCase();
	}
}
