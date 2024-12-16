const Setting = require('../models/setting')
const asyncHandler = require('express-async-handler');


exports.create = asyncHandler(async (req,res) =>{
    try {
       const setting = await Setting.create({})

       
      res.status(200).json({
        status: "success"
      });
    } catch(err) {
      console.error(err);
      res.status(500).json({ status: "fail", message: "Internal server error" });
    }
})

exports.update = asyncHandler(async (req, res) => {
    try {
      const files = req.files; // Use req.files to handle multiple uploaded files
      if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({ status: "fail", message: "No files uploaded" });
      }
  
      const uploadResults = {};
      for (const [key, file] of Object.entries(files)) {
        const fileUri = getDataUri(file[0]); // Extract the file from the array
        const result = await cloudinary.v2.uploader.upload(fileUri.content, {
          folder: "setting",
        });
  
        uploadResults[key] = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
  
      const updateFields = {
        ...req.body,
      };
  
      if (uploadResults.header) {
        updateFields.header = uploadResults.header;
      }
  
      if (uploadResults.footer) {
        updateFields.footer = uploadResults.footer;
      }
  
      const settings = await Setting.findOneAndUpdate(
        { }, // Find the document by ID
        { $set: updateFields }, // Update the fields dynamically
        { new: true } // Return the updated document
      );
  
      res.status(200).json({
        status: "success",
        data: settings,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "fail", message: "Internal server error" });
    }
  });
  