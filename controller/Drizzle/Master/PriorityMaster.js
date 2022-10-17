const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalPriorityMaster = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_priority_master tpm `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertPriorityMaster = async (req,res) =>{
    const priority_id = req.body.priority_id;
    const priority_type= req.body.priority_type;
    const priority_description = req.body.priority_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_priority_master (priority_id  ,priority_type  ,priority_description  ,Status,add_user_name,add_system_name,add_system_ip,add_date_time)
        values('${priority_id}','${priority_type}','${priority_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getPriorityMaster  = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_priority_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deletePriorityMaster  = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_priority_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updatePriorityMaster = async (req,res) =>{
    const sno = req.body.sno;
    const priority_type= req.body.priority_type;
    const priority_description = req.body.priority_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_priority_master set priority_type='${priority_type}',priority_description='${priority_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_system_ip='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {totalPriorityMaster,insertPriorityMaster,getPriorityMaster,deletePriorityMaster,updatePriorityMaster}

