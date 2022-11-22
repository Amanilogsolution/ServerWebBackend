const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalEmployee = async (req,res) =>{
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_employee_master`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const insertEmployee = async (req,res) =>{
    const employee_id = req.body.employee_id;
    const employee_name= req.body.employee_name;
    const location = req.body.location;
    const employee_email = req.body.employee_email;
    const employee_number = req.body.employee_number;
    const company = req.body.company;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_employee_master (employee_id,employee_name,location ,employee_email,employee_number  ,company ,status,add_user_name,add_system_name,add_system_ip,add_date_time)
        values('${employee_id}','${employee_name}','${location}','${employee_email}',${employee_number},'${company}','Active','${user_id}','${os.hostname()}','${req.ip}',getdate())`)
        res.status(200).send("Added")
    }
    catch(err){
        console.log(err)
    }
}

const getEmployee= async (req,res) =>{
    const sno = req.body.sno;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_employee_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const deleteEmployee= async (req,res) =>{
    const status = req.body.status;
    const sno = req.body.sno;
    console.log(status,sno)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_employee_master set status='${status}' where sno=${sno}`)
        res.status(200).send("updated")
    }
    catch(err){
        console.log(err)
    }
}

const updateEmployee = async (req,res) =>{
    const sno = req.body.sno;
    // const employee_id = req.body.employee_id;
    const employee_name= req.body.employee_name;
    const location = req.body.location;
    const employee_email = req.body.employee_email;
    const employee_number = req.body.employee_number;
    const company = req.body.company;
    const user_id = req.body.user_id;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update IPERISCOPE.dbo.tbl_employee_master set employee_name='${employee_name}',location='${location}',employee_email='${employee_email}',employee_number= ${employee_number},company='${company}'
        ,update_user_name ='${user_id}',update_system_name='${os.hostname()}',update_system_ip='${req.ip}',update_date_time=getdate() where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        console.log(err)
    }
}


const ActiveEmployee= async (req,res) =>{
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  * from IPERISCOPE.dbo.tbl_employee_master tem  with (nolock)  WHERE status ='Active'`)
        res.status(200).send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const EmployeeDetail= async (req,res) =>{
    const empid = req.body.empid;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT  * from IPERISCOPE.dbo.tbl_employee_master tem WHERE employee_id ='${empid}'
        `)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }
}




module.exports={totalEmployee,insertEmployee,getEmployee,deleteEmployee,updateEmployee,ActiveEmployee,EmployeeDetail}