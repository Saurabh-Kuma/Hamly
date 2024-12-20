const express = require('express')
const path = require('path')
const router = express.Router()
const axios = require('axios');
const env = require("dotenv").config()

// var alreadyWake = false
const uri = process.env.uri
const apiKey= process.env.apiKey
var data = {}
var flaskapiurl = 'https://hamlyapi-production.up.railway.app/predict_mail'

var config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': apiKey,
    }
};  

var dbinfo={
    "collection": "users",
    "database": "dbapp",
    "dataSource": "Cluster"
}


// function wakeFlask() {
//     alreadyWake = true
//     axios.get('https://hamlyapi-production.up.railway.app')
//         .then((respo) => {
//             flaskapiurl = "https://hamlyapi-production.up.railway.app/predict_mail"
//             console.log(respo.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }

router.post('/dashboard/submit', (req, res) => {
    var text = req.body.floatingTextarea2.replace(/`/g, "@backtick")
    var result
    axios.post(flaskapiurl, {
        "text": text
    })
        .then((respo) => {
            result = respo.data
            res.redirect('/dashboard?result=' + result + '&&text=' + text)
        })
})


router.post('/dashboard/:email/submit', async (req, res) => {
    //check email is spam or not and change result element
    var text = req.body.floatingTextarea2
    var result

    var respo = await axios.post(flaskapiurl, {
        "text": text
    })
    result = await respo.data

    if (result == "This Mail is Spam! Stay Alert") {
        spamInc = {
            "$inc": {
                "total": 1,
                "spam": 1
            }
        }
    }
    else {
        spamInc = {
            "$inc": { "total": 1 }
        }
    }

    //this is configuration of database 
    data = {
        ...config,
        url: uri + "/updateOne",
        data: {
            ...dbinfo,
            "filter": {
                "email": req.params.email
            },
            "update": {
                "$push": {
                    "history": {
                        "$each": [{
                            "text": text.replace(/`/g, "@backtick"),
                            "result": result
                        }],
                        "$position": 0
                    }
                },
                ...spamInc
            }
        }
    };

    //here we pass config json data to run on database api
    axios(data)
        .then((respo) => {
            res.redirect("/dashboard/" + req.params.email + "?message=first")
        })
})


router.get('/aboutUs', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/aboutUs.html'))
})

router.get('/contactUs', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contactUs.html'))
})

router.get('/privacyPolicy', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/privacyPolicy.html'))
})

router.get('/dashboard/:email/changePassword', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/changePassword.html'))
})

router.post('/dashboard/:email/changePassword/submit', (req, res) => {
    const info = {
        "password": req.body.pass
    }
    data = {
        ...config,
        url: uri + "/updateOne",
        data: {
            ...dbinfo,
            "filter": {
                "email": req.params.email
            },
            "update": {
                "$set": {
                    ...info
                }
            }
        }
    };

    //here we pass config json data to run on database api
    axios(data)
        .then((respo) => {
            res.redirect("/login?message=Password Changed Successfully! now you can login")
        })
})

router.post('/dashboard/:email/feedback/submit', (req, res) => {
    info = {
        "rating": req.body.rating,
        "text": req.body.textFeedback
    }

    data = {
        ...config,
        url: uri + "/updateOne",
        data: {
            ...dbinfo,
            "filter": {
                "email": req.params.email
            },
            "update": {
                "$push": {
                    "feedback": {
                        "$each": [{
                            ...info
                        }],
                        "$position": 0
                    }
                }
            }
        }
    };

    //here we pass config json data to run on database api 
    axios(data)
        .then((respo) => {
            res.redirect("/dashboard/" + req.params.email + "/feedback?message=done")
        })

})

router.get('/dashboard/:email/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/feedback.html"))
})


router.get('/dashboard/:email/profile', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/profile.html"))
})

router.get('/dashboard/:email/profile/data', (req, res) => {
    //this is configuration of database 
    data = {
        ...config,
        url: uri + "/findOne",
        data: {
            ...dbinfo,
            "filter": {
                "email": req.params.email
            }
        }
    };
    //here we pass config json data to run on database api
    axios(data)
        .then((respo) => {
            if (respo.data.document == null) {
                res.send("Invalid practice")
            }
            else {
                res.json({
                    "firstName": respo.data.document.firstName,
                    "lastName": respo.data.document.lastName,
                    "email": respo.data.document.email,
                    "mobile": respo.data.document.mobile,
                    "gender": respo.data.document.gender
                })
            }
        })
})

