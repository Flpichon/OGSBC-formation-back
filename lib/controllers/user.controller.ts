import { Request, Response } from "express";
import { Qcm, Reponse, Resultat, Resultat_Reponse, User, UserInterface } from "../models";
import { Note, NoteInterface} from '../models';
import { AuthToken, TokenInterface} from '../models/authToken';
import { UpdateOptions, DestroyOptions, Op } from "sequelize";
import * as bcrypt from 'bcrypt'
import { RSA_NO_PADDING } from "constants";

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

  public async register(req: Request, res: Response) {
    const body = {
      nom: 'lp',
      prenom: 'franck',
      username: 'firefrost'
    }

    const password = 'franck';
    const hash = bcrypt.hashSync(password, 10);
    // const hash = bcrypt.hashSync(req.body.password, 10);
    try {
      // create a new user with the password hash from bcrypt
      let user = await User.create(
        Object.assign(body, { password: hash })
      );
  
      // data will be an object with the user and it's authToken
      let data = await user.authorize();
      console.log("🚀 ~ file: user.controller.ts ~ line 73 ~ UsersController ~ register ~ data", data)
  
      // send back the new user and auth token to the
      // client { user, authToken }
      return res.json(data);
  
    } catch(err) {
      return res.status(400).send(err);
    }
  }

  public async login(req: Request, res: Response) {
    console.log('try to log');
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send(
        'Request missing username or password param'
      );
    }

    try {

      // we will cover the user authenticate method in the next section
      let user = await User.authenticate(username, password);

      return res.json(user);

    } catch (err) {
      return res.status(400).send('invalid username or password');
    }
  }

  public async logout(req: Request, res: Response) {
    const { userId, token } = req.body;
    const userToLogout = await User.findByPk(userId);
    const tokenToDelete = await AuthToken.findOne({where: {token: token}});
    if (userToLogout && tokenToDelete) {
      await userToLogout.logout(tokenToDelete);
      return res.status(204).send()
    }


    return res.status(400).send(
      { errors: [{ message: 'not authenticated' }] }
    );
  }

  public async getQcms(req: Request, res: Response) {
    const qcms = await Qcm.findAll({include: Reponse});
    let qcmsOk = qcms.filter(qcm => (qcm as any).Reponses.length);
    if (!!qcmsOk) {
      return res.json(qcmsOk);
    }
  }

  public async SaveResult(req: Request, res: Response) {
    const reponseIds: any[] = req.body.ids;
    const userId = req.body.userId;
    const nbr = req.body.nbr;
    const resultat = await Resultat.create({
        userId,
        nbr,
        titre: 'Cybersecu' + Math.round(Math.random() * 20)
    });
    const data = reponseIds.map(id => {
      return {
        resultatId: resultat.resultatId,
        reponseId: id
      }
    });
    await Resultat_Reponse.bulkCreate(data);
  }

  public async GetResult(req: Request, res: Response) {
    const userId = req.body.userId;
    const resultats = await Resultat.findAll({
      where: {
        userId: userId
      },
      include: Reponse
    });
    return res.json(resultats);
  }

}