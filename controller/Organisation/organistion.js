const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const AddOrganisation = async (req,res) =>{
    const org_id = req.body.org_id;
    const org_name = req.body.org_name;
    const org_country = req.body.org_country;
    const org_state = req.body.org_state;
    const org_city = req.body.org_city;
    const org_currency = req.body.org_currency;
    const org_gst = req.body.org_gst;
    const org_logo = req.body.org_logo;

    console.log(org_id,org_name,org_country,org_state,org_city,org_currency,org_gst,org_logo)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into IPERISCOPE.dbo.tbl_Organisation (org_id,org_name,org_country,org_state,org_city,org_currency,org_gst,org_logo)
        values('${org_id}','${org_name}','${org_country}','${org_state}','${org_city}','${org_currency}','${org_gst}','${org_logo}')`)
        res.status(200).send("Added")

    }
    catch(err){
        console.log(err)
    }
}

module.exports={AddOrganisation}