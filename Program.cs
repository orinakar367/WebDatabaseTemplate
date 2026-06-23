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

        database.Database.EnsureCreated();

        Console.WriteLine("Server running...");
        Console.WriteLine($"Local:   http://localhost:{port}/website/pages/login.html");
        Console.WriteLine($"Network: http://{Network.GetLocalNetworkIPAddress()}:{port}/website/pages/login.html");

        while (true)
        {
            var request = server.WaitForRequest();

            Console.WriteLine("Received request: " + request.Name);

            try
            {
                if (request.Name == "signUp")
                {
                    SignUp(request, database);
                }
                else if (request.Name == "logIn")
                {
                    LogIn(request, database);
                }
                else if (request.Name == "userWon")
                {
                    var (time, difficulty, token) =
                        request.GetParams<(int, string, string)>();

                    var user = database.Users.FirstOrDefault(
                        user => user.Token == token
                    );

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

                    var gameResults = database.GameResults.ToList();

                    var leaderboard = gameResults
                        .Where(result =>
                            result.Difficulty.Trim().ToLower() ==
                            difficulty.Trim().ToLower()
                        )
                        .OrderBy(result => result.TimeInSeconds)
                        .Select(result => new LeaderboardEntry(
                            result.Username,
                            result.TimeInSeconds,
                            result.Difficulty
                        ))
                        .ToArray();

                    request.Respond(leaderboard);
                }
            }
            catch (Exception exception)
            {
                request.SetStatusCode(500);
                Log.WriteException(exception);
            }
        }
    }

    static void SignUp(Request request, Database database)
    {
        var (username, password) =
            request.GetParams<(string, string)>();

        bool usernameAlreadyExists =
            database.Users.Any(user => user.Name == username);

        if (usernameAlreadyExists)
        {
            request.Respond<string?>(null);
            return;
        }

        string token = Guid.NewGuid().ToString();

        var newUser = new User(token, username, password);

        database.Users.Add(newUser);
        database.SaveChanges();

        request.Respond(token);
    }

    static void LogIn(Request request, Database database)
    {
        var (username, password) =
            request.GetParams<(string, string)>();

        var user = database.Users.FirstOrDefault(
            user => user.Name == username &&
                    user.Password == password
        );

        if (user == null)
        {
            request.Respond<string?>(null);
            return;
        }

        request.Respond(user.Token);
    }

    static void GetUser(Request request, Database database)
    {
        string? token = request.GetParams<string?>();

        if (token == null)
        {
            request.Respond<User?>(null);
            return;
        }

        var user = database.Users.FirstOrDefault(
            user => user.Token == token
        );

        request.Respond(user);
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
    public string username { get; set; } = username;

    public int timeInSeconds { get; set; } = timeInSeconds;

    public string difficulty { get; set; } = difficulty;
}