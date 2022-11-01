const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalVendorCode = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_code_master  `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertVendorCode = async (req,res) =>{
    const vendor_code_id = req.body.vendor_code_id;
    const vendor_code= req.body.vendor_code;
    const vendor_name = req.body.vendor_name;
    const company_address_line1 = req.body.company_address_line1;
    const company_address_line2 = req.body.company_address_line2;
    const company_city = req.body.company_city;
    const company_state = req.body.company_state;
    const company_pin_code = req.body.company_pin_code;
    const company_gst = req.body.company_gst;
    const company_website= req.body.company_website;
    const company_email = req.body.company_email;
    const venodr_portal = req.body.venodr_portal;
    const user_id = req.body.user_id;
    const bank_name = req.body.bank_name;
    const account_name = req.body.account_name;
    const account_no = req.body.account_no;
    const ifsc_code = req.body.ifsc_code;
    console.log(vendor_code_id,vendor_code,vendor_name,company_address_line1,company_address_line2,company_city,company_state,company_pin_code,company_gst,company_website,company_email,venodr_portal,user_id)

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_vendor_code_master (vendor_code_id ,vendor_code  ,vendor_name,company_address_line1 ,company_address_line2,company_city ,company_state ,company_pin_code ,company_gst ,company_website,company_email,venodr_portal  ,status,add_user_name,add_system_name,add_ip_address,add_date_time,bank_name,account_name,account_no,ifsc_code)
        values('${vendor_code_id}','${vendor_code}','${vendor_name}','${company_address_line1}','${company_address_line2}','${company_city}','${company_state}',${company_pin_code},'${company_gst}','${company_website}','${company_email}','${venodr_portal}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate(),'${bank_name}','${account_name}','${account_no}','${ifsc_code}')`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getVendorCode  = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_code_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteVendorCode   = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_vendor_code_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateVendorCode = async (req,res) =>{
    const sno = req.body.sno;
    const vendor_code= req.body.vendor_code;
    const vendor_name = req.body.vendor_name;
    const company_address_line1 = req.body.company_address_line1;
    const company_address_line2 = req.body.company_address_line2;
    const company_city = req.body.company_city;
    const company_state = req.body.company_state;
    const company_pin_code = req.body.company_pin_code;
    const company_gst = req.body.company_gst;
    const company_website= req.body.company_website;
    const company_email = req.body.company_email;
    const venodr_portal = req.body.venodr_portal;
    const user_id = req.body.user_id;
 
    console.log(sno,vendor_code,vendor_name,company_address_line1,company_address_line2,company_city,company_state,company_pin_code,company_gst,company_website,company_email,venodr_portal,user_id)

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_vendor_code_master set vendor_code='${vendor_code}',vendor_name='${vendor_name}',company_address_line1='${company_address_line1}',company_address_line2='${company_address_line2}',company_city='${company_city}',company_state='${company_state}',company_pin_code=${company_pin_code},company_gst='${company_gst}',company_website='${company_website}',company_email='${company_email}'
        ,venodr_portal='${venodr_portal}',update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const GetAllVendor = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_code_master WHERE status ='Active'  `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const GetVendorDetails = async (req,res) =>{
    const vendor_name = req.body.vendor_name
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_code_master WHERE vendor_name = '${vendor_name}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {totalVendorCode,insertVendorCode,getVendorCode,deleteVendorCode,updateVendorCode,GetAllVendor,GetVendorDetails}


