const expenses = require('../models/expenses')
const asyncHandler  = require( 'express-async-handler')
const User = require ('../models/user.js')
const Appointment = require('../models/VaccineAppointment.js')

exports.expenseById = asyncHandler (async (req, res, next, id) => {

    await expenses.findById(id).populate("department").exec((err, expense) => {
        if (err || !expense) {
            return res.status(400).json({
                error: ' Expense does not exist'
            });
        }
        req.expense = expense;
        next();
    });
})




exports.creatExpense = asyncHandler(async (req, res) => {
    try {
        // Create and save the expense
        const expense = new expenses(req.body);
        const savedExpense = await expense.save();

        console.log(savedExpense)
        // Check if the appointment ID is provided in the request
        if (!req.body.appointment) {
            return res.status(400).json({
                message: "Appointment ID is required to associate the expense."
            });
        }

        // Find the appointment and push the expense ID to its billing array
        const appointment = await Appointment.findById(req.body.appointment);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found."
            });
        }

        appointment.billing = savedExpense._id; // Push the expense ID to billing
        await appointment.save(); // Save the updated appointment

        // Respond with the newly created expense
        res.status(201).json({ 
            message: "Expense created and added to appointment billing successfully.",
            expense: savedExpense,
            appointment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while creating the expense.",
            error: error.message
        });
    }
});


exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const expense = await expenses.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })

        if (!expense) {
            return res.status(404).send()
        }

        await expense.save()

        res.send(expense)

    } catch (e) {
        res.status(400).send(e)
    }

})


exports.getExpenseDetail = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    const expense = await expenses.findOne({appointment : req.params.id}).populate("appointment")

    if (expense) {
        res.json(expense)
    } else {
        res.status(404)
        throw new Error('Expense not found')
    }
})


exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await expenses.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Expense removed' })
    } else {
        res.status(404)
        throw new Error('Expense not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    const { doctor, startDate, endDate, page, limit } = req.query; // Pagination and filters

    let field = {};
    if (req.params.userId) {
        const findUser = await User.findById({ _id: req.params.userId });
  
        if (findUser && findUser.role === 1) {
          field["doctor"] = req.params.userId;
        }
      }
  
      // Add filters for status and date if provided
      if (doctor) {
        field["doctor"] = doctor;
      }
  
      if (startDate) {
        
          field["createdAt"] = {
            $gte: startDate, // Start of the day in UTC
            $lte: endDate, // End of the day in UTC
          };
      }
  
      // If pagination parameters are provided, apply pagination
      if (page && limit) {
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
  
        // Get total count for pagination
        const totalExpenses = await expenses.countDocuments(field);
         
        console.log(field)
        // Query with pagination and filters
        const data = await expenses.find(field)
          .populate("patient doctor prescription")
          .sort({date : -1})
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize)
          .exec();
  
        // Send paginated response
        return res.json({
          expense: data,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalExpenses / pageSize),
          totalExpenses,
        });
      }

    const data =  await expenses.find(field).populate("appointment doctor patient")
   res.json(data);
   
})



exports.getPaidValues = (req, res) => {
    res.json(expenses.schema.path('paid').enumValues);
};