router.post('/dashboard/:email/profile/submit', (req, res) => {
    info = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "mobile": req.body.mobileNumber,
        "gender": req.body.gen,
        "email": req.body.email
    }

    data = {
        ...config,
        url: uri + "/updateOne",
        data: {
            ...dbinfo,
            "filter": {
                "email": req.params.email
            },
            "update": {
                "$set": {
                    ...info
                }
            }
        }
    };

    //here we pass config json data to run on database api
    axios(data)
        .then((respo) => {
            res.redirect("/dashboard/" + req.body.email + "/profile?message=done")
        })
})

router.post('/dashboard/:email/report/submit', (req, res) => {
    info = {
        "Issue": req.body.issue,
        "report": req.body.textProblem
    }

    data = {
        ...config,
        url: uri + "/updateOne",
        data: {
            ...dbinfo,
            "filter": {
                "email": req.params.email
            },
            "update": {
                "$push": {
                    "report": {
                        "$each": [{
                            ...info
                        }],
                        "$position": 0
                    }
                }
            }
        }
    };

    //here we pass config json data to run on database api
    axios(data)
        .then((respo) => {
            res.redirect("/dashboard/" + req.params.email + "/report?message=done")
        })

})

router.get('/dashboard/:email/report', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/reportProblem.html"))
})

router.get('/dashboard', (req, res) => {
    res.render('withoutlogin')

    // if (!alreadyWake) {
    //     //wake up the server
    //     wakeFlask()
    //     alreadyWake = true
    // }
})



router.get('/dashboard/:email', (req, res) => {
    //this is configuration of database 
    data = {
        ...config,
        url: uri + "/findOne",
        data: {
            ...dbinfo,
            "filter": {
                "email": req.params.email
            }
        }
    };
    //here we pass config json data to run on database api
    axios(data)
        .then((respo) => {
            if (respo.data.document == null) {
                res.send("Invalid practice")
            }
            else {
                res.render('home', {
                    "history": respo.data.document.history,
                    "email": respo.data.document.email,
                    "name": respo.data.document.firstName + " " + respo.data.document.lastName,
                    "total": respo.data.document.total,
                    "spam": respo.data.document.spam
                })

            }
        })
    // if (!alreadyWake) {
    //     //wake up the server
    //     wakeFlask()
    //     alreadyWake = true
    // }
})


router.get('/', (req, res) => {
    res.redirect("/dashboard")
})


router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/logout.html"))
})

router.get('/reportproblem', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/reportproblem.html"))
})

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'))
})

router.get('/idcreated', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/idcreated.html'))
})


router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
})

router.post('/login/submit', (req, res) => {
    //it holds the data from post method
    let email = req.body.userid
    let password = req.body.pass
    //this is configuration of database
    data = {
        ...config,
        url: uri + "/findOne",
        data: {
            ...dbinfo,
            "filter": {
                "email": email
            }
        }
    };
    //here we pass config json data to run on database api
    axios(data)
        .then((res) => {
            check(res.data)
        })
    //this function is used for validate user
    function check(result) {
        if (result.document == null) {
            res.redirect("/login?message=invalid email")
        }
        else if (result.document.password == password) {
            res.redirect("/dashboard/" + result.document.email)
        }
        else {
            res.redirect("/login?message=invalid password")
        }
    }
})

router.post('/signup/submit', (req, res) => {
    //this is what you get by the post method
    let user = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "mobile": req.body.mobileNumber,
        "gender": req.body.gen,
        "email": req.body.email,
        "password": req.body.pass, 
        "total": 0, 
        "spam": 0,
        "history": [],
        "feedback": [],
        "report": []
    } 
    //this is configuration of database
    data = {
        ...config, 
        url: uri + "/findOne",
        data: {
            ...dbinfo,
            "filter": {
                "email": user.email
            }
        }
    };
    //here we pass config json data to run on database api
    axios(data)
        .then((respo) => {
            check(respo.data)
        })

    //this function checkes wether user already exist or new to this app
    function check(result) {
        if (result.document == null) {
            //res.redirect("/idcreated")
            createUser()
        }
        else {
            res.redirect("/signup?message=email alredy registerd")
        }
    }

    //this function create user in database
    createUser = () => {
        //this is configuration of database
        data = {
            ...config,
            url: uri + "/insertOne",
            data: {
                ...dbinfo,
                "document": {
                    ...user
                }
            }
        };
        //here we pass config json data to run on database api
        axios(data)
            .then((respo) => {
                //after database created it redirect to next page for login
                res.redirect("/idcreated")
            })
    }

})

module.exports = router