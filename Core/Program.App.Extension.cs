using Microsoft.EntityFrameworkCore;

using DataExplorerAPIService.Core.Helper;
using DataExplorerAPIService.DataModel;
using DotNet6AngularSPApp.Core.Helper;

namespace DataExplorerAPIService.Core
{
    public static class AppExtension
    {
        public static void InitDb(this WebApplication app)
        {
            // init db
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var dbCtxFactory = services.GetRequiredService<IDbContextFactory<ApplicationDbContext>>();
                    using (var dbCtx = dbCtxFactory.CreateDbContext())
                    {
                        DbInitializer.Initialize(dbCtx);
                    }
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred creating the DB.");
                }
            }
        }

        public static void SetupMiddlewareComponents(this WebApplication app)
        {
            app.InitDb();
            var logger = app.Services.GetRequiredService<ILogger<Program>>();
            logger.LogInformation($">>> {app.Environment.EnvironmentName}");

            if (!app.Environment.IsProduction())
            {
                // enable Swagger in non-production env
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            if (!app.Environment.IsLocalDevelopment())
            {
                app.UseExceptionHandler("/Error");

                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                // force https in non debugging env
                app.UseHttpsRedirection();
            }
            
            app.UseAuthorization();
            
            // enable spa
            app.UseStaticFiles();
            app.UseRouting();
            
            app.MapControllers();
        }
    }
}