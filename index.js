const PORT = 8000
const express = require("express")
const axios = require("axios");
require('dotenv').config()
const app = express()
const cors = require("cors")

app.use(cors())

app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '4'},
        headers: {
          'x-rapidapi-host': 'random-words5.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPID_API_KEY
        }
      };      
      axios.request(options).then((response) => {
          console.log(response.data);
          res.json(response.data[0])
      }).catch((error) => {
          console.error(error);
      });
})

app.get('/check', (req, res) => {
    const word = req.query.word
    const options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
        params: {entry: word},
        headers: {
          'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          res.json(response.data.result_code)
      }).catch(function (error) {
          console.error(error);
      });
})



app.listen(PORT, () => console.log("Server running on PORT " + PORT))

