using bookolog.Models;
using Microsoft.EntityFrameworkCore;

namespace bookolog.Storages;

public class BookologContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Book> Books { get; set; }

    private ILoggerFactory loggerFactory = LoggerFactory.Create(builder => { builder.AddConsole(); });

    public BookologContext(DbContextOptions<BookologContext> options)
        : base(options) {}
    
    public BookologContext() {}
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex("Login").IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex("Email").IsUnique();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLoggerFactory(this.loggerFactory);
    }
}