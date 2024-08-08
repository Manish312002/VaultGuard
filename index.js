//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url"
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const pass = "LetseeSecret";
const __dirname = dirname(fileURLToPath(import.meta.url))
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended:true}))

function checkPassword(req,res,next){
    console.log(req.body)
    if(pass === req.body['password']){
        userIsAuthorised = true;
    }
    next()
}

app.use(checkPassword);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.post('/check',(req,res)=>{
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
      } else {
        res.sendFile(__dirname + "/public/index.html");
        //Alternatively res.redirect("/");
      }
})

app.listen(port,()=>{

    console.log("The port is connected... : http://localhost:3000")
})