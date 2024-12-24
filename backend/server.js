import express from "express";

const app = express();

app.get("/", (request, result) => {
    result.send("Testing!");

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});