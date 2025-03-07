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
    const appointment = await VaccineAppointment.findById(req.params.id).populate("patient doctor prescription billing")
    
    const pastAppointments = await VaccineAppointment.find({$and :[{ patient : appointment.patient._id}, { _id : { $ne : appointment._id}}, { doctor : appointment.doctor}]}).populate("patient doctor prescription billing")
    
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


// Utility function to convert duration into minutes
function convertDurationToMinutes(duration) {
    const [hours, minutes] = duration.split(' ').reduce((acc, val) => {
        if (val.includes('hr')) acc[0] += parseInt(val);
        if (val.includes('min')) acc[1] += parseInt(val);
        return acc;
    }, [0, 0]);

    return hours * 60 + minutes;
}

// Utility function to calculate the end time
function calculateEndTime(startTime, durationInMinutes) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + durationInMinutes;

    const endHours = Math.floor(endMinutes / 60);
    const endRemainingMinutes = endMinutes % 60;

    return `${String(endHours).padStart(2, '0')}:${String(endRemainingMinutes).padStart(2, '0')}`;
}



exports.createVaccineApp = asyncHandler(async (req, res) => {
    const { patient, doctor, date, time, duration } = req.body;
    let doctorId;
     if(req.user.role === 1) {
        doctorId = req.user._id
     }

    
    // Convert duration to minutes
    const durationInMinutes = convertDurationToMinutes(duration);

    // Calculate new appointment's end time
    const newEndTime = calculateEndTime(time, durationInMinutes);
    try {

        // Save the new appointment
        const appointment = new VaccineAppointment({
            patient,
            doctor : doctorId ?  doctorId : doctor,
            date : date ,
            time,            
            duration,
        });

        const savedAppointment = await appointment.save();
        res.status(201).json({ data: savedAppointment });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});


exports.read = (req, res) => {
    return res.json(req.appointment);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const appointment = await VaccineAppointment.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },).populate('doctor patient prescription billing')

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
    const { status, date, page, limit , patient } = req.query; // Pagination and filters
    
    let field = {};
    let recent_query = {}
    // Check if userId is provided and find the user
    if (req.params.userId) {
      const findUser = await User.findById({ _id: req.params.userId });

      if (findUser && findUser.role === 1) {
        field["doctor"] = req.params.userId;
        recent_query["doctor"] = req.params.userId
      }
    }

    if (status) {
      field["status"] = status;
    }

    if(patient) {
        field["patient"] = patient
    }


    if (date){
        field["date"] = { $gte : date}
    }

    

    // If pagination parameters are provided, apply pagination
    if (page && limit) {
      const pageNumber = parseInt(page, 10) || 1;
      const pageSize = parseInt(limit, 10) || 10;

      // Get total count for pagination
      const totalAppointments = await VaccineAppointment.countDocuments(field);
      // Query with pagination and filters
      const data = await VaccineAppointment.find(field).sort({ date : -1 })
        .populate("patient doctor prescription  billing")
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec();
     
        const startOfToday = new Date();
startOfToday.setUTCHours(0, 0, 0, 0);

const startOfTomorrow = new Date();
startOfTomorrow.setUTCHours(24, 0, 0, 0);

recent_query["date"] = { 
  $gte: startOfToday, 
  $lt: startOfTomorrow
};

        

        const todayAppointment = await VaccineAppointment.find(recent_query).sort({ date : -1 }).populate('patient doctor')
        .populate("patient")
        .exec();
      
      return res.json({
        appointment: data,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalAppointments / pageSize),
        todayAppointment,
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