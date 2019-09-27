var Generator = require('yeoman-generator');
const { create } = require('./logic');

module.exports = class extends Generator {
    async prompting() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "projectName",
                message: "Your project name",
                default: this.appname // Default to current folder name
            },
            {
                type: 'input',
                name: 'projectFolderName',
                message: 'Enter Project Folder Name ...(Default:Project name)'
            }
        ]);
        create(answers);
    }
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        // Next, add your custom code
        //this.option('babel'); // This method adds support for a `--babel` flag
    }

    // method1() {
    //     this.log('method 1 just ran');
    // }

    // method2() {
    //     this.log('method 2 just ran');
    // }
};

