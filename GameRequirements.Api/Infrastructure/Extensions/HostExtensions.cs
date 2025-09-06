using GameRequirements.Api;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using GameRequirements.Dal;
using GameRequirements.Dal.Seed;
using GameRequirements.Domain.Auth;
using System;
using System.Threading.Tasks;

namespace GameRequirements.Api.Infrastructure.Extensions
{
    public static class HostExtensions
    {
        public static async Task SeedData(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<GameRequirementsDbContext>();
                    var userManager = services.GetRequiredService<UserManager<User>>();
                    context.Database.Migrate();

                    await PublishersSeed.Seed(context);
                    await BooksSeed.Seed(context);
                    await UsersSeed.Seed(userManager);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured during migration");
                }
            }
        }
    }
}