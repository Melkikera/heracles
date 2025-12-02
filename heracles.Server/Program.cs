using heracles.Server.Data;
using heracles.Server.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddDbContext<AppDbContext>();
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
// Configure the HTTP request pipeline.
app.UseCors("CORSPolicy");

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
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