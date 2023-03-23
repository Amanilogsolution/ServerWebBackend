const nodemailer = require('nodemailer');
const ejs = require("ejs");
const path = require("path");



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
    })
    res.send(info)

  }
  catch(err){
    console.log(err);
  }
  
}

module.exports = {Email}
