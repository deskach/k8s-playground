import express from "express";

const router = express.Router();

router.get("/api/users/current-user", (req: any, res: any) => {
    res.send("Hello world!\n");
})

export {router as currentUserRouter};