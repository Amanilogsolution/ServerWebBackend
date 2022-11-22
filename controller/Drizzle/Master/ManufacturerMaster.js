const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalManufacturer = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_manufacturer_master`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertManufacturer = async (req,res) =>{
    const manufacturer_id = req.body.manufacturer_id;
    const manufacturer_name= req.body.manufacturer_name;
    const manufacturer_description = req.body.manufacturer_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_manufacturer_master (manufacturer_id  ,manufacturer_name  ,manufacturer_description  ,Status,add_user_name,add_system_name,add_ip_address,add_date_time)
        values('${manufacturer_id}','${manufacturer_name}','${manufacturer_description}','Active','${user_id}','${os.hostname}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getManufacturer = async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_manufacturer_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteManufacturer = async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_manufacturer_master set status='${status}' where sno =${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateManufacturer  = async (req,res) =>{
    const sno = req.body.sno;
    const manufacturer_name= req.body.manufacturer_name;
    const manufacturer_description = req.body.manufacturer_description;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_manufacturer_master set manufacturer_name='${manufacturer_name}',manufacturer_description='${manufacturer_description}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_ip_address='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        if(result){
            res.status(200).send("Updated")

        }else{
            res.send("Error")
        }
    }
    catch(err){
        console.log(err)
    }
}

const ActiveManufacturer = async (req,res) =>{
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_manufacturer_master tmm WHERE status ='Active'`)
        
        if(result){
            res.send(result.recordset)

        }else{
            res.send("Error")
        }
    }
    catch (err) {
        res.send(err)
    }
}


module.exports={totalManufacturer,insertManufacturer,getManufacturer,deleteManufacturer,updateManufacturer,ActiveManufacturer}
