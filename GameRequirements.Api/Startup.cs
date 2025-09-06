using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using GameRequirements.Api.Infrastructure.Extensions;
using GameRequirements.Bll;
using GameRequirements.Bll.Interfaces;
using GameRequirements.Bll.Services;
using GameRequirements.Dal;
using GameRequirements.Dal.Interfaces;
using GameRequirements.Dal.Repositories;
using GameRequirements.Domain.Auth;
using System.Data;

namespace GameRequirements.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // Use this method to add services to the container.
        public void AddServices(IServiceCollection services)
        {
            services.AddDbContext<GameRequirementsDbContext>(optionBuilder =>
            {
                optionBuilder.UseSqlServer(Configuration.GetConnectionString("GameRequirementsConnection"));
            });

            services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequiredLength = 8;
            })
            .AddEntityFrameworkStores<GameRequirementsDbContext>();

            var authOptions = services.ConfigureAuthOptions(Configuration);
            services.AddJwtAuthentication(authOptions);
            services.AddControllers();

            services.AddScoped<IRepository, EFCoreRepository>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IPublisherService, PublisherService>();
            services.AddAutoMapper(typeof(BllAssemblyMarker));
            services.AddSwagger(Configuration);
        }

        //Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseExceptionHandling();

            app.UseRouting();

            app.UseCors(configurePolicy => configurePolicy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDbTransaction();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}