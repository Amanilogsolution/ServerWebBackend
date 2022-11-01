const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalVendorContract = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_contract_master tvcm 
        `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertVendorContract = async (req,res) =>{
    const vendor_contract_id = req.body.vendor_contract_id;
    const vendor= req.body.vendor;
    const company_address_line1 = req.body.company_address_line1;
    const company_address_line2 = req.body.company_address_line2;
    const company_city = req.body.company_city;
    const company_state = req.body.company_state;
    const company_pin_code = req.body.company_pin_code;
    const company_gst = req.body.company_gst;
    const company_website= req.body.company_website;
    const company_email = req.body.company_email;
    const type_of_contract = req.body.type_of_contract;
    const major_category = req.body.major_category;
    const sub_category= req.body.sub_category;
    const location = req.body.location;
    const company = req.body.company;
    const customer_account_no = req.body.customer_account_no;
    const reference_no = req.body.reference_no;
    const contact_plain_details = req.body.contact_plain_details;
    const rate_per_month = req.body.rate_per_month;
    const contract_start_date = req.body.contract_start_date;
    const invoice_generation_date = req.body.invoice_generation_date;
    const billling_freq = req.body.billling_freq;
    const payee_name = req.body.payee_name;
    const tds = req.body.tds;
    const link_id_no = req.body.link_id_no;
    const help_desk_no = req.body.help_desk_no;
    const user_id = req.body.user_id;
   

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_vendor_contract_master (vendor_contract_id ,vendor,company_address_line1 ,company_address_line2,company_city ,company_state ,company_pin_code ,company_gst ,company_website,company_email,type_of_contract ,major_category,sub_category,location ,company,customer_account_no ,reference_no,contatct_plain_details ,rate_per_month ,contract_start_date,invoice_generation_date ,billling_freq,payee_name ,tds,link_id_no 
            ,help_desk_no ,status,add_user_name,add_system_name,add_ip_address,add_date_time)
            values('${vendor_contract_id}','${vendor}','${company_address_line1}','${company_address_line2}','${company_city}','${company_state}',${company_pin_code},'${company_gst}','${company_website}','${company_email}','${type_of_contract}','${major_category}','${sub_category}','${location}','${company}',${customer_account_no},'${reference_no}','${contact_plain_details}','${rate_per_month}','${contract_start_date}','${invoice_generation_date}','${billling_freq}','${payee_name}','${tds}','${link_id_no}','${help_desk_no}',
            'Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getVendorContract  = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_contract_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteVendorContract   = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_vendor_contract_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateVendorContract = async (req,res) =>{
    const sno = req.body.sno;
    const vendor= req.body.vendor;
    const company_address_line1 = req.body.company_address_line1;
    const company_address_line2 = req.body.company_address_line2;
    const company_city = req.body.company_city;
    const company_state = req.body.company_state;
    const company_pin_code = req.body.company_pin_code;
    const company_gst = req.body.company_gst;
    const company_website= req.body.company_website;
    const company_email = req.body.company_email;
    const type_of_contract = req.body.type_of_contract;
    const major_category = req.body.major_category;
    const sub_category= req.body.sub_category;
    const location = req.body.location;
    const company = req.body.company;
    const customer_account_no = req.body.customer_account_no;
    const reference_no = req.body.reference_no;
    const contact_plain_details = req.body.contact_plain_details;
    const rate_per_month = req.body.rate_per_month;
    const contract_start_date = req.body.contract_start_date;
    const invoice_generation_date = req.body.invoice_generation_date;
    const billling_freq = req.body.billling_freq;
    const payee_name = req.body.payee_name;
    const tds = req.body.tds;
    const link_id_no = req.body.link_id_no;
    const help_desk_no = req.body.help_desk_no;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_vendor_contract_master set vendor='${vendor}',company_address_line1='${company_address_line1}',company_address_line2='${company_address_line2}',company_city='${company_city}',company_state='${company_state}',company_pin_code=${company_pin_code},company_gst='${company_gst}',company_website='${company_website}',company_email='${company_email}',type_of_contract='${type_of_contract}',major_category='${major_category}',sub_category='${sub_category}',
        location='${location}',company='${company}',customer_account_no=${customer_account_no},reference_no='${reference_no}',contatct_plain_details='${contact_plain_details}',rate_per_month='${rate_per_month}',contract_start_date='${contract_start_date}',invoice_generation_date='${invoice_generation_date}',billling_freq='${billling_freq}',payee_name='${payee_name}',tds='${tds}',link_id_no='${link_id_no}'
        ,help_desk_no='${help_desk_no}',update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {totalVendorContract,insertVendorContract,getVendorContract,deleteVendorContract,updateVendorContract}


