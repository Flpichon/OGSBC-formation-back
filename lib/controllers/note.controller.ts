import { Request, Response } from "express";
import { Note, NoteInterface } from "../models/note";
import { UpdateOptions, DestroyOptions } from "sequelize";

export class NotesController {
  public index(req: Request, res: Response) {
    Note.findAll<Note>({})
      .then((nodes: Array<Note>) => res.json(nodes))
      .catch((err: Error) => res.status(500).json(err));
  };

  public show(req: Request, res: Response) {
    const userId: string = req.params.id;

    Note.findByPk<Note>(userId)
      .then((node: Note | null) => {
        if (node) {
          res.json(node);
        } else {
          res.status(404).json({ errors: ["Note not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  };

}