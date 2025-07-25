export const homeController = (req,res)=>{
    res.send("this is the home router");
};

export const userController = (req,res)=>{
    const username = req.params.id;
    res.send(`welcome ${username}`);
};

export const searchController = (req,res)=>{
    const d = req.query.data;
    res.send(`finding results for ${d}`);
};