const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalBillingFrequency = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_billing_freq_master tbfm `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertBillingFrequency = async (req,res) =>{
    const billing_freq_id = req.body.billing_freq_id;
    const billing_freq= req.body.billing_freq;
    const billing_freq_description = req.body.billing_freq_description;
    const user_id = req.body.user_id;
    console.log(billing_freq_id,billing_freq,billing_freq_description,user_id)

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_billing_freq_master (billing_freq_id  ,billing_freq  ,billing_freq_description ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${billing_freq_id}','${billing_freq}','${billing_freq_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getBillingFrequency  = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_billing_freq_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteBillingFrequency   = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_billing_freq_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateBillingFrequency  = async (req,res) =>{
    const sno = req.body.sno;
    const billing_freq= req.body.billing_freq;
    const billing_freq_description = req.body.billing_freq_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_billing_freq_master set billing_freq='${billing_freq}',billing_freq_description='${billing_freq_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {totalBillingFrequency,insertBillingFrequency,getBillingFrequency,deleteBillingFrequency,updateBillingFrequency}


