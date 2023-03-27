const express = require('express');
const app  = express();
const sql = require('mssql')
const router = require('./router/router');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const schedule = require('node-schedule')
const path = require("path");
const XLSX = require("xlsx");

const port = 2008;

const job = schedule.scheduleJob(' 0 25 13 * * 0-7 ', async function (req, res) {
  try{
    await sql.connect(sqlConfig)
    const result = await sql.query(`select *  from IPERISCOPE.dbo.tbl_ticket where add_user_name = 'yuvraj01'`)
    // console.log(result.recordset)
    aman(result.recordset)
  }
  catch (err) {
    console.log(err)
}})

const workSheetColumnName =[
  "Employee Name",
  "Asset Type",
  "Email ",
  "Status"
];
const workSheetName = 'Tickets'
const filepath =  './data.xlsx'

function aman(dataList){
  const data = dataList.map(user=>{
    return [user.emp_name,user.asset_type,user.email_id,user.ticket_status]
  })

  const workBook = XLSX.utils.book_new();
  const workSheetData = [
    workSheetColumnName,
    ...data
  ]
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook,workSheet,workSheetName);
  XLSX.writeFile(workBook,path.resolve(filepath));
  console.log(workBook.Props);
  return true;
}


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
