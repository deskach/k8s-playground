import {HydratedDocument, model, Model, Schema} from "mongoose";

interface TicketAttrs {
    title: string;
    price: number;
    userId?: string;
}

interface TicketDocAttrs extends TicketAttrs {
    createdAt?: string;
    id?: string;
}

export type TicketDoc = HydratedDocument<TicketDocAttrs>;

interface TicketModel extends Model<TicketDocAttrs> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new Schema<TicketDocAttrs, TicketModel>({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
        required: false
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        },
        versionKey: false,
    }
})
ticketSchema.pre('save', async function (done) {
    if (this.isNew) {
        this.createdAt = Date.now().toString();
    }
    done();
})
ticketSchema.static('build', (attrs) => {
    return new Ticket(attrs);
})

export const Ticket = model<TicketAttrs, TicketModel>('Ticket', ticketSchema);
