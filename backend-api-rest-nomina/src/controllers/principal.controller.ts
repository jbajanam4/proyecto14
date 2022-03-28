import { Request, Response } from "express";

export function menuPrincipal(req: Request, res: Response): Response {
  return res.json("Pagina Principal");
}


export function principal3(req: Request, res: Response): Response {
  return res.json("Pagina Departamentos");
}


export function principal4(req: Request, res: Response): Response {
  return res.json("Pagina Empleados");
}