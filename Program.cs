using DataExplorerAPIService.Core;
using DotNet6AngularSPApp.Core.Helper;

var builder = WebApplication.CreateBuilder(args);
if (builder.Environment.IsLocalDevelopment())
{
    /*
        Why need this?
        https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-6.0&tabs=windows#register-the-user-secrets-configuration-source
        it says "WebApplication.CreateBuilder initializes a new instance of the WebApplicationBuilder class with preconfigured defaults. The initialized WebApplicationBuilder (builder) provides default configuration and calls AddUserSecrets when the EnvironmentName is Development".
        therefore, we need to include user secrets as json configuration provider explicitly
     */
    builder.Configuration.AddUserSecrets<Program>();
}

// Add services to the container.
builder.Services.AddMiddlewareComponents(builder.Configuration, builder.Environment);

var app = builder.Build();

app.SetupMiddlewareComponents();

app.Run();
