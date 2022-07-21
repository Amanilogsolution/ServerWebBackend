const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const jwt = require("jsonwebtoken")


const UserLogin = async (req,res) =>{
    const userid = req.body.userid;
    const password = req.body.password;
    console.log(userid, password)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_iperiscope_login with (nolock) where user_id = '${userid}' and user_password = '${password}' `)
        if(result.recordset.length){
            const token =jwt.sign({userid,password},process.env.JWT_KEY,{ expiresIn: 5 * 24 * 60 * 60 })
            res.status(200).send({
                status: "Success",
                token: token,
                name: result.recordset[0].user_name,
                user_id: result.recordset[0].user_id,
                user_password: result.recordset[0].user_password,
                permission :result.recordset[0].permission
            })
        }
        else{
            res.send({
                status: "Fail"
            })
        }
    }
    catch (err){
        res.send(err)
    }
}
module.exports = {UserLogin}