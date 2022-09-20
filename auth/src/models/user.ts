import {Schema, model, HydratedDocument, Model, Document} from "mongoose";
import {PasswordService} from "../services/password";

interface UserAttrs {
    email: string;
    password: string;
}

interface UserModel extends Model<UserAttrs> {
    build(attrs: UserAttrs): Promise<HydratedDocument<UserAttrs>>;
}

const userSchema = new Schema<UserAttrs, UserModel>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        this.password = await PasswordService.toHash(this.password);
    }
    done();
})
userSchema.static('build', (attrs) => {
    return User.create(attrs);
})

export const User = model<UserAttrs, UserModel>('User', userSchema);
