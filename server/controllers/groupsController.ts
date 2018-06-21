import {GroupsService} from '../services';

import {Request, Response} from "express";
const groupsService = new GroupsService()

export async function getGroups (req: Request, res: Response) {
    const groups = await groupsService.getGroups();
    res.json(groups);
}

export async function addGroup (req: Request, res: Response) {
    const group = await groupsService.addGroup(req.params.groupId,req.body);
    res.json(group);
}

export async function editGroup (req: Request, res: Response) {
    const group = await groupsService.editGroup(req.params.groupId,req.body);
    res.json(group);
}

export async function deleteGroup (req: Request, res: Response) {
    const group = await groupsService.deleteGroup(req.params.groupId);
    res.json(group);
}

export async function getConnectors (req: Request, res: Response) {
    const connectors = await groupsService.getConnectors(req.params.groupId);
    res.json(connectors);
}

export async function deleteConnector (req: Request, res: Response) {
    const connector = await groupsService.deleteConnector(req.params.groupId,req.params.childId,req.body.type);
    res.json(connector);
}

export async function addConnector (req: Request, res: Response) {
    const group = await groupsService.addConnector(req.params.groupId,req.body.connectorId,req.body.type);
    res.json(group);
}

export async function getTree (req: Request, res: Response) {
    const tree = await groupsService.getTree();
    res.json(tree);
}









