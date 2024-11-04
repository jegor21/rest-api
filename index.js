const express = require('express');
const cors = require('cors');
const { type } = require('os');
const app = express();

app.use(cors());
app.use(express.json());

const games = [
    {id: 1, name: "Super Mario Bros. Wonder"},
    {id: 2, name: "Animal Crosing: New Horizons"},
    {id: 3, name: "Seiklus"},

]


app.get('/games/', (req,res) => 
{
    res.send(games)
})


//get method, returns one game from array by id, if id doesnt exits returns 404

app.get('/games/:id', (req, res) =>
{
    if (typeof games[req.param.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Game not found"});
    }
    res.send(games[req.param.Id - 1])
})



app.post('/games', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(404).send(
            {error: "One or multiple paramaters missing"});
    }
    let newGame = {
        id: games.length +1,
        price: req.body.price,
        name: req.body.name
    }
    games.push(newGame)
    res.status(201).location('localhost:8080/games/'
     + (games.length - 1)).send(newGame)
})


//deletes a game, where id is specified
//if game isnt found returns 404
//othwerise success 204 no content
app.delete('/games/:id', (req, res) =>
{
    if(typeof games[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send(
            {error: 'Game not found, no gaming for you'})
    }
    games.splice(req.params.id -1, 1)
    res.status(204).send({error: 'Content not contening (no content)'})

})

//app.put
app.put('/games', (req, res) => {
    res.send("PUT Request ")
})

app.listen(8080, () =>
    console.log(`Api töötab aadressil: http://localhost:8080`)
)


//yy