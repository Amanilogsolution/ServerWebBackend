const nodemailer = require('nodemailer');
const ejs = require("ejs");
const path = require("path");
const XLSX = require("xlsx");

const workSheetColumnName =[
  "First Name",
  "Last Name",
  "Email Address",
  "Gender"
];
const workSheetName = 'Users'
const filepath = './Book1.xlsx'

const UserList = [{
  "fname":"Aman",
  "lname":"Lohan",
  "email":"abc@abc.com",
  "gender":"MAle"
},
{
  "fname":"Aman",
  "lname":"Lohan",
  "email":"abc@abc.com",
  "gender":"MAle"
}
]


const ExcelConvert = async(req,res)=>{
  const data = UserList.map(user=>{
    return [user.fname,user.lname,user.email,user.gender]
  })

  const workBook = XLSX.utils.book_new();
  const workSheetData = [
    workSheetColumnName,
    ...data
  ]
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook,workSheet,workSheetName);
  XLSX.writeFile(workBook,path.resolve(filepath));
  console.log('hello')

  return true;
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
        user: 'drizzleiperiscope2023@gmail.com', // generated ethereal user
        pass: 'elmqbqimstauhsik', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: 'drizzleiperiscope2023@gmail.com', // sender address
      to: 'swishlohan420@gmail.com', // list of receivers
      // cc:['rituraj@awlindia.com'],
      subject: subject, // Subject line
      html: html, // html body
      attachments:[
        {
        filename:'data.xlsx',
        path:__dirname + '/data.xlsx'
        }

      ]
    })
    res.send(info)

  }
  catch(err){
    console.log(err);
  }
  
}

module.exports = {Email,ExcelConvert}