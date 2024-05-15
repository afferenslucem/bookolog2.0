using bookolog.Services;
using bookolog.Storages;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.EntityFrameworkCore;

var configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json").Build();

var builder = WebApplication.CreateBuilder(args);

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IStatisticService, StatisticService>();
builder.Services.AddScoped<ISeriesService, SeriesService>();

builder.Services.AddDbContext<BookologContext>(options =>
    {
        options
            .UseNpgsql(configuration.GetConnectionString("BookologDatabase"));
    }
);

builder.Services.AddHttpLogging(options =>
    options.LoggingFields =
        HttpLoggingFields.RequestMethod | HttpLoggingFields.RequestPath | HttpLoggingFields.Duration);

builder.Services.AddCors();
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromDays(365);
        options.SlidingExpiration = true;
    });

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpLogging();

app.UseCors(options =>
{
    options.WithOrigins([
        "http://bookolog.ru",
        "https://bookolog.ru",
        "http://185.204.0.105.ru",
        "https://185.204.0.105.ru",
        "http://localhost:57787"
    ]).AllowCredentials().AllowAnyMethod().AllowAnyHeader();
});

app.UseCookiePolicy(new CookiePolicyOptions()
{
    CheckConsentNeeded = context => true,
    MinimumSameSitePolicy = SameSiteMode.Strict,
    HttpOnly = HttpOnlyPolicy.Always,
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();