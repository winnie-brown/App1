const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>res.sendFile(`${__dirname}/newsletter.html`));
app.post("/",(req,res)=>{
const {fName,lName,email} = req.body;
    const subs = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
            }
        ]
    }
    const subsPost = JSON.stringify(subs);
    const url =  "https://us2.api.mailchimp.com/3.0/lists/07301d84d8";
    const options = {
        method:"POST",
        auth:"winston2022:da2d5e7fd5caf01f42aabe097bc3e8ee-us2"
    };
 const request = https.request(url,options,response=>{
     if(response.statusCode === 200 ){
        res.sendFile(`${__dirname}/success.html`);
     }else{
        res.sendFile(`${__dirname}/fail.html`);
     }
     console.log(response.statusCode);
});
request.write(subsPost);
request.end();
});
app.post("/newsletter/failure",(req,res)=>{
    res.redirect("/")
})
app.listen(port,()=>console.log("Server has started"));

// 07301d84d8
// da2d5e7fd5caf01f42aabe097bc3e8ee-us2