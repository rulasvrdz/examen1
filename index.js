var express = require('express'); 
var app = express(); 
const path = require("path");
const axios = require('axios');
const { render } = require('pug');

const ApiKey = '83fe170482734b21b3a7376c4a24d353'
const AUTH = '&key=' + ApiKey
const URL = 'https://api.opencagedata.com/geocode/v1/json?q='

let port = process.env.PORT || 8080

console.log("Server is running in port : " + port)


app.listen(port)



app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({
    extended: true
  }))

let Lat
let Long

app.get("/", (req, res) => {
    res.render("home");
  });
  
  app.post("/reversegeocoding", function (req, res){
    const {lat, long} = req.body;
    axios.get(URL + lat + "+" + long + AUTH)
        .then((resp) =>{
            let calle = resp.data.results[0].components.road
            let numero = resp.data.results[0].components.house_number
            let ciudad = resp.data.results[0].components.city
            let cp = resp.data.results[0].components.postcode
            let colonia = resp.data.results[0].components.neighbourhood
            let string = calle + " " + numero + " " + colonia + " " + cp + " " + ciudad
            res.send(string)
        })
        .catch(function (error){
            const {message} = error
            res.status(404).json({message})
        })
  });
  
