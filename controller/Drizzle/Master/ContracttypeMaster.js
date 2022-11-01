const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalContracttype = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_contract_type_master tctm `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertContracttype = async (req,res) =>{
    const contract_id = req.body.contract_id;
    const contract_type= req.body.contract_type;
    const contract_description = req.body.contract_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_contract_type_master (contract_id  ,contract_type ,contract_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${contract_id}','${contract_type}','${contract_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getContracttype = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_contract_type_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteContracttype = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_contract_type_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateContracttype = async (req,res) =>{
    const sno = req.body.sno;
    const contract_type= req.body.contract_type;
    const contract_description = req.body.contract_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_contract_type_master set contract_type='${contract_type}',contract_description='${contract_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}
const getAllContracttype = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_contract_type_master WHERE status ='Active'  `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }

}

module.exports = {totalContracttype,insertContracttype,getContracttype,deleteContracttype,updateContracttype,getAllContracttype}


