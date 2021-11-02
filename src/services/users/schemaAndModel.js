import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // role: { type: String, default: "User", enum: ["User", "Admin"] },
})

// #1 hash password before saving user in DB -> 
//  MONGOOSE HOOK: schema.pre("save", bcrypt stuff)
//  ⚠ use 'function' and not () => because of 'this'
userSchema.pre("save", async function (next) {
    const thisUser = this
    if(thisUser.isModified("password")) {
        thisUser.password = await bcrypt.hash(thisUser.password, 10)
    }
    next()
})

// #2 hide encoded password from response data -> we either use:
// a) projection (ex: .find( { status: "A" }, { item: 1, status: 1 } ))
// b) toJSON -> toObject() -> delete -> return
//     - toJSON = predefined model method -> executed every time express performs a res.send
//     - ⚠ need to transform document (this) into OBJECT if we want to manipulate it
//     - delete does NOT affect the database
userSchema.methods.toJSON = function () {
    const userDocument = this
    // ⚠
    const userObject = userDocument.toObject()
    delete userObject.password

    return userObject
}

export default model("User", userSchema)