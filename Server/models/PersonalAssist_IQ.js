const mongoose = require('mongoose');

const PersonalAssist_IQSchema = new mongoose.Schema({ // Fixed typo from 'Scahema' to 'Schema'
    name: String,
    email: String,
    password: String
});

const PersonalAssist_IQModel = mongoose.model("users", PersonalAssist_IQSchema);
module.exports = PersonalAssist_IQModel;
