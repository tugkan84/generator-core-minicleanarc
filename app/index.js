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
        await create(answers);
        let projectFolder = answers.projectName;
        let sdk = answers.sdk;

        if (answers.projectFolderName) {
            projectFolder = answers.projectFolderName;
        }

        this.fs.copyTpl(
            this.templatePath('Infrastructure'),
            this.destinationPath(projectFolder + '/' + answers.projectName + '.Infrastructure/'),
            {title : answers.projectName}
        );

        this.fs.copyTpl(
            this.templatePath('Core'),
            this.destinationPath(projectFolder + '/' + answers.projectName + '.Core/'),
            {title : answers.projectName}
        );
        this.fs.copyTpl(
            this.templatePath('Api'+ sdk),
            this.destinationPath(projectFolder + '/' + answers.projectName + '.API/'),
            {title : answers.projectName}
        );

        this.fs.delete(projectFolder + '/' + answers.projectName + '.Infrastructure/Class1.cs');
        this.fs.delete(projectFolder + '/' + answers.projectName + '.Core/Class1.cs');
    }
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        // Next, add your custom code
        //this.option('babel'); // This method adds support for a `--babel` flag
    }

    // writing() {
    //     this.fs.copyTpl(
    //       this.templatePath('AppDbContext.cs'),
    //       this.destinationPath( folderName() + this.answers.projectName+'.Infrastructure/'+ 'AppDbContext.cs'),
    //       //{ title: this.answers.title } // user answer `title` used
    //     );
    //   }
    // method1() {
    //     this.log('method 1 just ran');
    // }

    // method2() {
    //     this.log('method 2 just ran');
    // }

};

