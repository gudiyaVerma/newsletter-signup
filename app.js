//jshint esversion: 6

const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { json } = require("body-parser");
const app = express();

// static function to access the static files like - css , photos etc;
 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("server is running on 3000....");
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html" );
});


app.post("/",function(req,res){
   const fisrtName= req.body.fisrt;
   const lastName=   req.body.last;
   const email=  req.body.mail;
   console.log(fisrtName,lastName,email);

 const data={
    members: [
        {
              email_address:email,
              status:"subscribed",
                merge_fields:{
                FNAME:fisrtName,
              LNAME:lastName
             }
        }
    ]
};
const jsonData = JSON.stringify(data);  




// how to post this data to external source?

const url = "https://us18.api.mailchimp.com/3.0/lists/7f74edd1f3 "
const options ={

    method:"POST",
    auth:"poonama:fadac35e94822498281b2919626b61e2-us18"
}
            const request = https.request(url,options,function(response){  
            response.on("data",function(data){
            console.log(JSON.parse(data));
              }) 
           });
    request.write(jsonData);
    request.end();
});
    // 
    
 



// fadac35e94822498281b2919626b61e2-us18
// api-key 
// 7e62d2d0416267bf0750d5ed8c592ff1-us18

//list id
//7f74edd1f3




       






          