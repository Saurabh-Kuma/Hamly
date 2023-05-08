const express = require('express')
const path = require('path')
const safe= require("./safe")
const router = express.Router()
const axios = require('axios');
 
const uri= safe.uri
var config = safe.config
var dbinfo= safe.dbinfo
var data={}
var result={}  
    
router.get('/dashboard', (req, res)=>{
    res.render('withoutlogin')
})

router.get('/dashboard')

router.get('/dashboard/:email', (req, res)=>{ 
    //this is configuration of database 
    data = {
        ...config,
        url: uri+"/findOne",
        data: { 
        ...dbinfo,
        "filter":{
            "email": req.params.email
         } 
        }};  
    //here we pass config json data to run on database api
    axios(data)
    .then((respo) =>{
        if(respo.data.document==null){
            res.send("Invalid practice"+respo.data.document)
        }
        else{
            res.render('home', {
                "history": respo.data.document.history,
                "email": respo.data.document.email, 
                "name": respo.data.document.firstName+" "+respo.data.document.lastName,
                "total": respo.data.document.total,
                "spam":  respo.data.document.sapm
            })
            
        }
    })  
    
})
  
router.post('/dashboard/:email/submit', (req, res) =>{
    //check email is spam or not and change result element
    var result= "This is a result" 

    //this is configuration of database 
    data = {
        ...config,
        url: uri+"/updateOne",
        data: {
            ...dbinfo,
            "filter":{
                "email": req.params.email
            }, 
            "update": {
                "$push" : { 
                    "history":{
                        "$each": [{
                            "text": req.body.floatingTextarea2.replace(/`/g, "@backtick"),
                            "result": result
                        }],
                        "$position": 0
                    }
                }, 
                "$inc": { "total": 1 }
            }
        }
    };   
    console.log(req.body.floatingTextarea2) 
    //here we pass config json data to run on database api
    axios(data)
    .then((respo) =>{
        res.redirect("/dashboard/"+ req.params.email+"?message=first")
    })
}) 

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})

router.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/signup.html'))
}) 

router.get('/idcreated', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/idcreated.html'))
}) 


router.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/login.html'))
})

router.post('/login/submit', (req, res)=>{
    //it holds the data from post method
    let email= req.body.userid
    let password= req.body.pass

    //this is configuration of database
    data = {
        ...config,
        url: uri+"/findOne",
        data: {
        ...dbinfo,
        "filter":{
            "email": email
         } 
        }}; 
    //here we pass config json data to run on database api
    axios(data)
    .then((res) =>{
        check(res.data)
    })
    //this function is used for validate user
    function check(result){
        if(result.document==null){
            res.redirect("/login?message=invalid%20email")
        }
        else if(result.document.password== password){
            console.log("/dashboard/"+result.document.email)
            res.redirect("/dashboard/"+result.document.email)
        } 
        else{
            res.redirect("/login?message=invalid%20password")
        } 
    }
}) 

router.post('/signup/submit', (req, res)=>{
    //this is what you get by the post method
    let user={
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "gender": req.body.gen,
        "email": req.body.email,
        "password": req.body.pass,
        "total": 0,
        "spam": 0,
        "history":[]
    }
    //this is configuration of database
    data = {
        ...config,
        url: uri+"/findOne",
        data: {
        ...dbinfo,
        "filter":{
            "email": user.email
         } 
        }}; 
    //here we pass config json data to run on database api
    axios(data)
    .then((respo) =>{
        check(respo.data)
    })

    //this function checkes wether user already exist or new to this app
    function check(result){
        if(result.document==null){
            res.redirect("/idcreated")
            createUser()
        }
        else{
            res.redirect("/signup?message=email%20alredy%20registerd")
        }
    } 

    //this function create user in database
    createUser= () => {
        //this is configuration of database
        data = {
            ...config,
            url: uri+"/insertOne",
            data: {
            ...dbinfo,
            "document": {
                ...user
            }
            }}; 
        //here we pass config json data to run on database api
        axios(data)
        .then((respo) =>{
            console.log(respo.data)
            //after database created it redirect to next page for login
            res.redirect("/idcreated")
        })
    }

})

module.exports=router