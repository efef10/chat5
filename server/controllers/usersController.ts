import {UsersService} from '../services';
// import {DB} from '../lib/db';
import {Request, Response} from "express";

// const usersDB = new DB("users");


const usersService = new UsersService()

// export async function getUsers (req: Request, res: Response) {
export async function getUsers (req: Request, res: Response) {
    const users = await usersService.getUsers();
    res.json(users);
}

export async function addUser (req:Request,res:Response) {
    const user = await usersService.addUser(req.body);
    res.json(user);
    // return users;
}

export async function editUser (req:Request,res:Response) {
    const user = await usersService.editUser(Number(req.params.userId),req.body);
    res.json(user);
    // return users;
}

export async function deleteUser (req:Request,res:Response) {
    const user = await usersService.deleteUser(Number(req.params.userId));
    res.json(user);
    // return users;
}



// class UsersController{
//     constructor(){
//
//     }
//
//
//
//     getUsers = async (req:any,res:any)=>{
//         // let users = await usersService.getUsers();
//         let users = await usersDB.getUsers();
//         res.json(users);
//     }
// }
//
/// export default UsersController;