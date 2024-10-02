const VaccineAppointment = require('../models/VaccineAppointment')
const asyncHandler  = require( 'express-async-handler')
const User = require ('../models/user.js')

exports.vaccineAppointById = async (req, res, next, id) => {

    await VaccineAppointment.findById(id).exec((err, appointment) => {
        if (err || !appointment) {
            return res.status(400).json({
                error: 'VaccineAppointment does not exist'
            });
        }
        req.appointment = appointment;
        next();
    });
};


exports.getVaccineApp = asyncHandler(async (req, res) => {
    const appointment = await VaccineAppointment.findById(req.params.id).populate("patient doctor prescription")

    if (appointment) {
        res.json(appointment)
    } else {
        res.status(404)
        throw new Error('Vaccine Appointment not found')
    }
})



exports.createVaccineApp = asyncHandler(async (req, res) => {
    const appointment = new VaccineAppointment(req.body);
    await appointment.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.appointment);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const appointment = await VaccineAppointment.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },).populate('doctor patient prescription')

        if (!appointment) {
            return res.status(404).send()
        }

        await appointment.save()

        res.send(appointment)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await VaccineAppointment.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Vaccine Appointment removed' })
    } else {
        res.status(404)
        throw new Error('Vaccine Appointment not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    let field = {}

    if(req.params)
    {
        const findUser = await User.findById({_id : req.params.userId})

        if(findUser.role === 1){
        field['doctor'] = req.params.userId
        }
        
    }

    await VaccineAppointment.find(field).populate("patient doctor prescription").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})



exports.getTakenValues = (req, res) => {
    res.json(VaccineAppointment.schema.path('status').enumValues);
};


exports.getDayValues = (req, res) => {
    res.json(VaccineAppointment.schema.path('day').enumValues);
};