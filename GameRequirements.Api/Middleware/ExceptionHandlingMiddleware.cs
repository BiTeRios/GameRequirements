using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json;
using GameRequirements.Common.Exceptions; // твои Forbidden/NotFound и т.п.

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    public ErrorHandlingMiddleware(RequestDelegate next) => _next = next;

    public async Task Invoke(HttpContext ctx)
    {
        try
        {
            await _next(ctx);
        }
        catch (ForbiddenException ex)
        {
            await Write(ctx, HttpStatusCode.Conflict, ex.Message); // 409 при конфликте email
        }
        catch (ValidationException ex)
        {
            await Write(ctx, HttpStatusCode.BadRequest, ex.Message);
        }
        catch (NotFoundAppException ex)
        {
            await Write(ctx, HttpStatusCode.NotFound, ex.Message);
        }
        catch (Exception ex)
        {
            await Write(ctx, HttpStatusCode.InternalServerError, "Internal server error", ex.Message);
        }
    }

    private static Task Write(HttpContext ctx, HttpStatusCode code, string message, object? details = null)
    {
        ctx.Response.ContentType = "application/json";
        ctx.Response.StatusCode = (int)code;
        var payload = new { message, details };
        return ctx.Response.WriteAsync(JsonSerializer.Serialize(payload));
    }
}
