var procductModel = require('../model/product')

exports.procduct = async (req, res) => {
    try {

        req.body.image = req.file.filename;
        const procduct = await procductModel.create(req.body)
        res.status(200).json({
            status: 'Success',
            Message: 'Data enter success',
            Data: procduct
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}

exports.show = async (req, res) => {
    try {
        const data = await procductModel.find().populate('userId')
        res.status(200).json({
            status: 'Success',
            Message: 'Data enter success',
            Data: data
        })
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}

exports.delete = async (req, res) => {
    const Id = req.params.id;
    try {
        const deletdata = await procductModel.findByIdAndDelete(Id);

        res.status(200).json({
            status: "success",
            message: 'Data deleted successfully',
            data: deletdata
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
            data: []
        });
    }
};

exports.update = async (req, res) => {
    const Id = req.params.id;

    try {
        const updetedata = await procductModel.findByIdAndUpdate(Id, req.body)
        res.status(200).json({
            status: "success",
            Message: 'data updete succes',
            Data: updetedata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            Message: "not updete"
        })

    }
}