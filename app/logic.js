let { exec } = require('child_process');
const Commands = require('./commands');

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

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const create = async (data) => {
   
    let netSdk = '';
    // let netSdk = await exec('dotnet --version', (err, stdout, stderr) => {
    //     if (err) {
    //         console.error(err);
    //     }
    //     console.log('Net Core Sdk:',stdout);
    //     return stdout.split('.')[0]+'.'+stdout.split('.')[1];
    // });

     await execFunc('dotnet --version').then( r => {
         netSdk = r.split('.')[0]+'.'+r.split('.')[1];
        }
    );

    const command = new Commands(data.projectFolderName, data.projectName, netSdk);
    data.projectFolder = command.projectFolder;
   
    await asyncForEach(command.scripts, async (element) => {
        element.message ? console.log(element.message) :await execFunc(element.script, element.folder) ;
        // if (element.message) {
        //     console.log(element.message);
        // } else {
        //     await execFunc(element.script, element.folder);
        // }
    })

    //    await execFunc('mkdir ' + projectFolder);
    //    await execFunc('dotnet new sln --name ' + data.projectName, projectFolder);
    //    await execFunc('dotnet new webapi --name ' +apiName , projectFolder);
    //    await execFunc('dotnet new classlib --name ' + coreName+ ' -f netcoreapp2.2', projectFolder);
    //    await execFunc('dotnet new classlib --name ' + infraName+ ' -f netcoreapp2.2', projectFolder);
    //    await execFunc('dotnet sln add .\\'+ apiName + '\\' + makeCsproj(apiName), projectFolder);
    //    await execFunc('dotnet sln add .\\'+ coreName + '\\' + makeCsproj(coreName), projectFolder);
    //    await execFunc('dotnet sln add .\\'+ infraName + '\\' + makeCsproj(infraName), projectFolder);
    //    console.log('Projects referencing...')      
    //    await execFunc('dotnet add ' + apiName + '/' + makeCsproj(apiName) +' reference '+ infraName + '/' + makeCsproj(infraName)+ ' ' +coreName + '/' + makeCsproj(coreName) , projectFolder);
    //    await execFunc('dotnet add ' + infraName + '/' + makeCsproj(infraName) +' reference '+ coreName + '/' + makeCsproj(coreName), projectFolder);
    //    console.log('Packages preparing for api...')      
    //    await execFunc('cd '+apiName+' && dotnet add package MediatR', projectFolder);
    //    await execFunc('cd '+apiName+' && dotnet add package MediatR.Extensions.Microsoft.DependencyInjection ', projectFolder);
    //    await execFunc('cd '+apiName+' && dotnet add package Microsoft.Extensions.DependencyInjection -v 2.2.0', projectFolder);
    //    await execFunc('cd '+apiName+' && dotnet add package Swashbuckle.AspNetCore', projectFolder);

    //    console.log('Packages preparing for core...')      
    //    await execFunc('cd '+coreName+' && dotnet add package MediatR', projectFolder);
    //    await execFunc('cd '+coreName+' && dotnet add package Microsoft.Extensions.Logging -v 2.2.0', projectFolder);

    //    console.log('Packages preparing for infrastructure...')  
    //    await execFunc('cd '+infraName+' && dotnet add package Microsoft.EntityFrameworkCore.SqlServer -v 2.2.0', projectFolder);
    //    await execFunc('cd '+infraName+' && dotnet add package Microsoft.EntityFrameworkCore.Design', projectFolder);
    //    await execFunc('cd '+infraName+' && dotnet add package Microsoft.EntityFrameworkCore.Tools -v 2.2.0', projectFolder);

    //    await execFunc('dotnet restore', projectFolder);
    //    await execFunc('dotnet build ' + data.projectName + '.sln', projectFolder);

}

module.exports = { create }