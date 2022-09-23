import {HydratedDocument, model, Model, Schema} from "mongoose";
import {PasswordService} from "../helpers/password-helper";

interface UserAttrs {
    email: string;
    password: string;
}

export type UserDoc = HydratedDocument<UserAttrs>;

interface UserModel extends Model<UserAttrs> {
    build(attrs: UserAttrs): Promise<UserDoc>;
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
        this.password = await PasswordService.toHash(this.password);
    }
    done();
})
userSchema.static('build', (attrs) => {
    return User.create(attrs);
})

export const User = model<UserAttrs, UserModel>('User', userSchema);
