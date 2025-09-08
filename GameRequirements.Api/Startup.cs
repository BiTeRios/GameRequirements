using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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

            // ⛔ НЕ добавляю Identity/JWT/EF/AutoMapper/репозитории — в архиве нет готовых реализаций.
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

            app.UseAuthorization();

            // === Хостинг SPA сборки (путь A: билд фронта лежит в wwwroot) ===
            app.UseDefaultFiles(); // ищет index.html в wwwroot
            app.UseStaticFiles();  // раздаёт js/css/img из wwwroot

            app.UseEndpoints(endpoints =>
            {
                // API
                endpoints.MapControllers();

                // SPA fallback — любые НЕ-API маршруты отдаём index.html
                endpoints.MapFallbackToFile("index.html");
            });
        }
    }
}
