# dotNet6EFCoreAngularSpaDemo
A demo project for leveraging **.Net 6** + **EF core** + **Angular(13) SPA** with access to sql db in **visual studio 2022**

# prerequisite
- Visual studio 2022
- node.js 16.x.x
 - npm 8.1.0
> after opening .sln file, you need to add
```json
{
  "AzureSqlServer": {
    "ConnectionString": "{your-own-sql-db-secret}"
  }
}
```
> via visual studio **'Manage User Secrets'**
