let { exec } = require('child_process');

let execFunc = (str, folder) => {
    console.log(str);
    return new Promise((resolve, reject) => {
        if (folder) {
           str = 'cd ' + folder + ' && ' + str;
        } 
        exec(str, (err, stdout, stderr) => {
            if (err) {
                reject(err);   
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}

const  create = async (data) => {
    
    let projectFolder = data.projectName;

    if (data.projectFolderName) {
        projectFolder = data.projectFolderName;
    }

   await execFunc('mkdir ' + projectFolder);
   await execFunc('dotnet new sln --name ' + data.projectName, projectFolder);
   await execFunc('dotnet new webapi --name ' + data.projectName + '.API', projectFolder);
   await execFunc('dotnet new classlib --name ' + data.projectName + '.Core', projectFolder);
   await execFunc('dotnet new classlib --name ' + data.projectName + '.Infrastructure', projectFolder);
   await execFunc('dotnet sln add .\\'+ data.projectName + '.API\\' + data.projectName + '.API.csproj', projectFolder);
   await execFunc('dotnet sln add .\\'+ data.projectName + '.Core\\' + data.projectName + '.Core.csproj', projectFolder);
   await execFunc('dotnet sln add .\\'+ data.projectName + '.Infrastructure\\' + data.projectName + '.Infrastructure.csproj', projectFolder);
   await execFunc('dotnet add ' + data.projectName + '.API/' + data.projectName + '.API.csproj reference '+ data.projectName + '.Infrastructure/' + data.projectName + '.Infrastructure.csproj', projectFolder);
   await execFunc('dotnet add ' + data.projectName + '.API/' + data.projectName + '.API.csproj reference '+ data.projectName + '.Infrastructure/' + data.projectName + '.Infrastructure.csproj', projectFolder);
   
   await execFunc('dotnet restore', projectFolder);
   await execFunc('dotnet build ' + data.projectName + '.sln', projectFolder);

}

module.exports = { create }