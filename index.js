const express = require('express');
const app  = express();
const sql = require('mssql')
const router = require('./router/router');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
var CronJob = require('cron').CronJob;

const port = 2008;

var job = new CronJob(
  '0 31 17 * * 0-6',
  function() {
      console.log('You will see this message every second');
  }
);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function(req,res){
    res.send('Hello')
})
app.use('/api',router)

app.listen(port, (err, req, res, next) => {
    if (err)
      console.log("Ouch! Something went wrong")
    console.log(`server listen on: ${port}`)
  })
