const { Payment, Client } = require('../db')

const getPayments = async (req, res) => {
    try {
        const response = await Payment.findAll(
  
        );
        console.log(response);
    res.status(200).json(response)
    } catch (error) {
        res.status(500).send({ msg: 'Error servidor.', error })
    }
}
module.exports = {
    getPayments
}