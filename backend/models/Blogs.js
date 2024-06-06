const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BLogSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    image:{
        type: String,
        require: true   
    },
    date:
    {
        type: Date,
        require: Date.now

    }
});
module.exports = mongoose.model('blogs', BLogSchema)
// const modelName = 'user';
// if (!mongoose.models[modelName]) {
//     module.exports = mongoose.model(modelName, BlogSchema);
// } else {
//     module.exports = mongoose.models[modelName];
// }
