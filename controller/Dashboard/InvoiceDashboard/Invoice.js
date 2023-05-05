const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const Invoice_Outstanding = async (req, res) => {
    const org = req.body.org;
    const data = []
    try {
        await sql.connect(sqlConfig)
        const Vendor = await sql.query(`select count(vendor) as TotalVendor from IPERISCOPE.dbo.tbl_vendor_invoice WHERE invoice_status ='true'`)
        const OutstandingAmount = await sql.query(`select SUM(convert(float,invoice_amt) ) as total from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true'`)
        const OutstandingVendor = await sql.query(`select SUM(convert(float,invoice_amt) ) as total,vendor,Count(invoice_no) as countinvoice from IPERISCOPE.dbo.tbl_vendor_invoice  WHERE invoice_status ='true' GROUP by vendor`)

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

const TotalOutstanding = async (req, res) => {
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try {
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock)  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock)  `)
        res.send({ data: Outstanding.recordset, TotalData: countData.recordset })
    }
    catch (err) {
        console.log(err)
    }
}

const VendorInvoice = async (req, res) => {
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage;
    const vendorname = req.body.vendorname;
    try {
        await sql.connect(sqlConfig)
        if(vendorname == 'all'){
        var Outstanding = await sql.query(`select *,convert(varchar(15),invoice_date,105) as date from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true'  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        var countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true' `)
    }
    else{
        var Outstanding = await sql.query(`select *,convert(varchar(15),invoice_date,105) as date from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true' and vendor Like '${vendorname}%'  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        var countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true' and vendor Like '${vendorname}%'`)
    }
        res.send({ data: Outstanding.recordset, TotalData: countData.recordset })
    }
    catch (err) {
        console.log(err)

    }
}

const ExportOutstandingInvoiceData = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select *,convert(varchar(15),invoice_date,105) as date from ${org}.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true'  order by sno ASC `)
        // const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='true' `)
        res.send({ data: Outstanding.recordset })
    }
    catch (err) {
        console.log(err)
    }
}

const PaidInvoice = async (req, res) => {
    const org = req.body.org;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try {
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false'  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false' `)
        res.send({ data: Outstanding.recordset, TotalData: countData.recordset })
    }
    catch (err) {
        console.log(err)
    }
}

const FilterInvoice = async (req, res) => {
    const org = req.body.org;
    const value = req.body.value;
    const pageno = req.body.pageno;
    const rowsperpage = req.body.rowsperpage
    try {
        await sql.connect(sqlConfig)
        const Outstanding = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where ( vendor='${value}' or invoice_no='${value}' or reference_no='${value}' or invoice_amt='${value}')  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const countData = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where  (invoice_no='${value}' or reference_no='${value}' or invoice_amt='${value}')  `)
        const PaidInv = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false' and (vendor='${value}' or invoice_no='${value}' or reference_no='${value}' or invoice_amt='${value}' )  order by sno ASC OFFSET (${pageno}-1)*${rowsperpage} rows FETCH next ${rowsperpage} rows only`)
        const Paiddata = await sql.query(`select count(*) as Totaldata from IPERISCOPE.dbo.tbl_vendor_invoice with (nolock) where invoice_status ='false' and (vendor='${value}' or invoice_no='${value}' or reference_no='${value}' or invoice_amt='${value}' )  `)
        res.send({ data: Outstanding.recordset, TotalData: countData.recordset, PaidInv: PaidInv.recordset, Paiddata: Paiddata.recordset })
    }
    catch (err) {
        console.log(err)
    }
}

const Recurring_Pending_Invoice = async (req, res) => {
    const org = req.body.org;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`SELECT * from ${org}.dbo.tbl_vendor_contract_master where 
        reference_no not in (select  reference_no from ${org}.dbo.tbl_vendor_invoice tvi where invoice_status='true' ) 
        and type_of_contract = 'Recurring'`)
        res.send(result.recordset)
    }
    catch (err) {
        console.log(err)
    }
}

const Outstanding_Invoice_filter = async (req, res) => {
    const org = req.body.org;
    const type = req.body.type;
    const value = req.body.value
    try {
        await sql.connect(sqlConfig)
        if (type == 'Vendor') {
            const result = await sql.query(`select * from ${org}.dbo.tbl_vendor_code_master tvcm  where vendor_name = '${value}'`)
            res.send(result.recordset)
        } else if (type == 'Invoice') {
            const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_invoice where invoice_no ='${value}'`)
            res.send(result.recordset)
        } else {
            const result = await sql.query(`select * from IPERISCOPE.dbo.tbl_vendor_contract_master where reference_no ='${value}'`)
            res.send(result.recordset)
        }
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { Invoice_Outstanding, TotalOutstanding, VendorInvoice, PaidInvoice, FilterInvoice, Recurring_Pending_Invoice, Outstanding_Invoice_filter,ExportOutstandingInvoiceData }
