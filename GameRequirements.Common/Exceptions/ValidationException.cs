namespace GameRequirements.Common.Exceptions
{
    public sealed class ValidationAppException : AppException
    {
        public ValidationAppException(string message, string? errorCode = null)
            : base(message, 400, errorCode ?? "validation_error") { }
    }
}
