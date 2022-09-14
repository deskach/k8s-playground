import express from "express";

const router = express.Router();

router.get("/api/users/signin", (req: any, res: any) => {
    res.post("sign-in");
})

export {router as signInRouter};