//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

var app = express();

//Set up middle ware
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  axios.get('http://coreteaching01.csit.rmit.edu.au/~e87149/wdt/services/customers/')
  .then(function (response) {
    var customers = response.data;
    res.send("Hello " + customers[1].Name);
  });

});

app.listen(3000,function(){
  console.log("Server running on port 3000");
});
