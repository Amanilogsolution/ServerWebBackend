const nodemailer = require('nodemailer');
const ejs = require("ejs");
const path = require("path");
const XLSX = require("xlsx");
const sql = require('mssql')
const sqlConfig = require('../../Database/Config')

const workSheetColumnName =[
  "Employee Name",
  "Asset Type",
  "Email ",
  "Status"
];
const workSheetName = 'Users'
const filepath = __dirname + '/data.xlsx'

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

  return true;
}

const ExcelConvert = async(req,res)=>{
  try{
    await sql.connect(sqlConfig)
    const result = await sql.query(`select *  from IPERISCOPE.dbo.tbl_ticket where add_user_name = 'yuvraj01'  `)
    aman(result.recordset)
  }
  catch (err) {
    console.log(err)
}
 
}

const Email = async(req,res)=>{
  const message = req.body.message;
  console.log(message)
  if(message.TicketStatus == "Open"){
    subject = `New support request received via ${message.TicketNumber} (${message.subject})`
     var html = await ejs.renderFile(path.join(__dirname, `./templates/Open.ejs`),message)
  }else if(message.TicketStatus == "Closed"){
    subject = `Issue resolved for Ticket number ${message.TicketNumber} (${message.subject})`
    var html = await ejs.renderFile(path.join(__dirname, `./templates/Close.ejs`),message)
  }else{
    subject = `Support request status changed to ${message.TicketStatus} for Ticket number ${message.TicketNumber} (${message.subject})`
    var html = await ejs.renderFile(path.join(__dirname, `./templates/Hold.ejs`),message)

  }
 
  try {
    let transporter =  nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, 
      auth: {
        user: 'alerts@godrizzle.com', // generated ethereal user
        pass: 'ktgouiibktkcyrki', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'alerts@godrizzle.com', // sender address
      to: `${message.mail}`, // list of receivers
      cc:['support@ilogsolution.com','support@awlindia.com'],
      subject: subject, // Subject line
      html: html, // html body
      // attachments:[
      //   {
      //   filename:'data.xlsx',
      //   path:__dirname + '/data.xlsx'
      //   }

      // ]
    })
    res.send(info)

  }
  catch(err){
    console.log(err);
  }
  
}

module.exports = {Email,ExcelConvert}
