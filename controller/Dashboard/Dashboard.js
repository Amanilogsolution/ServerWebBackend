const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const dashboard_details = async (req, res) =>{
    const org = req.body.org;
    try{
        await sql.connect(sqlConfig)
        const assets = await sql.query(`select count(asset_type) as asset from IPERISCOPE.dbo.tbl_new_assets `)
        const vendor = await sql.query(`select count(vendor_code) as Vendor_code from IPERISCOPE.dbo.tbl_vendor_code_master `)
        const ticket = await sql.query(`select count(emp_id) as ticket from IPERISCOPE.dbo.tbl_ticket `)
        res.status(200).json({
            Assets:assets.recordset[0],
            Vendor:vendor.recordset[0],
            Ticket:ticket.recordset[0]
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports={dashboard_details}