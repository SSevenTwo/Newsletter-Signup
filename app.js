//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

var app = express();

//Set up middle ware
app.use(bodyParser.urlencoded({extended:true}));
//This enables use of static files like our css and images
//You have to have the files in a public folder.
app.use(express.static("public"));

//Routing
app.get("/",function(req,res){

  // axios.get('http://coreteaching01.csit.rmit.edu.au/~e87149/wdt/services/customers/')
  // .then(function (response) {
  //   var customers = response.data;
  //   res.send("Hello " + customers[1].Name);
  // });

  res.sendFile(__dirname + "/signup.html");

});

app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  axios({
  method: 'post',
  url: 'https://us4.api.mailchimp.com/3.0/lists/4ded3b29cf',
  headers: {
    "Authorization":"anystring cb2664208ae742185cb04465a404a107-us4"
  },
  data: {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }
}).then(function (response) {
    console.log(response.status);
    if(response.status == 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  })
  .catch(function (error) {
    console.log(error.response.status);
    res.sendFile(__dirname + "/failure.html");
  });

});

app.get("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server running on port 3000");
});

//4ded3b29cf

//cb2664208ae742185cb04465a404a107-us4
