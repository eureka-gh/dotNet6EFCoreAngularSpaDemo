namespace DataExplorerAPIService.Core.Options
{
    public class DatabaseOptions
    {
        public const string Name = "AzureSqlServer";

        public string ConnectionString { get; set; } = String.Empty;
    }
}
