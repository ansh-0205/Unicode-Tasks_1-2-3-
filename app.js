const express=require("express");

const app=express();

const bodyParser=require("body-parser");

const fetch=require('node-fetch');


//in order to get access to the post data
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
  console.log("Server on port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

const url="https://breakingbadapi.com/api/characters";
//async returns a promise
async function getData(){
  const response=await fetch(url);
  //response.json returns a promise that resolves to a js object
  const data = await response.json();
  return data;
}
const a=getData();
a.then(d=>console.log(d));

app.post("/",function(req,res){
  //take the value entered by the user
  const n=req.body.query;
  async function postData(){
    const response=await fetch("https://breakingbadapi.com/api/characters?name="+n);
    const data = await response.json();
    return data;
  }
  const character=postData();
  character.then(c=>{
    var nm=c[0].name;
    var bd=c[0].birthday;
    var occ=c[0].occupation;
    var i=c[0].img;
    var stat=c[0].status;
    var nick=c[0].nickname;
    var p=c[0].portrayed;
    var cat=c[0].category;
    res.write("<h1>"+nm+"</h1>");
    res.write("<img src="+i+">");
    res.write("<p>Birthday :"+bd+"</p>");
    res.write("<p>Nick Name : "+nick+"</p>");
    res.write("<p>Occupation : "+occ+"</p>");
    res.write("<p>Status : "+stat+"</p>");
    res.write("<p>Portrayed By : "+p+"</p>");

    res.send();
  });

});
