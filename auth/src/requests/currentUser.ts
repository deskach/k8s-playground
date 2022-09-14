export const currentUser = (app: any) => {
    app.get("/api/users/current-user", (req: any, res:any) => {
        res.send("Hello world!\n")
    })
}