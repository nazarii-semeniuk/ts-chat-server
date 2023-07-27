import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './User';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    avatar: { type: String },
    createdAt: { type: Date, default: new Date() }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toObject', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

const UserModel = mongoose.model<User & mongoose.Document>('users', UserSchema);

export default UserModel;