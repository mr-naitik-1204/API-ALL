const CUSTOMERMODEL = require('../model/Customermodel')
exports.Createcustomer = async (req,res) => {
   const Data = await CUSTOMERMODEL.create(req.body)
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
exports.customerShowdata =async (req,res) => {
   try {
      const Data = await CUSTOMERMODEL.find().populate('JewelleryId')
      res.status(200).json({
        status : "success",
        Message : "Data find" ,
        Data : Data
      })
   } catch (error) {
    res.status(404).json({
        status : "Fail",
         Message : error.message
    })
   }
 }

 exports.Delete = async (req,res) => {
   const deleteid = req.params.id
   console.log(deleteid , "delete");
   try {
      await CUSTOMERMODEL.findByIdAndDelete(deleteid)
      res.status(200).json({
         status : "success",
         Message : "Data delete" ,
       })
   } catch (error) {
      res.status(404).json({
         status : "Fail",
          Message : error.message
     })
   }
  }
  exports.Update = async (req,res) => {
   const updateid = req.params.id
   const updatedata = req.body
   // console.log(updateid);
   try {
      const Setdata = await CUSTOMERMODEL.findByIdAndUpdate(updateid,updatedata)
      res.status(200).json({
         status : "success",
         Message : "Data update" ,
         Data : updatedata
       })
   } catch (error) {
      res.status(404).json({
         status : "Fail",
          Message : error.message
     })
   }
}