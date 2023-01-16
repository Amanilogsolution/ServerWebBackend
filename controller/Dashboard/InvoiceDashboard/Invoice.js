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
        const OutstandingVendor = await sql.query(`select SUM(convert(int,invoice_amt) ) as total,vendor from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true' GROUP by vendor`)

      

        res.status(200).json({
            Vendor: Vendor.recordset[0],
            OutstandingAmount: OutstandingAmount.recordset[0].total,
            OutstandingVendor: OutstandingVendor.recordset,
        })
    }
    catch (err) {
        console.log(err)
    }
}

const TotalOutstanding = async(req,res) =>{
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    console.log(org,pageno,rowsperpage)
    try{
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true'  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true' `)
        res.send({data:Outstanding.recordset,TotalData:countData.recordset})

    }
    catch(err){
        console.log(err)
  
    }
}

const VendorInvoice = async(req,res) =>{
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    console.log(org,pageno,rowsperpage)
    try{
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock)  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock)  `)
        res.send({data:Outstanding.recordset,TotalData:countData.recordset})

    }
    catch(err){
        console.log(err)
  
    }
}

const PaidInvoice = async(req,res) =>{
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    console.log(org,pageno,rowsperpage)
    try{
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false'  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false' `)
        res.send({data:Outstanding.recordset,TotalData:countData.recordset})

    }
    catch(err){
        console.log(err)
  
    }
}

const FilterInvoice = async(req,res) =>{
    const org = req.body.org;
    const type = req.body.type;
    const value = req.body.value;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try{
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where ${type}='${value}'  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where ${type}='${value}' `)
        const PaidInv = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false' and ${type}='${value}'  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const Paiddata = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false' and ${type}='${value}'  `)
        res.send({data:Outstanding.recordset,TotalData:countData.recordset,PaidInv:PaidInv.recordset,Paiddata:Paiddata.recordset})

    }
    catch(err){
        console.log(err)
  
    }
}





module.exports = { Invoice_Outstanding,TotalOutstanding,VendorInvoice,PaidInvoice,FilterInvoice }