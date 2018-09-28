const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


//next exists so you can tell Express when your middleware function is done
//you can have as much middleware as you like register to a single express app
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  //console.log(`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log('Unable to append to server.log file');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs',{
//     pageTitle: 'We\'ll be right back',
//     message: 'The site is currently being updated. We\'ll be back soon.'
//   });
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
});

//set up a handler for an http request (a get request)
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Daniel',
  //   likes: [
  //     'Fishing',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    //currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome Message Node.js'
  });
});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle: 'About Page'
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req, res) => {
  res.send({
    errorMessage: 'Unable to handle this request'
  });
});

//bind the application to a port on our machine
app.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});
