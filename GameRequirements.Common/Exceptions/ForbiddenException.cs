namespace GameRequirements.Common.Exceptions
{
    public sealed class ForbiddenAppException : AppException
    {
        public ForbiddenAppException(string message, string? errorCode = null)
            : base(message, 403, errorCode ?? "forbidden") { }
    }
}
