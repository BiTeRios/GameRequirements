using GameRequirements.Bll;
using GameRequirements.Bll.BL;
using GameRequirements.Bll.Helper.Token;
using GameRequirements.Bll.Interface;
using GameRequirements.Dal.Core;
using GameRequirements.Domain.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using GameRequirements.Bll.Mapping;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Diagnostics;

namespace GameRequirements.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration) => Configuration = configuration;
        public IConfiguration Configuration { get; }

        // 1) Регистрация сервисов
        public void AddServices(IServiceCollection services)
        {
            // Только API-контроллеры — это у тебя есть.
            services.AddControllers();

            // Swagger (стандартный)
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            // CORS для дев-режима. Если будешь использовать прокси — он не обязателен, но и не мешает.
            services.AddCors(p =>
            {
                p.AddPolicy("DevUi", b => b
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());
            });

            // Конфигурация токена
            services.Configure<TokenConfiguration>(Configuration.GetSection("TokenConfiguration"));


            // DataContext (EF Core)
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(
                    Configuration.GetValue<string>("ConnectionStrings:DefaultConnection") ?? throw new InvalidOperationException(),
                    b =>
                    {
                        b.MigrationsAssembly("GameRequirements.Api");
                        b.CommandTimeout(60);
                    });
            });

            // Репозитории
            services.AddScoped<UserRepository>();
            services.AddScoped<HardwareRepository>();
            services.AddScoped<ComputerRepository>();
            services.AddScoped<GamesRepository>();

            // Токены
            services.AddScoped<TokenService>();

            // Сервисы
            services.AddScoped<ISessionBL, SessionBL>();
            services.AddScoped<IUserBL, UserBL>();
            services.AddScoped<IComputerBL, ComputerBL>();
            services.AddScoped<IPerformanceBL, PerformanceBL>();
            services.AddScoped<BussinesLogic>();
            services.AddAutoMapper(cfg => { }, typeof(Profiles).Assembly);

            var tokenCfg = new TokenConfiguration();
        Configuration.GetSection("TokenConfiguration").Bind(tokenCfg);

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(o =>
        {
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenCfg.SecretKey)),
                ValidateIssuer = true,
                ValidIssuer = tokenCfg.Issuer,
                ValidateAudience = true,
                ValidAudience = tokenCfg.Audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
            };
        });

    services.AddAuthorization(); // формально опционально, но ок явно указать
}
        // 2) HTTP-пайплайн
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseRouting();

            // В деве — ок. Если настроишь Vite-прокси, CORS можно выключить.
            app.UseCors("DevUi");

            app.UseAuthentication();
            app.UseAuthorization();

            // === Хостинг SPA сборки (путь A: билд фронта лежит в wwwroot) ===
            app.UseDefaultFiles(); // ищет index.html в wwwroot
            app.UseStaticFiles();  // раздаёт js/css/img из wwwroot
            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                // API
                endpoints.MapControllers();

                // SPA fallback — любые НЕ-API маршруты отдаём index.html
                endpoints.MapFallbackToFile("index.html");
            });
            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.StatusCode = 500;
                    context.Response.ContentType = "application/json";
                    var feature = context.Features.Get<IExceptionHandlerFeature>();
                    var message = feature?.Error?.Message ?? "Server error";
                    await context.Response.WriteAsync($"{{\"message\":\"{message}\"}}");
                });
            });
        }
    }
}
