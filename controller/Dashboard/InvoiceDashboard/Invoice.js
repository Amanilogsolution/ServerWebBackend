const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const Invoice_Outstanding = async (req, res) => {
    const org = req.body.org;
    const data = []
    try {
        await sql.connect(sqlConfig)
        const Vendor = await sql.query(`select count(vendor) as TotalVendor from IPERISCOPE.dbo.tbl_vendor_invoice `)
        const OutstandingAmount = await sql.query(`select SUM(convert(int,invoice_amt) ) as total from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true'`)
        const OutstandingVendor = await sql.query(`select DISTINCT(vendor) from IPERISCOPE.dbo.tbl_vendor_invoice where invoice_status ='true' `)

            console.log(OutstandingVendor.recordset)
        //     setTimeout(async()=>{
            for (var val of OutstandingVendor.recordset) {
                        console.log(val)

        //         // console.log(`select SUM(convert(int,invoice_amt) ) as total from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true'and vendor='${OutstandingVendor.recordset[i].vendor}'`)

        const values = await sql.query(`select SUM(convert(int,invoice_amt) ) as total from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true'and vendor='${val.vendor}'`)
        data.push({name:val.vendor,value:values.recordset[0].total})

            }
            console.log(data)



        // },1000)
        // setTimeout(()=>{
        res.status(200).json({
            Vendor: Vendor.recordset[0],
            OutstandingAmount: OutstandingAmount.recordset[0].total,
            OutstandingVendor: data,

        })
        // },2000)

    }
    catch (err) {
        console.log(err)
    }
}
const Invoice_Outstanding_value = async (req, res) => {
    const org = req.body.org;
    const data = req.body.data;
    const array = []

    try {
        await sql.connect(sqlConfig)
        // console.log(data.length)
        const array = []
        // setTimeout(async()=>{

        for (var val of data) {
            // console.log(val.vendor)
        //  console.log(`select SUM(convert(int,invoice_amt) ) as total from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true'and vendor='${val.vendor}'`)


            const values = await sql.query(`select SUM(convert(int,invoice_amt) ) as total from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true'and vendor='${val.vendor}'`)
          
            array.push({name:val.vendor,value:values.recordset[0].total})



        }
        console.log('Hlo',array)


    // },1000)

    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { Invoice_Outstanding, Invoice_Outstanding_value }