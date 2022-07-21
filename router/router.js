const express = require('express');
const router = express.Router();

const LoginController = require('../controller/Login/Login')

const MasterDeviceTypeController = require('../controller/Master/DeviceTypeMaster')
const MasterDeviceGroupController = require('../controller/Master/DeviceGroupMaster')
const MasterDeviceServiceController = require('../controller/Master/DeviceServicesMaster')
const MasterOperatingSystemController = require('../controller/Master/OperatingSystemMaster')
const MasterServiceComplianceController = require('../controller/Master/ServiceComplianceMaster')

const DeviceTaskComplianceController = require('../controller/DeviceTaskCompliance/DeviceComp')
const DevicesTaskesController = require('../controller/DeviceTaskCompliance/DeviceTaskes')

const MasterAgentController = require('../controller/Master/AgentMaster')
const DeviceController = require('../controller/Device/device')
const MasterDeviceTaskControler = require('../controller/Master/DeviceTask')
const SeriesController = require('../controller/Master/SeriesMaster')
const countController = require('../controller/Master/Count')


router.post('/login',LoginController.UserLogin)

router.get('/totaldevicetypemaster',MasterDeviceTypeController.totaldevicetype)
router.post('/adddevicetypemaster',MasterDeviceTypeController.adddevicetype)
router.post('/getdevicetypemaster',MasterDeviceTypeController.getdevicetype)
router.post('/updatedevicetypemaster',MasterDeviceTypeController.updatedevicetype)
router.post('/updatetypestatusmaster',MasterDeviceTypeController.updatestatus)
router.get('/activedevicetype',MasterDeviceTypeController.Activedevicetype)

router.get('/totaldevicegroupmaster',MasterDeviceGroupController.totaldevicegroup)
router.post('/adddevicegroupmaster',MasterDeviceGroupController.adddevicegroup)
router.post('/getdevicegroupmaster',MasterDeviceGroupController.getdevicegroup)
router.post('/updatedevicegroupmaster',MasterDeviceGroupController.updatedevicegroup)
router.post('/updategroupstatusmaster',MasterDeviceGroupController.updategroupstatus)
router.get('/activedevicegroup', MasterDeviceGroupController.activedevicegroup)

router.get('/totaloperatingsystemmaster',MasterOperatingSystemController.totaloperatingsystem)
router.post('/addoperatingsystemmaster',MasterOperatingSystemController.addoperatingsystemmaster)
router.post('/getoperatingsystemmaster',MasterOperatingSystemController.getoperatingsystem)
router.post('/updateoperatingsystemmaster',MasterOperatingSystemController.updateoperatingsystem)
router.post('/updateoperatingstatusstatusmaster',MasterOperatingSystemController.updateoperatingstatusstatus)
router.get('/activeoperatingsystem',MasterOperatingSystemController.activeoperatingsystem)

router.get('/totaldeviceservicesmaster',MasterDeviceServiceController.totaldeviceservices)
router.post('/adddeviceservicemaster',MasterDeviceServiceController.adddeviceservice)
router.post('/getdeviceservicemaster',MasterDeviceServiceController.getdeviceservice)
router.post('/updatedeviceservicemaster',MasterDeviceServiceController.updatedeviceservice)
router.post('/updatedeviceservicestatusmaster',MasterDeviceServiceController.updatedeviceservicestatus)

router.get('/activedeviceservice',MasterDeviceServiceController.ActiveDeviceService)

router.get('/totalservicecompliancemaster',MasterServiceComplianceController.totalservicecompliance)
router.post('/addservicecompliancemaster',MasterServiceComplianceController.addservicecompliance)
router.post('/getservicecompliancemaster',MasterServiceComplianceController.getservicecompliance)
router.post('/updateservicecompliancemaster',MasterServiceComplianceController.updateservicecompliance)
router.post('/updateservicecompliancestatusmaster',MasterServiceComplianceController.updateservicecompliancestatus)
router.get('/activeservicecompliance',MasterServiceComplianceController.activeservicecompliance)

router.get('/totaldevicetaskcomp',DeviceTaskComplianceController.totaldevicetask)
router.post('/adddeviceTaskcomp',DeviceTaskComplianceController.adddevicetask)
router.post('/getdevicetaskcomp',DeviceTaskComplianceController.getdevicetask)
router.post('/updatedevicetaskcomp',DeviceTaskComplianceController.updatedevicetask)
router.post('/updatedevicecompstatus',DeviceTaskComplianceController.updatedevicecompstatus)
router.post('/getdevicetaskcompliancebyname',DeviceTaskComplianceController.getdevicetaskcompliancebyname)

router.get('/totalagentmaster',MasterAgentController.totalagent)
router.post('/addagentmaster',MasterAgentController.addagent)
router.post('/getagentmaster',MasterAgentController.getagent)
router.post('/updateagentmaster',MasterAgentController.updateagent)
router.post('/updateagentstatusmaster',MasterAgentController.updateagentstatus)
router.get('/activeagent',MasterAgentController.Activeagent)

router.get('/totaldevicetaskmaster',MasterDeviceTaskControler.totaldevicetask)
router.post('/adddevicetaskmaster',MasterDeviceTaskControler.adddevicetask)
router.post('/getdevicetaskmaster',MasterDeviceTaskControler.getdevicetask)
router.post('/updatedevicetaskmaster',MasterDeviceTaskControler.updatedevicetask)
router.post('/updatedevicetaskstatusmaster',MasterDeviceTaskControler.updatestatus)
router.get('/activedevicetask',MasterDeviceTaskControler.Activedevicetask)
router.post('/getdevicetaskfrequency',MasterDeviceTaskControler.getdevicetaskfrequency)

router.get('/totalseries',SeriesController.totalseries)
router.post('/addseries',SeriesController.addseries)
router.post('/getseries',SeriesController.getseries)
router.post('/updateseries',SeriesController.updateseries)
router.post('/updatesseriestatus',SeriesController.updatestatus)
router.get('/activeseriesmaster',SeriesController.Activeseriesmaster)

router.post('/totalcount',countController.totalcount)

router.get('/totaldevice',DeviceController.totaldevice)
router.post('/adddevice',DeviceController.AddDevice)
router.post('/getdevice',DeviceController.getdevice)
router.post('/updatedevice',DeviceController.updatedevice)
router.post('/updatedevicestatus',DeviceController.updatedevicestatus)
router.get('/activedevice',DeviceController.Activedevice)

router.post('/getdevicetaskbyname',DevicesTaskesController.getdevicetaskbyname)
router.post('/adddevicetaskes',DevicesTaskesController.adddevicetaskes)
router.post('/Getdevicestask',DevicesTaskesController.Getdevicetaskes)
router.post('/updatedevicetaskes',DevicesTaskesController.updatedevicetaskes)
router.post('/updatedevicetaskastatus',DevicesTaskesController.updatedevicetaskastatus)



module.exports = router

