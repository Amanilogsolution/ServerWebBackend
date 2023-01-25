const sql = require('mssql')
const sqlConfig = require('../../Database/Config')

const ColumnsReport =  async(req,res) =>{
    const org = req.body.org;
    const table = req.body.table;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select COLUMN_NAME from ${org}.INFORMATION_SCHEMA.COLUMNS  where  TABLE_NAME = '${table}' `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

const TableReports = async(req,res) =>{
    const org = req.body.org;
    const table = req.body.table;
    const columns = req.body.columns;
    console.log(org,table,columns)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select ${columns} from ${org}.dbo.${table}`)
        res.send(result.recordset)

    }
    catch(err){
        console.log(err)

    }
}

const GraphReport = async(req,res) =>{
    const org = req.body.org;
    const table = req.body.table;
    const columns = req.body.columns;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select COUNT(${columns}) as value,${columns} as name from ${org}.dbo.${table} group by ${columns} `)
        res.send(result.recordset)
        console.log(result.recordset)
    }
    catch(err){
        console.log(err)
    }
}

module.exports={ColumnsReport,TableReports,GraphReport}