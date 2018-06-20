import {GroupsService} from '../services';

import {Request, Response} from "express";
const groupsService = new GroupsService()

export async function getGroups (req: Request, res: Response) {
    const groups = await groupsService.getGroups();
    res.json(groups);
}

export async function addGroup (req: Request, res: Response) {
    const group = await groupsService.addGroup(Number(req.params.groupId),req.body);
    res.json(group);
}

export async function editGroup (req: Request, res: Response) {
    const group = await groupsService.editGroup(Number(req.params.groupId),req.body);
    res.json(group);
}

export async function deleteGroup (req: Request, res: Response) {
    const group = await groupsService.deleteGroup(Number(req.params.groupId));
    res.json(group);
}

export async function getConnectors (req: Request, res: Response) {
    const connectors = await groupsService.getConnectors(Number(req.params.groupId));
    res.json(connectors);
}

export async function deleteConnector (req: Request, res: Response) {
    const connector = await groupsService.deleteConnector(Number(req.params.groupId),Number(req.params.childId),req.body.type);
    res.json(connector);
}







