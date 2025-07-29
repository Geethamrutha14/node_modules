const express = require('express');
const data = require('./MOCK_DATA.json');
const app = express();
const fs = require('fs');

app.use(express.urlencoded({extended : false}));

app.get("/api/users", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 2));
});

app.get("/users", (req, res) => {
    const html = `<ul> ${data.map((user)=> `<li> ${user.first_name} </li>`).join(" ")} </ul>`;
    res.send(html);
});

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = data.find((user)=> user.id === id);
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify(user,null,2));
});

app.listen(8000, () => {
    console.log("Server started listening on port 8000");
});
