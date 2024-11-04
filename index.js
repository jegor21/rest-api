const express = require("express");
const course = require("cors");
const { error } = require("console");
const app = express();

app.use(cors());
app.use(express.json());

const games = [
    { id: 1, name: "Super Mario Bros. Wonder"},
    { id: 2, name: "Subnatutica"},
    { id: 3, name: "Minecraft"},
]

// get method for any and all games in array
app.get ('/games/id', (req, res) => {
    res.send(games)
})


// get method, returns one game from array, by id. If id doesnt exist
// returns statuscode 404 - not found
app.get('/games', (req, res) =>
{
    if (typeof games [req.param.id -1] === 'undefined')
    {
        return res.status(404).send(
            {error: "Game not found, game not gaming"});
    }
    res.send(games[req.params.id -1])
})

// post method, adds a new game into the array. if parameters are missing
// returns bad request - 400
app.post('/games', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send(
            {error:"One or all params are missing"})
    }
    let newGame = {
        id: games.lenght +1,
        price: req.body.price,
        name: req.body.name
    }
    games.push(newGame)
    res.status(201).location('localhost:8080/games/'
        +(games.length -1)).send(newGame)
})

// delete method, deletes a game, where id is specified, if game is not found,
// returns statuscode 404 - notfound. otherwise
// returns succes 204 - no content
app.delete('/games/:id', (req, res) => {
    if (typeof games [req.params.id -1] === 'undefined') {
        return res.status(404).send({error:"Game not found"})
    }
    games.splice(req.params.id -1, 1)
    res.status(204).send({error:"No content"})
})

//
app.put('/games', (req, res) => {
    res.send("PUT request Called")
})

// define the addres upon which the app is running
app.listen(8080,() => {
    console,log("API töötab aadressil: http//localhost:8080")
})