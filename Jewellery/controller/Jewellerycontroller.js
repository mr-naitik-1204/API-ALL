const JEWELLERYMODEL = require('../model/Jewellerymodel')


exports.CreateJewellery = async (req,res) => {
   const Data = await JEWELLERYMODEL.create(req.body)
   try {
    res.status(200).json({
        status : "success",
        Message : "Data enter sucessfully",
        Data : Data
    })
   } catch (error) {
     res.status(400).json({
        status : "Fail",
        Message : error.message
     })
   }
}

exports.getJewellery = async (req,res) => {
   const Data = await JEWELLERYMODEL.find(req.body)
   try {
    res.status(200).json({
        status : "success",
        Message : "Data enter sucessfully",
        Data : Data
    })
   } catch (error) {
     res.status(400).json({
        status : "Fail",
        Message : error.message
     })
   }
}