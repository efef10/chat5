import {UsersService} from '../services';
// import {DB} from '../db/db';
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
    const user = await usersService.editUser(req.params.userId,req.body.updates);
    res.json(user);
    // return users;
}

export async function deleteUser (req:Request,res:Response) {
    const user = await usersService.deleteUser(req.params.userId);
    res.json(user);
    // return users;
}

export async function addMessageToUser (req:Request,res:Response) {
    const message = await usersService.addMessageToUser(req.params.userName,req.body.content,req.body.toUser);
    res.json(message);
    // return users;
}

export async function getUserMessages (req:Request,res:Response) {
    const messages = await usersService.getUserMessages(req.params.userName,req.params.chattingWith);
    res.json(messages);
    // return users;
}
