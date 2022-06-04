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

Note the launchSettings.json in vs solution's Properties folder
```json
{
  "profiles": {
    "DotNet6AngularSPApp_Run_Local": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7096;http://localhost:5096", // the port value here can be arbitary
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "LocalDevelopment",
        "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.SpaProxy" // this is needed if run from local vs2022
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "LocalDevelopment",
        "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES": "Microsoft.AspNetCore.SpaProxy" // this is needed if run from local vs2022 
      }
    }
  }
}
```

The API service using the Azure Application Insight for logging, please check your Azure WebApp's APPLICATIONINSIGHTS_CONNECTION_STRING once it's been deployed to Azure WebApp resource.
