const sql = require('mssql')
const sqlConfig = require('../../Database/Config')
const os = require('os')

const dashboard_details = async (req, res) =>{
    const org = req.body.org;
    try{
        await sql.connect(sqlConfig)
        const assets = await sql.query(`select count(asset_type) as asset from ${org}.dbo.tbl_new_assets `)
        const vendor = await sql.query(`select count(vendor_code) as Vendor_code from ${org}.dbo.tbl_vendor_code_master `)
        const invoice = await sql.query(`select count(vendor) as vendor  from ${org}.dbo.tbl_vendor_invoice tvi `)
        const ticket = await sql.query(`select count(emp_id) as ticket from ${org}.dbo.tbl_ticket `)
        res.status(200).json({
            Assets:assets.recordset[0],
            Vendor:vendor.recordset[0],
            Ticket:ticket.recordset[0],
            Invoice:invoice.recordset[0]
        })
    }
    catch(err){
        console.log(err)
    }
}

const dashboard_procedure = async(req,res) =>{
    const type = req.body.type;
    console.log(type)

    try{
        const pool = new sql.ConnectionPool(sqlConfig);
        await pool.connect();

        const result = await pool.request()
        .input('type',type)
        .execute('IPERISCOPE.dbo.Drizzleproc')
        res.send(result.recordsets)
        console.log(result.recordsets)
        

    }
    catch (err){
        res.send(err)
    }

}

const dashboard_location_name = async(req,res) =>{
    const org = req.body.org;
    let charts = []

    try{
        await sql.connect(sqlConfig)
        const location = await sql.query(`select location_name from  IPERISCOPE.dbo.tbl_location_master `)
        for(i=0;i<location.recordset.length;i++){
            const datas = await sql.query(`select count(new_asset_type_id) as asset from  IPERISCOPE.dbo.tbl_new_assets where location='${location.recordset[i].location_name}'`)
            charts.push({Location:location.recordset[i].location_name,Assets:datas.recordset[0].asset})
            console.log({Location:location.recordset[i].location_name,Assets:datas.recordset[0].asset})
        }
        res.send(charts)
    }
    catch(err){
        console.log(err)
    }
}

const dashboard_software = async(req,res)=>{
    const org = req.body.org;
    const data = []
    try{
        await sql.connect(sqlConfig)
        let softwarelist = []
        const software = await sql.query(`select software_name from  IPERISCOPE.dbo.tbl_software_master `)
        software.recordset.map(ele => softwarelist.push(ele.software_name))
        setTimeout(async()=>{
            for(i=0;i<softwarelist.length-1;i++){
                let softwarevalue = await sql.query(`select count(asset_id)as value from IPERISCOPE.dbo.tbl_asset_subtable where software = '${softwarelist[i]}'`)
                data.push({softwareName:softwarelist[i],softwares:softwarevalue.recordset[0].value})
            }

        },1000)
        setTimeout(()=>{
            res.send(data)
        },2000)

       
    }
    catch(err){
        console.log(err)
    }

}

const dashboard_manufacture = async(req,res)=>{
    const org = req.body.org;
    let data = []
    try{
        await sql.connect(sqlConfig)
        let manulist = []
        const manufactures = await sql.query(`select manufacturer_name from  IPERISCOPE.dbo.tbl_manufacturer_master `)
        manufactures.recordset.map(ele => manulist.push(ele.manufacturer_name))
        setTimeout(async()=>{
            for(i=0;i<manulist.length-1;i++){

                let manufacturevalue = await sql.query(`select count(new_asset_type_id) as value from IPERISCOPE.dbo.tbl_new_assets where manufacture = '${manulist[i]}'`)

                data.push({name:manulist[i],value:manufacturevalue.recordset[0].value})

            }
            data.sort((r1,r2) => r2.value - r1.value )
            data = data.filter((data,id) => id<5)

        },1000)
        setTimeout(()=>{
            res.send(data)
        },2000)

       
    }
    catch(err){
        console.log(err)
    }

}


module.exports={dashboard_details,dashboard_procedure,dashboard_location_name,dashboard_software,dashboard_manufacture}