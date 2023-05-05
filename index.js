const express = require('express')
const bodyParser = require('body-parser') //for post
const path = require('path') //for path
const exphbs  = require('express-handlebars');
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//this middleware is used for static file which contains all css and js
app.use(express.static(path.join(__dirname, "static")))

//this middleware is used for post request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//this middleware redirect control to given path
app.use("/", require(path.join(__dirname, "routes/hamly.js")))

//it stats app form here
app.listen(port, () => { 
  console.log(`Hamly app listening on http://localhost:${port}`)
})
