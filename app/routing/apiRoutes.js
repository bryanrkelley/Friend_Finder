var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        //User's survey result is POSTed and parsed.
        var userData = req.body;
        var userScores = userData.scores;

        //This calculates the difference between the user scores and scores of those in the DB.
        var totalDifference = 0;

        //Loop through all friends
        for (var i = 0; i <friends.length; i++) {
            
            totalDifference = 0;

            //Loop through all scores of all frineds
            for (var j = 0; j < friends[i].scores[j]; j++) {

                //Calculate the differences between scores and add sum to totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                //If sum of differences is less then the differences of the current match
                if (totalDifference <= bestMatch.friendDifference) {

                    //Reset the bestMatch to be the new friend.
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        //Finally save the user's data to the database
        friends.push(userData);

        //Return JSON with the user's bestMatch.
        res.json(bestMatch);
    });

}