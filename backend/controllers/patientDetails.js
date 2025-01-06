const patientDetails = require('../models/patientDetails')
const asyncHandler  = require( 'express-async-handler')
const VaccineAppointment = require('../models/VaccineAppointment')

exports.patientsById = asyncHandler (async (req, res, next, id) => {

    await patientDetails.findById(id).populate("user").exec((err, patient) => {
        if (err || !patient) {
            return res.status(400).json({
                error: ' Patient does not exist'
            });
        }
        req.patient = patient;
        next();
    });
})



exports.creatPatientDetails = asyncHandler(async (req, res) => {
    //console.log(req.body)
    const patient = new patientDetails(req.body);
    await patient.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(req.params)
        const patient = await patientDetails.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })

        if (!patient) {
            return res.status(404).send()
        }

        await patient.save()

        res.send(patient)

    } catch (e) {
        res.status(400).send(e)
    }

})


exports.getPatientDetail = asyncHandler(async (req, res) => {

    const patient = await patientDetails.findById(req.params.id).populate("doctor")

    if (patient) {
        res.json({
            _id: patient._id,
            firstName : patient.firstName,
            lastName: patient.lastName,
            patientNumber: patient.patientNumber,
            regDate: patient.regDate,
            address: patient.address,
            phoneNo: patient.phoneNo,
            birthDate: patient.birthDate,
            guardian: patient.guardian,
            relation: patient.relation,
            gender: patient.gender,
            symptoms : patient.symptoms
        })
    } else {
        res.status(404)
        throw new Error('Patient not found')
    }
})




exports.getPatientDetailUser = asyncHandler(async (req, res) => {

    // const patient = await patientDetails.findOne({ _id: req.params.id }).populate("doctor")
    const patient = await VaccineAppointment.find({patient : req.params.id}).populate("patient doctor prescription")

    if (patient) {
        res.json(patient)
        // res.json({
        //     _id: patient._id,
        //
        //     lastName: patient.lastName,
        //     idNumber: patient.idNumber,
        //     regDate: patient.regDate,
        //     address: patient.address,
        //     cell: patient.cell,
        //     birthDate: patient.birthDate,
        //     residence: patient.residence,
        //     email: patient.email,
        //     guardian: patient.guardian,
        //     relation: patient.relation,
        //     gender: patient.gender,
        //     statusPatient: patient.statusPatient,
        //     patientType: patient.patientType,
        //     image: patient.image
        // })
    } else {
        res.status(404)
        throw new Error('Patient not found')
    }
})




exports.remove = asyncHandler(async (req, res) => {

    const { patient } = req.params

    const result = await patientDetails.findById(patient)

    if (result) {
        await result.remove()
        res.json({ message: 'Patient removed' })
    } else {
        res.status(404)
        throw new Error('Patient not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    const { firstName, lastName, phoneNo, patientNumber, address, page, limit = 10 } = req.query;

    const query = {};
    
    if (firstName) {
      query.firstName = { $regex: firstName, $options: "i" };
    }
    if (lastName) {
      query.lastName = { $regex: lastName, $options: "i" };
    }
    if (phoneNo) {
      query.phoneNo = { $regex: phoneNo, $options: "i" };
    }
    if (patientNumber) {
      query.patientNumber = { $regex: patientNumber, $options: "i" };
    }
    if (address) {
      query.address = { $regex: address, $options: "i" };
    }
    
    if (!page) {
      // If `page` is not provided, return all patients matching the query
      console.log("query" ,query)
      const patients = await patientDetails.find(query).populate("doctor");
      return res.json({ patient : patients });
    }
    
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    
    const totalPatients = await patientDetails.countDocuments(query); // Get total count
    const patients = await patientDetails
      .find(query)
      .populate("doctor")
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    
    console.log(patients)
    res.json({
      patient : patients,
      page: pageNumber,
      totalPages: Math.ceil(totalPatients / pageSize),
      totalPatients,
    });
    

})

exports.getGenderValues = (req, res) => {
    res.json(patientDetails.schema.path('gender').enumValues);
};

exports.getStatusValues = (req, res) => {
    res.json(patientDetails.schema.path('statusPatient').enumValues);
};


exports.getPatientTypeValues = (req, res) => {
    res.json(patientDetails.schema.path('patientType').enumValues);
};
