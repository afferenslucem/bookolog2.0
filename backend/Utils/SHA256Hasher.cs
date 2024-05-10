using System.Security.Cryptography;
using System.Text;

namespace bookolog.Utils;

public class SHA256Hasher
{
    Random Random => Random.Shared;

    public string GetSHA256Hash(string password, string salt = "")
    {
        using SHA256 sha = SHA256.Create();

        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password + salt));

        var builder = new StringBuilder();

        foreach (var @byte in bytes)
        {
            builder.Append(@byte.ToString("x2"));
        }

        return builder.ToString();
    }

    public string GetSalt()
    {
        var bytes = new byte[64];

        this.Random.NextBytes(bytes);

        var builder = new StringBuilder();

        foreach (var @byte in bytes)
        {
            builder.Append(@byte.ToString("x2"));
        }

        return builder.ToString();
    }
}