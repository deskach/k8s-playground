import {HydratedDocument, model, Model, Schema} from "mongoose";
import {PasswordHelper} from "../helpers/password-helper";

interface UserAttrs {
    email: string;
    password: string;
}

export type UserDoc = HydratedDocument<UserAttrs>;

interface UserModel extends Model<UserAttrs> {
    build(attrs: UserAttrs): UserDoc;
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
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false,
    }
})
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        this.password = await PasswordHelper.toHash(this.password);
    }
    done();
})
userSchema.static('build', (attrs) => {
    return new User(attrs);
})

export const User = model<UserAttrs, UserModel>('User', userSchema);
