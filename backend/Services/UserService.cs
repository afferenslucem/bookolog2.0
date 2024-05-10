using bookolog.Models;
using bookolog.Storages;
using bookolog.Utils;
using Microsoft.EntityFrameworkCore;

namespace bookolog.Services;

public interface IUserService
{
    public Task<User> Register(RegistrationModel model);
    public Task<bool> IsEmailExits(string email);
    public Task<bool> IsLoginExits(string login);
    public Task<User?> CheckUser(AuthenticationModel data);
    public Task<User?> GetUser(int id);
}

public class UserService : IUserService
{
    private SHA256Hasher _hasher = new();
    private BookologContext dbContext;

    public UserService(BookologContext dbContext)
    {
        this.dbContext = dbContext;
    }


    public async Task<User?> CheckUser(AuthenticationModel model)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(user => user.Login == model.Login);

        if (user == null)
        {
            return null;
        }

        return _hasher.GetSHA256Hash(model.Password + user.Salt) == user.PasswordHash ? user : null;
    }

    public async Task<User> Register(RegistrationModel model)
    {
        var salt = _hasher.GetSalt();

        var user = new User
        {
            Login = model.Login,
            Email = model.Email,
            PasswordHash = _hasher.GetSHA256Hash(model.Password + salt),
            Salt = salt
        };

        await dbContext.Users.AddAsync(user);

        await dbContext.SaveChangesAsync();

        return user.WithoutPrivate();
    }

    public async Task<bool> IsEmailExits(string email)
    {
        var result = await dbContext.Users.FirstOrDefaultAsync(item => item.Email == email);

        return result != null;
    }

    public async Task<bool> IsLoginExits(string login)
    {
        var result = await dbContext.Users.FirstOrDefaultAsync(item => item.Login == login);

        return result != null;
    }

    public async Task<User?> GetUser(int id)
    {
        var result = await dbContext.Users.FirstOrDefaultAsync(item => item.Id == id);

        return result;
    }
}