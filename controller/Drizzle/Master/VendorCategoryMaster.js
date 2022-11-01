const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalVendorCategory = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_category_master tvcm `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertVendorCategory = async (req,res) =>{
    const vendor_category_id = req.body.vendor_category_id;
    const vendor_category= req.body.vendor_category;
    const vendor_category_description = req.body.vendor_category_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_vendor_category_master (vendor_category_id  ,vendor_category  ,vendor_category_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${vendor_category_id}','${vendor_category}','${vendor_category_description}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getVendorCategory  = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_category_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteVendorCategory   = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_vendor_category_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateVendorCategory  = async (req,res) =>{
    const sno = req.body.sno;
    const vendor_category= req.body.vendor_category;
    const vendor_category_description = req.body.vendor_category_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_vendor_category_master set vendor_category='${vendor_category}',vendor_category_description='${vendor_category_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const getAllVendorCategory = async (req,res) => {
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_category_master WHERE status ='Active'  `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }

}

module.exports = {totalVendorCategory,insertVendorCategory,getVendorCategory,deleteVendorCategory,updateVendorCategory,getAllVendorCategory}


