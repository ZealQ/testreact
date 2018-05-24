const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    firstName:{ type: String, require: true},
    lastName:{ type: String, require: true},
    phoneNumber:{ type: Number, require: true},
});
mongoose.model("User", UserSchema);