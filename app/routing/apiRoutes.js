// Load Data (linking)

var friends = require("../data/friends");

// Routing
module.exports = function(app) {
    // API GET Requests
    app.get("/api/freinds", function(req, res) {
        res.json(friends);
    });
    // API POST Requests
    app.post("/api/friends", function(req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        // Result of user's survey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference = 0;

        // Loob through friends
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i].name);
            totalDifference = 0;

            // Loop in Scores
            for (var j = 0; j < friends[i].scores[j]; j++) {

                // Calculate Difference between the Scores and sum them into totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // If the Sum of Differences is Less the Difference of the Current "Best Match"
                if (totalDifference <= bestMatch.friendDifference) {
                    // Reset the bestMatch to be new
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // Save user's data to the database
        friends.push(userData);

        // Return a JSON with user's bestMatch
        res.json(bestMatch);
    
    });
};