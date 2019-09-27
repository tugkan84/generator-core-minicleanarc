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
        projectFolder = answers.projectName;

        if (answers.projectFolderName) {
            projectFolder = answers.projectFolderName;
        }

        this.fs.copyTpl(
            this.templatePath('AppDbContext.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Infrastructure/' + 'AppDbContext.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('Repository.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Infrastructure/' + 'Repositories/Repository.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('MovieConfiguration.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Infrastructure/' + 'EntityConfigurations/MovieConfiguration.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('CreateMovieHandler.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Services/MovieUseCases/CreateMovieHandler.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('GetBestMoviesForKidsHandler.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Services/MovieUseCases/GetBestMoviesForKidsHandler.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('Movie.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Models/Movie.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('EntityBase.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Models/EntityBase.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('IRepository.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Interfaces/IRepository.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('NewMovieCreatedEvent.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Events/NewMovieCreatedEvent.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('MovieDto.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Dtos/MovieDto.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('BaseResponseDto.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Dtos/BaseResponseDto.cs'),
        );
        
        this.fs.copyTpl(
            this.templatePath('GetBestMoviesForKidsRequest.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Dtos/Requests/GetBestMoviesForKidsRequest.cs'),
        );

        this.fs.copyTpl(
            this.templatePath('CreateMovieRequest.cs'),
            this.destinationPath(projectFolder+'/'+answers.projectName + '.Core/' + 'Dtos/Requests/CreateMovieRequest.cs'),
        );
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

