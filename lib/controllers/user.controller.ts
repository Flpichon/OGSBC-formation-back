import { Request, Response } from "express";
import { User, UserInterface } from "../models/user";
import { Note, NoteInterface} from '../models/note';
import { UpdateOptions, DestroyOptions } from "sequelize";

export class UsersController {
  public index(req: Request, res: Response) {
    User.findAll<User>({})
      .then((nodes: Array<User>) => res.json(nodes))
      .catch((err: Error) => res.status(500).json(err));
  };

  // public create(req: Request, res: Response) {
  //   const params: EmployeInterface = req.body;

  //   Employe.create<Employe>(params)
  //     .then((node: Employe) => res.status(201).json(node))
  //     .catch((err: Error) => res.status(500).json(err));
  // };

  public show(req: Request, res: Response) {
    const userId: string = req.params.id;

    User.findByPk<User>(userId)
      .then((node: User | null) => {
        if (node) {
          res.json(node);
        } else {
          res.status(404).json({ errors: ["Employe not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  };

  public getNotes(req: Request, res: Response) {
    const userId: string = req.params.id;
    Note.findAll({
      where: {
        userId
      }
    })
    .then((node: Note[] | null) => {
      if (node) {
        res.json(node);
      } else {
        res.status(404).json({ errors: ["Note note found"] });
      }
    })
    .catch((err: Error) => res.status(500).json(err));
  }

  // public update(req: Request, res: Response) {
  //   const employeId: string = req.params.id;
  //   const params: EmployeInterface = req.body;

  //   const update: UpdateOptions = {
  //     where: { id: employeId },
  //     limit: 1,
  //   };

  //   Employe.update(params, update)
  //     .then(() => res.status(202).json({ data: "success" }))
  //     .catch((err: Error) => res.status(500).json(err));
  // };

  // public delete(req: Request, res: Response) {
  //   const employeId: string = req.params.id;
  //   const options: DestroyOptions = {
  //     where: { id: employeId },
  //     limit: 1,
  //   };

  //   Employe.destroy(options)
  //     .then(() => res.status(204).json({ data: "success" }))
  //     .catch((err: Error) => res.status(500).json(err));
  // }
}