import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor {
  // Game record type
  public type Game = {
    id : Nat;
    name : Text;
    duration : Nat;
    betAmount : Nat;
    createdBy : Text;
  };

  // Stable variable to persist games
  stable var games : [Game] = [];
  stable var nextId : Nat = 0;

  // Create a new game
  public func createGame(name : Text, duration : Nat, betAmount : Nat, createdBy : Text) : async Nat {
    let id = nextId;
    let game : Game = {
      id = id;
      name = name;
      duration = duration;
      betAmount = betAmount;
      createdBy = createdBy;
    };
    games := Array.append(games, [game]);
    nextId += 1;
    id
  };

  // List all games
  public query func listGames() : async [Game] {
    games
  };

  // Get a game by id
  public query func getGame(id : Nat) : async ?Game {
    for (game in games.vals()) {
      if (game.id == id) return ?game;
    };
    null
  };

  // Example greet function (unchanged)
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
