using GameRequirements.Bll;
using GameRequirements.Bll.BL;
using GameRequirements.Bll.Helper.Token;
using GameRequirements.Bll.Interface;
using GameRequirements.Dal.Core;
using GameRequirements.Domain.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using GameRequirements.Api.Middleware;

namespace GameRequirements.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration) => Configuration = configuration;
        public IConfiguration Configuration { get; }

        public void AddServices(IServiceCollection services)
        {
            //Controllers
            services.AddControllers();
            
            services.Configure<ApiBehaviorOptions>(opt =>
            {
                opt.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState
                        .Where(kvp => kvp.Value?.Errors.Count > 0)
                        .ToDictionary(
                            kvp => kvp.Key,
                            kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
                        );

                    var body = new
                    {
                        message = "Validation failed",
                        errorCode = "validation_error",
                        errors
                    };

                    return new BadRequestObjectResult(body);
                };
            });
            //Swagger 
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            // CORS (для разработки фронта на Vite)
            services.AddCors(opt =>
            {
                opt.AddPolicy("ui-dev", p =>
                    p.WithOrigins("http://localhost:5173") // Vite dev server
                     .AllowAnyHeader()
                     .AllowAnyMethod()
                     .AllowCredentials());
            });

            // Конфигурация токена
            services.Configure<TokenConfiguration>(Configuration.GetSection("TokenConfiguration"));

            // DataContext (EF Core)
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            // Репозитории
            services.AddScoped<UserRepository>();

            // Токены
            services.AddScoped<TokenService>();

            // Сервисы
            services.AddScoped<ISessionBL, SessionBL>();
            services.AddScoped<BussinesLogic>();
        }

        // 2) HTTP-пайплайн
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionHandlingMiddleware>();

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
            app.UseCors("ui-dev");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                // API
                endpoints.MapControllers();

                // SPA fallback 
                endpoints.MapFallbackToFile("index.html");
            });
        }
    }
}
