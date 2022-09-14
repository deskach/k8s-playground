import express from "express";

const router = express.Router();

router.get("/api/users/signup", (req: any, res: any) => {
    res.post("signup");
})

export {router as signUpRouter};