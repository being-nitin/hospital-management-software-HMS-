const Prescription = require('../models/prescription')
const asyncHandler  = require( 'express-async-handler')
const Appointment = require('../models/VaccineAppointment')

exports.createPrescription = asyncHandler(async (req, res) => {
    try {
        const { appId } = req.query
    const prescriptions = await  Prescription.insertMany(req.body);

        if(appId) {
        const findappointment = await Appointment.findById(appId)
          
        let prescriptionIds  =prescriptions.map((prescription , index)  => prescription._id)
        findappointment.prescription.push([...prescriptionIds])
        await findappointment.save()
        }
        res.json({ data : prescriptions });
    }
    catch(err) {
        console.log(err)
    }
})


exports.presById = asyncHandler (async (req, res, next, id) => {

    await Prescription.findById(id).exec((err, prescription) => {
        if (err || !prescription) {
            return res.status(400).json({
                error: ' Prescription does not exist'
            });
        }
        req.prescription = prescription;
        next();
    });
})


exports.getPrescriptionDetail = asyncHandler(async (req, res) => {
    const prescription = await Prescription.findById(req.params._id).populate("patient treatment test")

    if (prescription) {
        res.json({
            _id: prescription._id,
            user: prescription.user._id,
            treatment: prescription.treatment._id,
            medicine: prescription.medicine,
            time: prescription.time,
            days: prescription.days,
            take: prescription.take,
            test: prescription.test._id,
            paid: prescription.paid,
            history: prescription.history
        })
    } else {
        res.status(404)
        throw new Error('Prescription not found')
    }
})


exports.getPrescriptionDetailUser = asyncHandler(async (req, res) => {
    const prescription = await Prescription.find({user: req.params.id}).populate("user treatment test")

    if (prescription) {
        res.json(prescription)
    } else {
        res.status(404)
        throw new Error('Prescriptions not found')
    }
})




exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const prescription = await Prescription.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })


        if (!prescription) {
            return res.status(404).send()
        }

        await prescription.save()

        res.send(prescription)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params
     const {appId } = req.body
    const result = await Prescription.findById(id)

    if(appId) {
        const findappointment = await Appointment.findById(appId)
          
        findappointment.prescription.pull(result._id)
        
        await findappointment.save()
        }

    if (result) {
        await result.remove()
        res.json({ message: 'Prescription removed' })
    } else {
        res.status(404)
        throw new Error('Prescription not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await Prescription.find({}).populate("patient test treatment").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})


exports.getTakeValues = (req, res) => {
    res.json(Prescription.schema.path('take').enumValues);
};


exports.getPaidValues = (req, res) => {
    res.json(Prescription.schema.path('paid').enumValues);
};
