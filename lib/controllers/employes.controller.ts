import { Request, Response } from "express";
import { Employe, EmployeInterface } from "../models/employe";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class NodesController {
  public index(req: Request, res: Response) {
    Employe.findAll<Employe>({})
      .then((nodes: Array<Employe>) => res.json(nodes))
      .catch((err: Error) => res.status(500).json(err));
  };

  public create(req: Request, res: Response) {
    const params: EmployeInterface = req.body;

    Employe.create<Employe>(params)
      .then((node: Employe) => res.status(201).json(node))
      .catch((err: Error) => res.status(500).json(err));
  };

  public show(req: Request, res: Response) {
    const employeId: string = req.params.id;

    Employe.findByPk<Employe>(employeId)
      .then((node: Employe | null) => {
        if (node) {
          res.json(node);
        } else {
          res.status(404).json({ errors: ["Employe not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  };

  public update(req: Request, res: Response) {
    const employeId: string = req.params.id;
    const params: EmployeInterface = req.body;

    const update: UpdateOptions = {
      where: { id: employeId },
      limit: 1,
    };

    Employe.update(params, update)
      .then(() => res.status(202).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  };

  public delete(req: Request, res: Response) {
    const employeId: string = req.params.id;
    const options: DestroyOptions = {
      where: { id: employeId },
      limit: 1,
    };

    Employe.destroy(options)
      .then(() => res.status(204).json({ data: "success" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}