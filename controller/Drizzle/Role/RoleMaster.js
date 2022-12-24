const sql = require('mssql')
const sqlConfig = require('../../../Database/Config')
const os = require('os')

const totalRoles = async (req,res) =>{
    const org = req.body.org;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_Roles_master `)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const insertRoles = async (req,res) =>{
    const data = req.body
    console.log(`insert into ${data.data.org}.dbo.tbl_Roles_master
    (role_id,remark,asset,asset_view,asset_create,asset_edit,asset_delete,vendor_contract,vendor_contract_view,vendor_contract_create,vendor_contract_edit,vendor_contract_delete,ticket,ticket_view,ticket_create,ticket_edit,ticket_delete,master,master_view,master_create,master_edit,master_delete,transaction_details ,transaction_view,transaction_create,transaction_edit,transaction_delete,setting,setting_view,setting_create,setting_edit,setting_delete,reports,reports_view,reports_create,reports_edit,reports_delete,role)
values('${data.data.role_id}','${data.data.remark}','${data.data.assetsfull}','${data.data.assetsview}','${data.data.assetscreate}','${data.data.assetsedit}','${data.data.assetsdeactive}','${data.data.vendContfull}','${data.data.vendContview}','${data.data.vendContcreate}','${data.data.vendContedit}','${data.data.vendContdeactive}','${data.data.ticketfull}','${data.data.ticketview}','${data.data.ticketcreate}','${data.data.ticketedit}','${data.data.ticketdeactive}','${data.data.masterfull}','${data.data.masterview}','${data.data.mastercreate}','${data.data.masteredit}','${data.data.masterdeactive}','${data.data.transactionfull}','${data.data.transactionview}','${data.data.transactioncreate}','${data.data.transactionedit}','${data.data.transactiondeactive}','${data.data.settingfull}','${data.data.settingview}','${data.data.settingcreate}','${data.data.settingedit}','${data.data.settingdeactive}','${data.data.reportsfull}','${data.data.reportsview}','${data.data.reportscreate}','${data.data.reportsedit}','${data.data.reportsedit}','${data.data.role}')`)

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into ${data.data.org}.dbo.tbl_Roles_master
               (role_id,remark,asset,asset_view,asset_create,asset_edit,asset_delete,vendor_contract,vendor_contract_view,vendor_contract_create,vendor_contract_edit,vendor_contract_delete,ticket,ticket_view,ticket_create,ticket_edit,ticket_delete,master,master_view,master_create,master_edit,master_delete,transaction_details ,transaction_view,transaction_create,transaction_edit,transaction_delete,setting,setting_view,setting_create,setting_edit,setting_delete,reports,reports_view,reports_create,reports_edit,reports_delete,role)
        values('${data.data.role_id}','${data.data.remark}','${data.data.assetsfull}','${data.data.assetsview}','${data.data.assetscreate}','${data.data.assetsedit}','${data.data.assetsdeactive}','${data.data.vendContfull}','${data.data.vendContview}','${data.data.vendContcreate}','${data.data.vendContedit}','${data.data.vendContdeactive}','${data.data.ticketfull}','${data.data.ticketview}','${data.data.ticketcreate}','${data.data.ticketedit}','${data.data.ticketdeactive}','${data.data.masterfull}','${data.data.masterview}','${data.data.mastercreate}','${data.data.masteredit}','${data.data.masterdeactive}','${data.data.transactionfull}','${data.data.transactionview}','${data.data.transactioncreate}','${data.data.transactionedit}','${data.data.transactiondeactive}','${data.data.settingfull}','${data.data.settingview}','${data.data.settingcreate}','${data.data.settingedit}','${data.data.settingdeactive}','${data.data.reportsfull}','${data.data.reportsview}','${data.data.reportscreate}','${data.data.reportsedit}','${data.data.reportsedit}','${data.data.role}')`)
        console.log(result)
        res.status(200).send("Added")
    }
    catch(err){
        res.send(err)
    }
}

const getRole = async (req,res) =>{
    const org = req.body.org;
    const sno = req.body.sno;
  
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from ${org}.dbo.tbl_Roles_master  where sno='${sno}'`)
        res.status(200).send(result.recordset)
    }
    catch(err){
        res.send(err)
    }
}

const updateRole = async (req,res) =>{
    const org = req.body.org;
    const role_id = req.body.role_id;
    const remark= req.body.remark;
    const asset = req.body.asset;
    const asset_view = req.body.asset_view;
    const asset_create = req.body.asset_create;
    const asset_edit = req.body.asset_edit;
    const asset_delete = req.body.asset_delete;
    const vendor_contract = req.body.vendor_contract;
    const vendor_contract_view = req.body.vendor_contract_view;
    const vendor_contract_create = req.body.vendor_contract_create;
    const vendor_contract_edit = req.body.vendor_contract_edit;
    const vendor_contract_delete = req.body.vendor_contract_delete;
    const ticket = req.body.ticket;
    const ticket_view = req.body.ticket_view;
    const ticket_create = req.body.ticket_create;
    const ticket_edit = req.body.ticket_edit;
    const ticket_delete = req.body.ticket_delete;
    const master = req.body.master;
    const master_view = req.body.master_view;
    const master_create = req.body.master_create;
    const master_edit = req.body.master_edit;
    const master_delete = req.body.master_delete;
    const transaction_details = req.body.transaction_details;
    const transaction_view = req.body.transaction_view;
    const transaction_create = req.body.transaction_create;
    const transaction_edit = req.body.transaction_edit;
    const transaction_delete = req.body.transaction_delete;
    const setting = req.body.setting;
    const setting_view = req.body.setting_view;
    const setting_create = req.body.setting_create;
    const setting_edit = req.body.setting_edit;
    const setting_delete = req.body.setting_delete;
    const reports = req.body.reports;
    const reports_view = req.body.reports_view;
    const reports_create = req.body.reports_create;
    const reports_edit = req.body.reports_edit;
    const reports_delete = req.body.reports_delete;

    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`update ${org}.dbo.tbl_Roles_master set asset='${asset}',asset_view='${asset_view}'
        ,asset_create ='${asset_create}',asset_edit='${asset_edit}',asset_delete='${asset_delete}',vendor_contract='${vendor_contract}',vendor_contract_view='${vendor_contract_view}',
        vendor_contract_create='${vendor_contract_create}',vendor_contract_edit='${vendor_contract_edit}',vendor_contract_delete='${vendor_contract_delete}',ticket='${ticket}',ticket_view='${ticket_view}',
        ticket_create='${ticket_create}',ticket_edit='${ticket_edit}',ticket_delete='${ticket_delete}',master='${master}',master_view='${master_view}',master_create='${master_create}',master_edit='${master_edit}',
        master_delete='${master_delete}',transaction_details='${transaction_details}',transaction_view='${transaction_view}',transaction_create='${transaction_create}',transaction_edit='${transaction_edit}',transaction_delete='${transaction_delete}',
        setting='${setting}',setting_view='${setting_view}',setting_create='${setting_create}',setting_edit='${setting_edit}',setting_delete='${setting_delete}',reports='${reports}',reports_view='${reports_view}',reports_create='${reports_create}',reports_edit='${reports_edit}',reports_delete='${reports_delete}'
         where sno = ${sno}`)
        res.status(200).send("Updated")
    }
    catch(err){
        res.send(err)
    }
}

module.exports ={totalRoles,insertRoles,getRole,updateRole}