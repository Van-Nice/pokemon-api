const http = require('http');
const url = require('url');
const db = require('better-sqlite3')('data/pokemon.db');
db.pragma('journal_mode = WAL');

const host = 'localhost';
const port = 8000;

const requestListener = function(req, res) {
    const queryObject = url.parse(req.url, true).query;
    // TODO: log just the name
    const name = queryObject.name;
    const nameQuery = name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
    console.log(nameQuery);
    // Possible endpoint parameters: name, type1, type2, total, hp, attack, defense, special-atk, special-def, speed, generation, legendary
    // Just start with name
    const dbObject = db.prepare("SELECT * FROM pokemon WHERE Name = ?").get(nameQuery);
    console.log(dbObject);
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    // TODO: figure out how to send a GET request to this end point ->
    // TODO: Then figure out how to take query parameters and turn them to variables ->
    // TODO: Use those parameters to format your database query

    res.end(`{"message": "This is a JSON response"}`);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});