# dotNet6EFCoreAngularSpaDemo
A demo project for leveraging **.Net 6** + **EF core** + **Angular(13) SPA** with access to sql db in **visual studio 2022**

# prerequisite
- Visual Studio 2022
   * node.js 16.x.x (this may comes with vs2022, better to check the version)
   * npm 8.1.0
> after opening .sln file, you need to add
```json
{
  "AzureSqlServer": {
    "ConnectionString": "{your-own-sql-db-secret}"
  }
}
```
> via visual studio **'Manage User Secrets'**

Note the launchSettings.json in vs2022 solution's Properties folder
```json
{
  "profiles": {
    "DotNet6AngularSPApp_Run_Local": {  // notice this name
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7096;http://localhost:5096", // the port value here can be arbitary
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "LocalDevelopment",
        "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.SpaProxy" // this is needed if run from local vs2022
      }
    }
}
```
> The profiles/**DotNet6AngularSPApp_Run_Local** is the one you should lauch for local debugging from vs2022, not IIS Express anymore as normal asp.net api project.
![image](https://user-images.githubusercontent.com/5110396/172029299-9c9226e1-4152-461d-a130-3ce307b1802c.png)


The API service using the Azure Application Insight for logging, please check your Azure WebApp's APPLICATIONINSIGHTS_CONNECTION_STRING once it's been deployed to Azure WebApp resource.
