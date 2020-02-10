const mongoose = require('mongoose');
const BasicInfo = require('../../models/basicInfo')
const presentation = require('../../models/presentation')

exports.get_all_basicInfo_profiles = (req, res, next) => {
    BasicInfo.find({})
    .select('_id title name email phone')
    .exec()
    .then(basicInfoProfiles => {
        const response = {
            count: basicInfoProfiles.length,
            basicInfo: basicInfoProfiles.map(basicInfoProfile => {
                return {
                    _id: basicInfoProfile._id,
                    title: basicInfoProfile.title,
                    name: basicInfoProfile.name,
                    email: basicInfoProfile.email,
                    phone: basicInfoProfile.phone,
                    presentation: basicInfoProfile.presentation,
                    // picture: basicInfoProfile.picture,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/basicinfoprofiles/' + basicInfoProfile._id
                    }
                }
            })
        }
        res.status(200).json([
            response,
            response.basicInfo
        ])
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

// exports.get_individual_basicInfo_profile = (req, res, next) => {
//     const id = req.params.biId
//     BasicInfo.findById(id)
//     .select(info)
//     // .select('_id title name email phone')
//     .exec()
//     .then(basicInfoProfile => {
//         if (basicInfoProfile) {
//             res.status(200).json({
//                 basicInfo: info.basicnfo,
//                 presentation: info.presentation,
//                 request: {
//                     type: 'GET',
//                     url: 'http://localhost:3000/api/basicinfoprofiles'
//                 }
//             });
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
// }

exports.get_individual_basicInfo_profile = (req, res, next) => {
    const id = req.params.biId
    BasicInfo.findById(id)
    mongoose.model('basicinfo').aggregate([
        {
            $lookup: {
                from: "presentation",
                localField: "_id",
                foreignField: "basicinfo",
                as: "presentation"
            }
        }
    ]).exec()
    .then(basicInfoProfile => {
        if (basicInfoProfile) {
            console.log(basicInfoProfile)
            res.status(200).json({
                basicInfo: basicInfoProfile.basicinfo,
                presentation: basicInfoProfile.presentation,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/basicinfoprofiles'
                }
            });
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
}

exports.create_basicInfo_profile = (req, res, next)=> {
    const basicInfo = new BasicInfo({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        presentation: req.body.pId
        // picture: req.body.picture
    });
    basicInfo.save()
    .then(basiciInfoProfile => {
        res.status(201).json({
            message: 'Profile created successfully',
            createdProfile: {
                title: basiciInfoProfile.title,
                name: basiciInfoProfile.name,
                email: basiciInfoProfile.email,
                phone: basiciInfoProfile.phone,
                presentation: basiciInfoProfile.pId,
                // picture: basicInfoProfile.picture,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/basicinfoprofiles/' + basiciInfoProfile._id
                }
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.update_basicInfo_profile = (req, res, next) => {
    const id = req.params.biId;
    BasicInfo.findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        }
    })
    .exec()
    .then(profile => {
        res.status(200).json({
            message: 'Basic info updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/api/basicinfoprofiles/' + id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.remove_basicInfo_profile = (req, res, next) => {
    const id = req.params.biId;
    BasicInfo.deleteOne({_id: id})
    .exec()
    .then(basicInfo => {
        res.status(200).json({
            message: 'Profile deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/api/basicinfoprofiles/' + basicInfo._id,
                body: {
                    title: 'String',
                    name: 'String',
                    email: 'String',
                    phone: 'String',
                    text: 'String',
                    // picture: 'String'
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
}