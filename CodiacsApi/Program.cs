using CodiacsApi.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using System.Data;
using System.IO;
using System.Text;
using System.Net.Mail;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.ResponseCompression;
using System.Text.RegularExpressions;



var builder = WebApplication.CreateBuilder(args);

// Configure SQL Server connection string
var connectionString = "Server=tcp:codiacs.database.windows.net,1433;Initial Catalog=digital-therapy-room-db;Persist Security Info=False;User ID=codiacs_admin;Password=Volcano1110;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowCredentials().AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000/");
    });
});

builder.Services.AddResponseCompression(options =>

{

    options.EnableForHttps = true;

    options.Providers.Add<BrotliCompressionProvider>();

    options.Providers.Add<GzipCompressionProvider>();

});

builder.Services.AddHttpContextAccessor();
builder.Services.AddSqlServer<digitaltherapyroomdbContext>(connectionString);
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddAuthorization(options =>

{

    options.FallbackPolicy = options.DefaultPolicy;

});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseResponseCompression();

app.MapGet("/Feeling", (digitaltherapyroomdbContext db) =>
{
    return Results.Ok(db.Feelings.ToList());
});

app.Run();

