const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const getUserdetails  = async (req,res) =>{
    const org = req.body.org;
    const user_id = req.body.user_id;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_employee_master where user_id='${user_id}'`)
        res.status(200).send(result.recordset[0])
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {getUserdetails}