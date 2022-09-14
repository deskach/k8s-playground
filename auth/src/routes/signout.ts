import express from "express";

const router = express.Router();

router.get("/api/users/signout", (req: any, res: any) => {
    res.post("signout");
})

export {router as signOutRouter};