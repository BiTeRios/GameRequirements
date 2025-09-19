using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using GameRequirements.Common.Exceptions;
using System.Linq;

namespace GameRequirements.Api.Middleware
{
    public sealed class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext ctx)
        {
            try
            {
                await _next(ctx);
            }
            catch (Exception ex)
            {
                await HandleAsync(ctx, ex, _logger);
            }
        }

        private static async Task HandleAsync(HttpContext ctx, Exception ex, ILogger logger)
        {
            var traceId = ctx.TraceIdentifier;

            int status;
            string message;
            string? errorCode = null;
            object? details = null;

            switch (ex)
            {
                case AppException appEx:
                    status = appEx.StatusCode;
                    message = appEx.Message;
                    errorCode = appEx.ErrorCode;
                    // логируем как Warning, т.к. это ожидаемая «бизнес» ошибка
                    logger.LogWarning(ex, "AppException {ErrorCode} {Message} TraceId={TraceId}", errorCode, message, traceId);
                    break;

                case UnauthorizedAccessException:
                    status = StatusCodes.Status401Unauthorized;
                    message = "Unauthorized";
                    errorCode = "unauthorized";
                    logger.LogWarning(ex, "Unauthorized TraceId={TraceId}", traceId);
                    break;

                default:
                    status = StatusCodes.Status500InternalServerError;
                    message = "Internal server error";
                    errorCode = "server_error";
                    // логируем как Error c трейсом
                    logger.LogError(ex, "Unhandled exception TraceId={TraceId}", traceId);
                    break;
            }

            // Единый JSON формат ответа
            var payload = new
            {
                message,
                errorCode,
                traceId
                // можно добавить details при необходимости (валидация и т.п.)
            };

            ctx.Response.ContentType = "application/json";
            ctx.Response.StatusCode = status;

            var json = JsonSerializer.Serialize(payload, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            await ctx.Response.WriteAsync(json);
        }
    }
}
