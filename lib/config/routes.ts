import { Request, Response } from "express";
// import { NodesController as EmployesController } from "../controllers/employes.controller";
import { UsersController } from '../controllers/user.controller';
import { NotesController } from '../controllers/note.controller';
import { AuthTokensController } from '../controllers/authToken.controller';


export class Routes {
  public userController: UsersController = new UsersController();
  public noteController: NotesController = new NotesController();
  public AuthToken: AuthTokensController = new AuthTokensController();
  // public employeController: EmployesController = new EmployesController();

  public async routes(app): Promise<void> {

    app.route("/").get(this.userController.index);
    app.route("/notes").get(this.noteController.index);
    app.route("/users/:id/notes").get(this.userController.getNotes);
    app.route("/register").get(await this.userController.register);
    app.route("/login").post(await this.userController.login);
    app.route("/logout").post(await this.userController.logout);
    app.route("/examen").get(await this.userController.getQcms);
    app.route("/resultats").post(await this.userController.SaveResult);
    app.route("/get_resultats").post(await this.userController.GetResult);
    // app.route("/").get(this.employeController.index);

    // app.route("/employes").get(this.employeController.index);

    // app.route('employes').post(this.employeController.create);

    // app.route('employes').put(this.employeController.update);

    // app.route('employes').delete(this.employeController.delete);

    // app.route("/employes/:id").get(this.employeController.show);
  }
}
