var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;
var voucherSchema = new Schema({
        code: {
            type: String,
            length: 250,
            required: [true, "code is Mandatory"]

        },
        name: {
            type: String,
            length: 250,
            required: [true, "name is Mandatory"]

        },
        description: {
            type: String,
            length: 250
        },
        key: String,
        status: {
            type: String,
            enum: ['Active', 'De-Active'],
            default: 'Active'
        }
    },
    {
        timestamps: true
    },
    {
        versionKey: false
    });
module.exports = restful.model('Vouchers', voucherSchema);