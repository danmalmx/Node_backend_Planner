const mongoose = require('mongoose');
const Presentation = require('../../models/presentation')
const BasicInfoController = require('../controllers/basicInfos')


exports.get_all_presentation_profiles = (req, res, next) => {
    Presentation.find({})
    .select('_id presentation')
    .populate('basicinfo')
    .exec()
    .then(presentationProfile => {
        console.log(presentationProfile)
        const response = {
            count: presentationProfile.length,
            presentation: presentationProfile.map(presentationProfile => {
                return {
                    _id: presentationProfile._id,
                    presentation: presentationProfile.presentation,
                    basicinfo: presentationProfile.basicinfo,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/presentationprofiles/' + presentationProfile._id
                    }
                }
            })
        }
        res.status(200).json([
            response,
            response.presentation
        ])
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

// exports.get_individual_presentation_profile = (req, res, next) => {
//     const _id = req.params.pId;
//     Presentation.findById(_id)
//     .select('_id presentation basicinfo')
//     .populate('basicinfo')
//     .exec()
//     .then(presentation => {
//         if (presentation) {
//             res.status(200).json({
//                 presentation: presentation,
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:3000/api/presentationprofiles'
//                 }
//             });
//             console.log(presentation)
//         } else {
//             res.status(404).json({message: 'No valid entry for provided Id'});
//         }
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     });
// };

exports.get_individual_presentation_profile = (req, res, next) => {
    const _id = req.params.pId;
    Presentation.findById(_id)
    .$where(() => presentation.basicinfo._id === BasicInfoController.get_individual_basicInfo_profile.biId)
    .select('_id presentation basicinfo')
    .populate('presentation')
    .exec()
    .then(presentation => {
        if (presentation) {
            res.status(200).json({
                presentation: presentation,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/presentationprofiles'
                }
            });
            console.log(presentation)
        } else {
            res.status(404).json({message: 'No valid entry for provided Id'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};

exports.create_presentation_profile = (req, res, next) => {
    const presentation = new Presentation({
        _id: new mongoose.Types.ObjectId(),
        presentation: req.body.presentation,
        basicinfo: req.body.biId
    });
    presentation
    .save()
    .then(presentationProfile => {
        console.log(presentationProfile)
        res.status(201).json({
            message: 'Presentation created successfully',
            createdProfile: {
                _id: presentationProfile._id,
                presentation: presentationProfile.presentation,
                basicinfo: presentationProfile.basicinfo,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/presentationprofiles/' + presentationProfile._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.update_presentation_profile = (req, res, next) => {
    const id = req.params.pId;
    Presentation.findByIdAndUpdate(id, {$set: {presentation: req.body.presentation}})
        .exec()
    .then(presentation => {
        res.status(200).json({
            message: 'Profile updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/api/presentationprofiles/' + id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.remove_presentation_profile = (req, res, next) => {
    const id = req.params.pId;
    Presentation.remove({_id: id})
    .exec()
    .then(profile => {
        res.status(200).json({
            message: 'Profile deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/api/presentationprofiles',
                body: {
                    presentation: 'String'
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};