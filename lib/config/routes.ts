import { Request, Response } from "express";
// import { NodesController as EmployesController } from "../controllers/employes.controller";
import { UsersController } from '../controllers/user.controller';
import { NotesController } from '../controllers/note.controller';

export class Routes {
  public userController: UsersController = new UsersController();
  public noteController: NotesController = new NotesController();
  // public employeController: EmployesController = new EmployesController();

  public routes(app): void {

    app.route("/").get(this.userController.index);
    app.route("/notes").get(this.noteController.index);
    app.route("/users/:id/notes").get(this.userController.getNotes);
    // app.route("/").get(this.employeController.index);

    // app.route("/employes").get(this.employeController.index);

    // app.route('employes').post(this.employeController.create);

    // app.route('employes').put(this.employeController.update);

    // app.route('employes').delete(this.employeController.delete);

    // app.route("/employes/:id").get(this.employeController.show);
  }
}
