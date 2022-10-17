const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalSoftware = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_software_master tsm `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertSoftware = async (req,res) =>{
    const software_id = req.body.software_id;
    const software_name= req.body.software_name;
    const software_description = req.body.software_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_software_master (software_id  ,software_name  ,software_description  ,Status,add_user_name,add_system_name,add_system_ip,add_date_time)
        values('${software_id}','${software_name}','${software_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getSoftware = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_software_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteSoftware = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_software_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateSoftware = async (req,res) =>{
    const sno = req.body.sno;
    const software_name= req.body.software_name;
    const software_description = req.body.software_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_software_master set software_name='${software_name}',software_description='${software_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_system_ip='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

module.exports={totalSoftware,insertSoftware,getSoftware,deleteSoftware,updateSoftware}