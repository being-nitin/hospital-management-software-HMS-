const VaccineAppointment = require('../models/VaccineAppointment')
const asyncHandler  = require( 'express-async-handler')
const User = require ('../models/user.js')
const moment = require("moment")

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
    try{
    const appointment = await VaccineAppointment.findById(req.params.id).populate("patient doctor prescription")
    
    const pastAppointments = await VaccineAppointment.find({$and :[{ patient : appointment.patient._id}, { _id : { $ne : appointment._id}}, { doctor : appointment.doctor}]}).populate("patient doctor prescription")
    
    if (appointment) {
        res.json({ pastAppointments ,appointment})
    } else {
        res.status(404)
        throw new Error('Vaccine Appointment not found')
    }
}
catch(err){
    console.log(err)
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
        console.log(req.body)
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

    const result = await VaccineAppointment.findByIdAndDelete(id)

    if (result) {
        res.json({ message: 'Vaccine Appointment removed' })
    } else {
        res.status(404)
        throw new Error('Vaccine Appointment not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    const { status, date, page, limit } = req.query; // Pagination and filters

    let field = {};

    // Check if userId is provided and find the user
    if (req.params.userId) {
      const findUser = await User.findById({ _id: req.params.userId });

      if (findUser && findUser.role === 1) {
        field["doctor"] = req.params.userId;
      }
    }

    // Add filters for status and date if provided
    if (status) {
      field["status"] = status;
    }

    if (date) {
        // Convert the provided date to the start and end of the day in UTC
        const startDate = moment(date).startOf('day').utc().toDate(); // Start of the day in UTC
        const endDate = moment(date).endOf('day').utc().toDate(); // End of the day in UTC
    
        // Match documents where createdAt is within the day's range
        field["createdAt"] = {
            $gte: startDate, // Start of the day
            $lte: endDate,   // End of the day
        };
    
        console.log(field["createdAt"]); // Logs the query object
    }
    

    // If pagination parameters are provided, apply pagination
    if (page && limit) {
      const pageNumber = parseInt(page, 10) || 1;
      const pageSize = parseInt(limit, 10) || 10;

      // Get total count for pagination
      const totalAppointments = await VaccineAppointment.countDocuments(field);
       
      console.log(field)
      // Query with pagination and filters
      const data = await VaccineAppointment.find(field).sort({ createdAt : -1 })
        .populate("patient doctor prescription")
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec();

      // Send paginated response
      return res.json({
        appointment: data,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalAppointments / pageSize),
        totalAppointments,
      });
    }

    // If no pagination, return all results
    const data = await VaccineAppointment.find(field).sort({ createdAt : -1 })
      .populate("patient doctor prescription")
      .exec();

    // Send all results
    res.json(data);
})



exports.getTakenValues = (req, res) => {
    res.json(VaccineAppointment.schema.path('status').enumValues);
};


exports.getDayValues = (req, res) => {
    res.json(VaccineAppointment.schema.path('day').enumValues);
};