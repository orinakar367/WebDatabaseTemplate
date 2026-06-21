using System;
using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Project.DatabaseUtilities;
using Project.LoggingUtilities;
using Project.ServerUtilities;

class Program
{
    static void Main()
    {
        int port = 5000;

        var server = new Server(port);
        var database = new Database();

        database.Database.ExecuteSqlRaw(
            @"CREATE TABLE IF NOT EXISTS GameResults
            (
                Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                Username TEXT NOT NULL,
                TimeInSeconds INTEGER NOT NULL,
                Difficulty TEXT NOT NULL
            );"
        );

        Console.WriteLine("Server running...");

        while (true)
        {
            var request = server.WaitForRequest();

            try
            {
                if (request.Name == "userWon")
                {
                    var (time, difficulty, token) =
                        request.GetParams<(int, string, string)>();

                    var user = database.Users.FirstOrDefault(u => u.Token == token);

                    if (user == null)
                    {
                        request.Respond(false);
                        continue;
                    }

                    database.GameResults.Add(new GameResult(
                        user.Name,
                        time,
                        difficulty
                    ));

                    database.SaveChanges();

                    request.Respond(true);
                }

                else if (request.Name == "getLeaderboard")
                {
                    var difficulty = request.GetParams<string>();

                    var leaderboard = database.GameResults
                        .Where(r => r.Difficulty == difficulty)
                        .GroupBy(r => r.Username)
                        .Select(g => g.OrderBy(x => x.TimeInSeconds).First())
                        .OrderBy(r => r.TimeInSeconds)
                        .Select(r => new LeaderboardEntry(
                            r.Username,
                            r.TimeInSeconds,
                            r.Difficulty
                        ))
                        .ToArray();

                    request.Respond(leaderboard);
                }
            }
            catch (Exception ex)
            {
                request.SetStatusCode(500);
                Log.WriteException(ex);
            }
        }
    }

    class Database() : DatabaseCore("database")
    {
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<GameResult> GameResults { get; set; } = default!;
    }

    class User(string token, string name, string password)
    {
        public int Id { get; set; }

        [JsonIgnore]
        public string Token { get; set; } = token;

        public string Name { get; set; } = name;

        [JsonIgnore]
        public string Password { get; set; } = password;
    }
}

class GameResult(string username, int timeInSeconds, string difficulty)
{
    public int Id { get; set; }
    public string Username { get; set; } = username;
    public int TimeInSeconds { get; set; } = timeInSeconds;
    public string Difficulty { get; set; } = difficulty;
}

class LeaderboardEntry(string username, int timeInSeconds, string difficulty)
{
    public string Username { get; set; } = username;
    public int TimeInSeconds { get; set; } = timeInSeconds;
    public string Difficulty { get; set; } = difficulty;
}