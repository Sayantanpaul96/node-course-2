const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3100;

var app = express();

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
/**basically used to support partials. */
hbs.registerPartials(__dirname + '/views/partials') 
app.set('view engine', 'hbs');
/**CREATING MIDDLEWARE */
/**Request and response is normal 
 * Next function basically tells the middle ware when to come out of it.
 */
app.use((req, res, next) =>{
    var now = new Date().toString();
    let log = `${now},${req.url},${req.method}`
    console.log(log);
    fs.appendFile('logger.log',log + '\n', (error) => {
        if(error){
        console.log(`Please see this error: ${error}`);
        }
    })
    next();
})
app.use((req,res,next) => {
    res.render('maintain.hbs')

})
app.use(express.static(__dirname + "/public"));
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// app.get('/',(req,res) => {
//     res.send({
//         name: "sayantan",
//         likes: {
//             Hobbies:"Eating",
//             Hobbies2:"sleeping"
//         }
//     })
// });
app.get("/", (req, res) => {
    res.render('HomePage.hbs', {
        Header1: "This is my site",
        WelcomeMessage: "Welcome to my website",
    })
});

app.get("/about", (req, res) => {
    res.render('about.hbs', {
        Header1: "The About Page",
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "this is an error message",
        error: "this is the second error"
    })
})
app.listen(port, () => {
    console.log(`Server is up on ${port} port`);
});