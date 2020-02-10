const express = require('express');
const router = express.Router();
const PresentationProfilesController = require('./../controllers/presentations')


//PRESENTATION
router.get('/', PresentationProfilesController.get_all_presentation_profiles);
router.get('/:pId', PresentationProfilesController.get_individual_presentation_profile);
router.post('/', PresentationProfilesController.create_presentation_profile);
router.patch('/:pId', PresentationProfilesController.update_presentation_profile);
router.delete('/:pId', PresentationProfilesController.remove_presentation_profile);

module.exports = router;