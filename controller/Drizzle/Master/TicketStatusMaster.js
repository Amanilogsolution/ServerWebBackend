const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalTicketStatus = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_ticket_status_master ttsm  `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertTicketStatus = async (req,res) =>{
    const ticket_id = req.body.ticket_id;
    const ticket_status= req.body.ticket_status;
    const ticket_description = req.body.ticket_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_ticket_status_master (ticket_id  ,ticket_status  ,ticket_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${ticket_id}','${ticket_status}','${ticket_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getTicketStatus  = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_ticket_status_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteTicketStatus   = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_ticket_status_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateTicketStatus  = async (req,res) =>{
    const sno = req.body.sno;
    const ticket_status= req.body.ticket_status;
    const ticket_description = req.body.ticket_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_ticket_status_master set ticket_status='${ticket_status}',ticket_description='${ticket_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}


const ActiveTicketStatus   = async (req,res) =>{
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  ticket_id,ticket_status from IPERISCOPE.dbo.tbl_ticket_status_master ttsm  with (nolock)  WHERE status ='Active'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}


module.exports = {totalTicketStatus,insertTicketStatus,getTicketStatus,deleteTicketStatus,updateTicketStatus,ActiveTicketStatus}


