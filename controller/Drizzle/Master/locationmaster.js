const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalLocation= async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_location_master`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertLocation = async (req,res) =>{
    const location_id = req.body.location_id;
    const company_name= req.body.company_name;
    const location_code = req.body.location_code;
    const location_name = req.body.location_name;
    const location_address_line1 = req.body.location_address_line1;
    const location_address_line2 = req.body.location_address_line2;
    const location_city = req.body.location_city;
    const location_state = req.body.location_state;
    const location_pin_code = req.body.location_pin_code;
    const location_gst = req.body.location_gst;
    const contact_person = req.body.contact_person;
    const contact_person_email = req.body.contact_person_email;
    const contact_person_number = req.body.contact_person_number;
    const location_latitude = req.body.location_latitude;
    const location_longitude = req.body.location_longitude;
    const user_id = req.body.user_id;
    console.log(location_id,company_name,location_code,location_name,location_address_line1,location_address_line2,location_city,location_state,location_pin_code
        ,location_gst,contact_person,contact_person_email,contact_person_number,location_latitude,location_longitude,user_id)


    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_location_master (location_id ,company_name ,location_code ,location_name ,location_address_line1 ,location_address_line2,location_city ,location_state ,location_pin_code,location_gst,contact_person,contact_person_email,contact_person_number ,location_latitude ,location_longitude ,Status,add_username,add_system_name,add_ip,add_date_time)
        values('${location_id}','${company_name}','${location_code}','${location_name}','${location_address_line1}','${location_address_line2}','${location_city}','${location_state}',${location_pin_code},'${location_gst}','${contact_person}','${contact_person_email}',${contact_person_number},'${location_latitude}','${location_longitude}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getLocation= async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_location_master tom where sno='${sno}'`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

const deleteLocation= async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_location_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateLocation = async (req,res) =>{
    const sno = req.body.sno;
    const company_name= req.body.company_name;
    const location_code = req.body.location_code;
    const location_name = req.body.location_name;
    const location_address_line1 = req.body.location_address_line1;
    const location_address_line2 = req.body.location_address_line2;
    const location_city = req.body.location_city;
    const location_state = req.body.location_state;
    const location_pin_code = req.body.location_pin_code;
    const location_gst = req.body.location_gst;
    const contact_person = req.body.contact_person;
    const contact_person_email = req.body.contact_person_email;
    const contact_person_number = req.body.contact_person_number;
    const location_latitude = req.body.location_latitude;
    const location_longitude = req.body.location_longitude;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_location_master set company_name='${company_name}',location_code='${location_code}',location_name='${location_name}',location_address_line1='${location_address_line1}',location_address_line2='${location_address_line2}',location_city='${location_city}'
        ,location_state='${location_state}',location_pin_code=${location_pin_code},location_gst='${location_gst}',contact_person='${contact_person}',contact_person_email='${contact_person_email}',contact_person_number=${contact_person_number},location_latitude='${location_latitude}',location_longitude='${location_longitude}',update_username='${user_id}',update_system_name='${os.hostname()}',update_system_ip='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}

const getAllLocation = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_location_master WHERE status ='Active'  `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {totalLocation,insertLocation,getLocation,deleteLocation,updateLocation,getAllLocation}