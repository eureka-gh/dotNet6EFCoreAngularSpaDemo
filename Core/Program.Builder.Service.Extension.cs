using Microsoft.EntityFrameworkCore;

using DataExplorerAPIService.DataModel;
using DataExplorerAPIService.Core.Options;
using DotNet6AngularSPApp.Core.Helper;

namespace DataExplorerAPIService.Core
{
    public static class ServiceExtension
    {
        public static void AddMiddlewareComponents(this IServiceCollection services, IConfiguration buildConfig, IWebHostEnvironment env)
        {
            //
            // Add services to the container.
            //

            // Add db factory
            var connStr = buildConfig.GetSection(DatabaseOptions.Name).Get<DatabaseOptions>().ConnectionString;
            services.AddDbContextFactory<ApplicationDbContext>(
                    options =>
                        options.UseSqlServer(connStr)
            );
            services.AddDatabaseDeveloperPageExceptionFilter();

            if (!env.IsLocalDevelopment()) //
            {
                // by default, it uses value from 'azure web app'/configuration/'application settings'/APPLICATIONINSIGHTS_CONNECTION_STRING
                services.AddApplicationInsightsTelemetry();
            }

            // TODO: vs. services.AddControllers();
            services.AddControllersWithViews();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }
    }
}
