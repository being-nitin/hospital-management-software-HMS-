const Setting = require('../models/setting')
const asyncHandler = require('express-async-handler');
const getDataUri = require('../utils/datauri');
const cloudinary = require('cloudinary')


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
      const files = req.files; 
      let uploadResults = {};
      if (files ) {
  
    
      for (const [key, file] of Object.entries(files)) {
        const fileUri = getDataUri(file[0]);
        const result = await cloudinary.v2.uploader.upload(fileUri.content, {
          folder: "setting",
        });
  
        uploadResults[key] = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
    }
  
      const updateFields = {
        ...req.body,
      };

  console.log(updateFields)
      if (uploadResults.header) {
        updateFields.header = uploadResults.header.url;
      }
  
      console.log(uploadResults)
      if (uploadResults.footer) {
        updateFields.footer = uploadResults.footer.url;
      }

      if (uploadResults.logo) {
        updateFields.logo = uploadResults.logo.url;
      }
  
      const settings = await Setting.findOneAndUpdate(
        { _id : '67625f47264ab73588c001da'}, // Find the document by ID
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
  
exports.get = asyncHandler(async (req,res) =>{
    try {

      const settings = await Setting.findOne();
  
      res.status(200).json({
        status: "success",
        data: settings,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "fail", message: "Internal server error" });
    }

})