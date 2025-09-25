namespace GameRequirements.Common.Exceptions
{
    public sealed class ConflictAppException : AppException
    {
        public ConflictAppException(string message, string? errorCode = null)
            : base(message, 409, errorCode ?? "conflict") { }
    }
}