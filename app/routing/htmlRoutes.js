// Path Package
var path = require("path");

// Routing

module.exports = function(app) {

    // HTML Get Requests
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));        
    });
    // if not matching default to home
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));        
    });
};