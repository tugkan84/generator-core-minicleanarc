let Commands = function (folder, name, sdk) {
    this.projectFolder = folder ? folder : name;
    this.projectName = name;
    this.sdk = sdk;

    this.scripts = CreateScripts(this.projectName, this.projectFolder, this.sdk);
};

const CreateScripts = (projectName, projectFolder, sdk) => {
    this.apiName = projectName + '.API';
    this.coreName = projectName + '.Core';
    this.infraName = projectName + '.Infrastructure';

    this.apiCsproj = projectName + '.API.csproj';
    this.coreCsproj = projectName + '.Core.csproj';
    this.infraCsproj = projectName + '.Infrastructure.csproj';

    const scripts = [
        { script: 'mkdir ' + projectFolder, folder: undefined },
        { script: 'dotnet new sln --name ' + projectName, folder: projectFolder },
        { script: 'dotnet new webapi --name ' + this.apiName, folder: projectFolder },
        { script: 'dotnet new classlib --name ' + this.coreName + ' -f netcoreapp' + sdk, folder: projectFolder },
        { script: 'dotnet new classlib --name ' + this.infraName + ' -f netcoreapp' + sdk, folder: projectFolder },
        { script: 'dotnet sln add .\\' + this.apiName + '\\' + this.apiCsproj, folder: projectFolder },
        { script: 'dotnet sln add .\\' + this.coreName + '\\' + this.coreCsproj, folder: projectFolder },
        { script: 'dotnet sln add .\\' + this.infraName + '\\' + this.infraCsproj, folder: projectFolder },
        { message: 'Projects referencing...' },
        { script: 'dotnet add ' + this.apiName + '/' + this.apiCsproj + ' reference ' + this.infraName + '/' + this.infraCsproj + ' ' + this.coreName + '/' + this.coreCsproj, folder: projectFolder },
        { script: 'dotnet add ' + this.infraName + '/' + this.infraCsproj + ' reference ' + this.coreName + '/' + this.coreCsproj, folder: projectFolder },
        { message: 'Packages preparing for api...' },
        { script: 'cd ' + this.apiName + ' && dotnet add package MediatR', folder: projectFolder },
        { script: 'cd ' + this.apiName + ' && dotnet add package MediatR.Extensions.Microsoft.DependencyInjection ', folder: projectFolder },
        { script: 'cd ' + this.apiName + ' && dotnet add package Microsoft.Extensions.DependencyInjection -v ' + sdk + '.0', folder: projectFolder },
        { script: 'cd ' + this.apiName + ' && dotnet add package Swashbuckle.AspNetCore', folder: projectFolder },
        { message: 'Packages preparing for core...' },
        { script: 'cd ' + this.coreName + ' && dotnet add package MediatR', folder: projectFolder },
        { script: 'cd ' + this.coreName + ' && dotnet add package Microsoft.Extensions.Logging -v ' + sdk + '.0', folder: projectFolder },
        { message: 'Packages preparing for infrastructure...' },
        { script: 'cd ' + this.infraName + ' && dotnet add package Microsoft.EntityFrameworkCore.SqlServer -v ' + sdk + '.0', folder: projectFolder },
        { script: 'cd ' + this.infraName + ' && dotnet add package Microsoft.EntityFrameworkCore.Design', folder: projectFolder },
        { script: 'cd ' + this.infraName + ' && dotnet add package Microsoft.EntityFrameworkCore.Tools -v ' + sdk + '.0', folder: projectFolder },
        { script: 'dotnet restore', folder: projectFolder },
        { script: 'dotnet build ' + projectName + '.sln', folder: projectFolder },
    ];

    if (sdk == '3.0') {
        scripts.push([
            { script:'cd ' + this.apiName + ' && dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 3.0.0', folder: projectFolder },
            { script:'cd ' + this.apiName + ' && dotnet add package Microsoft.AspNetCore.Mvc.Formatters.Json', folder: projectFolder }
        ]);
    }
   
    return scripts;
}

module.exports = Commands;

//    await execFunc('mkdir ' + projectFolder);
//    await execFunc('dotnet new sln --name ' + data.projectName, projectFolder);
//    await execFunc('dotnet new webapi --name ' +apiName , projectFolder);
//    await execFunc('dotnet new classlib --name ' + coreName+ ' -f netcoreapp2.2', projectFolder);
//    await execFunc(, projectFolder);
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
