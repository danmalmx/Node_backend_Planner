const express = require('express');
const router = express.Router();
const BasicInfoProfilesController = require('./../controllers/basicinfos')


//BASIC INFO
router.get('/', BasicInfoProfilesController.get_all_basicInfo_profiles);
router.get('/:biId', BasicInfoProfilesController.get_individual_basicInfo_profile);
router.post('/', BasicInfoProfilesController.create_basicInfo_profile);
router.put('/:biId', BasicInfoProfilesController.update_basicInfo_profile);
router.delete('/:biId', BasicInfoProfilesController.remove_basicInfo_profile);

module.exports = router;