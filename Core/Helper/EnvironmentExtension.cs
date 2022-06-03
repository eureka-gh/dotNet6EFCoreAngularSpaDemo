namespace DotNet6AngularSPApp.Core.Helper
{
    public static class EnvironmentExtension
    {
        public static bool IsLocalDevelopment(this IHostEnvironment hostEnvironment)
        {
            return hostEnvironment.IsEnvironment("LocalDevelopment");
        }
    }
}
