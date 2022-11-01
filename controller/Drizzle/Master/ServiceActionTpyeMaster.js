const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalServiceAction = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_service_action_type_master`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertServiceAction = async (req,res) =>{
    const service_action_id = req.body.service_action_id;
    const service_action_type= req.body.service_action_type;
    const service_action_type_description = req.body.service_action_type_description;
    const user_id = req.body.user_id;
    console.log(service_action_id,service_action_type,service_action_type_description,user_id)

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_service_action_type_master (service_action_id ,service_action_type  ,service_action_type_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${service_action_id}','${service_action_type}','${service_action_type_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getServiceAction = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_service_action_type_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteServiceAction = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_service_action_type_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateServiceAction = async (req,res) =>{
    const sno = req.body.sno;
    const service_action_type= req.body.service_action_type;
    const service_action_type_description = req.body.service_action_type_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_service_action_type_master set service_action_type='${service_action_type}',service_action_type_description='${service_action_type_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {totalServiceAction,insertServiceAction,getServiceAction,deleteServiceAction,updateServiceAction}
