var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const Database = require('./models/Database');
//var usersRouter = require('./routes/users');

var app = express();
const port = 3005;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', indexRouter);


//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get("/home", (req, res) => {

 const data = getData();
  res.render('index',
  {
    heading   : 'Welcome',
    welcome   : 'This is how easy it is to embed HTML inside Express Views',
    newListItems: data
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

function getData() {
  const data = Database.getData1();
  const result = []
  data.forEach(i=>{
    console.log("each data", i)
    let temp = ''
    temp+=i.name+' '+i.phone+' '+i.address
    result.push(temp);
  })
  return result;
}
module.exports = app;
