import express from "express";
import {json} from "body-parser";
import cookieSession from "cookie-session";
import {NotFoundError} from "@dkmicro/ticketing/build/errors/not-found-error";
import {errorHandlerMw} from "@dkmicro/ticketing/build/middlewares/error-handler-mw";
import {ticketsRouter} from "./routes/tickets";
import {currentUserMw} from "@dkmicro/ticketing";

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
    sameSite: "strict",
}))

app.use(ticketsRouter);

app.all('*', async () => {
    throw new NotFoundError("url not found")
});

app.use(currentUserMw)
// app.use(errorHandlerMw);

export {app}