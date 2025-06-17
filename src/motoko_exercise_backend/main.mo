import Debug "mo:base/Debug"
actor {
  public query func greet(name : Text) : async Text {

    let currentValue = 3000000000000000000000000000000000000000000000;


    Debug.print("Hey it is working mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    Debug.print(debug_show(currentValue));
    return "Hello, " # name # "!";
  };
};
