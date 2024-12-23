const model = require('../model/question')

exports.addquestion= async (req, res)=>{
    try {
        const create = await model.create(req.body)
        res.status(200).json({
            status: 'Successful',
            Message: 'Data enter success',
            Data: create
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}
exports.showdata = async (req, res) => {
    try {
        const show = await model.find();
        res.status(200).json({
            status: 'Successful',
            Message: 'Data show success',
            Data: show
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}
exports.deletedata1 = async (req, res) => {
    const id=req.params.id;
    try {
        const show = await model.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            Message: 'Data delete success',
            Data: show
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}