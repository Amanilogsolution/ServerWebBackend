const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const dashboard_details = async (req, res) =>{
    const org = req.body.org;
    try{
        await sql.connect(sqlConfig)
        const assets = await sql.query(`select count(asset_type) as asset from ${org}.dbo.tbl_new_assets `)
        const vendor = await sql.query(`select count(vendor_code) as Vendor_code from ${org}.dbo.tbl_vendor_code_master `)
        const ticket = await sql.query(`select count(emp_id) as ticket from ${org}.dbo.tbl_ticket `)
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

const dashboard_procedure = async(req,res) =>{
    const type = req.body.type;

    try{
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();

        const result = await pool.request()
        .input('type',type)
        .execute('IPERISCOPE.dbo.Drizzleproc')
        res.send(result.recordsets)
        

    }
    catch (err){
        res.send(err)
    }

}

module.exports={dashboard_details,dashboard_procedure}