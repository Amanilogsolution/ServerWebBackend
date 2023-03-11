const nodemailer = require('nodemailer');

app.get('/',async(req,res)=>{

    // let testAccount = await nodemailer.createTestAccount();
    try {
      let transporter =  nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'itesmsolution@gmail.com', // generated ethereal user
          pass: 'fetqmnskhsbpewan', // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: '"Aman Lohan " <itesmsolution@gmail.com>', // sender address
        to: "swishlohan420@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      })
      console.log(info)

    }
    catch(err){
      console.log(err);
    }
})