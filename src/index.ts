import "reflect-metadata";
import {createConnection} from "typeorm";
import express, {Request,Response} from 'express';

import {User} from "./entity/User";

const app = express();
app.use(express.json());

//Create
app.post('/users',async (req: Request, res: Response)=>{
    const {name,email,role} = req.body;

    try{
        const user = User.create({name,email,role});
        await user.save();
        return res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }

})


//Get
app.get('/users',async (req: Request, res: Response)=>{

    try{
        const users =await User.find();
        return res.status(200).json(users);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }

})

//Update
app.put('/users/:uuid',async (req: Request, res: Response)=>{

    const uuid = req.params.uuid;
    const {name,email,role} = req.body;

    try{
        const user =await User.findOneOrFail({uuid});
        user.name =name || user.name;
        user.email =email || user.email
        user.role =role || user.role
        await user.save();
        return res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }

})

createConnection().then(async (connection) => {

    /*console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");*/

    app.listen(5000,()=>{
        console.log('running at 5000');
    })

}).catch(error => console.log(error));
