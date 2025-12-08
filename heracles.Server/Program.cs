using heracles.Server.Data;
using heracles.Server.Repositories;
using heracles.Server.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();

builder.Services.AddAuthentication("ApiKey")
    .AddScheme<Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>("ApiKey", options => { });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy", policy => policy.RequireRole("Admin").AddAuthenticationSchemes("ApiKey"));
});

// Remove duplicate AddDbContext registration to avoid ambiguous registrations during design-time
// builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddCors(options => {
    options.AddPolicy("CORSPolicy", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
// Configure in-memory database
//builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("InMemoryDb"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Ensure database exists and seed a default contact if none present (covers dev without migrations)
try
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // Try migrate if provider supports migrations; fall back to EnsureCreated
    try
    {
        db.Database.Migrate();
    }
    catch
    {
        db.Database.EnsureCreated();
    }

    if (!db.Contacts.Any())
    {
        db.Contacts.Add(new heracles.Server.Entities.Contact
        {
            Email = "me@example.com",
            Telephone = "+1 234 567 890",
            Mobile = "+1 987 654 321",
            PostalAddress = "123 Main St, City, Country",
            Facebook = "https://facebook.com/myprofile",
            LinkedIn = "https://linkedin.com/in/myprofile",
            Instagram = "https://instagram.com/myprofile",
            SchedulesJson = "{\"Monday\":\"9:00-17:00\",\"Tuesday\":\"9:00-17:00\",\"Wednesday\":\"9:00-17:00\",\"Thursday\":\"9:00-17:00\",\"Friday\":\"9:00-17:00\"}",
            SubmittedAt = DateTime.UtcNow,
            IsMine = true
        });
        db.SaveChanges();
    }
}
catch (Exception ex)
{
    Console.WriteLine("Error ensuring database/seed data: " + ex);
}

// Configure the HTTP request pipeline.
app.UseCors("CORSPolicy");

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

try
{
    app.MapControllers();
}
catch (ReflectionTypeLoadException rtle)
{
    Console.WriteLine("ReflectionTypeLoadException caught while mapping controllers:");
    foreach (var ex in rtle.LoaderExceptions)
    {
        Console.WriteLine(ex.ToString());
    }
    throw;
}
catch (Exception ex)
{
    Console.WriteLine("Exception caught while mapping controllers: " + ex);
    throw;
}

app.Run();