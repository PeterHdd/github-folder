import { commands, workspace, ExtensionContext, window } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as data from './data';


export function activate(context: ExtensionContext) {

		console.log('Congratulations, your extension "github-folder" is now active!');

	let disposable = commands.registerCommand('extension.github', (context) => {

		const githubPath   = path.join(workspace.rootPath as string, '.github');
		const templatePath = path.join(githubPath, 'ISSUE_TEMPLATE');
		mkdirp(templatePath,(err) => {
			if (err)
			{
				window.showErrorMessage(err.message);
				throw err;
			}
			else
			{
			fs.writeFile(templatePath +'/bug_report.md',data.bugData, (err) => {
				if (err)
				{
					window.showErrorMessage(err.message);
					throw err;
				}
				console.log('The file has been saved!');
				});
			fs.writeFile(templatePath +'/feature_request.md',data.featureData, (err) => {
				if (err)
				{
					window.showErrorMessage(err.message);
					throw err;
				}
				console.log('The file has been saved!');
				});
			fs.writeFile(githubPath +'/CODEOWNERS',data.codeOwners, (err) => {
				if (err)
				{
					window.showErrorMessage(err.message);
					throw err;
				}
				console.log('The file has been saved!');
				});
			fs.writeFile(githubPath +'/CODE_OF_CONDUCT.md',data.codeOFConduct, (err) => {
				if (err)
				{
					window.showErrorMessage(err.message);
					throw err;
				}
				console.log('The file has been saved!');
				});
			}
		  });
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
