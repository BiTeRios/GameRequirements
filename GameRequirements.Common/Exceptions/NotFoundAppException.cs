namespace GameRequirements.Common.Exceptions
{
    public sealed class NotFoundAppException : AppException
    {
        public NotFoundAppException(string message, string? errorCode = null)
            : base(message, 404, errorCode ?? "not_found") { }
    }
}
