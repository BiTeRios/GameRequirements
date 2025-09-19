// GameRequirements.Common/Exceptions/UnauthorizedAppException.cs
namespace GameRequirements.Common.Exceptions
{
    /// <summary>
    /// 401 Unauthorized — некорректные или отсутствующие учетные данные.
    /// Примеры: неверный пароль, недействительный/просроченный access/refresh токен.
    /// </summary>
    public sealed class UnauthorizedAppException : AppException
    {
        public UnauthorizedAppException(string message, string? errorCode = null)
            : base(message, 401, errorCode) { }
    }
}
