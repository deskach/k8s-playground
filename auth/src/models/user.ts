import {Schema, model, HydratedDocument, Model, Document} from "mongoose";

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
userSchema.static('build', (attrs) => {
    return User.create(attrs);
})

export const User = model<UserAttrs, UserModel>('User', userSchema);
