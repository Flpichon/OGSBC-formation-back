import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { AuthToken } from './authToken';
import * as bcrypt from 'bcrypt';
import { Note } from '../models/note';

export class User extends Model {
  public userId!: string;
  public nom!: string;
  public prenom!: string;
  public username!: string;
  public password!: string;

  static authenticate: (username: any, password: any) => Promise<any>;
  static associate: ({ AuthToken }: { AuthToken: any; }) => void;

  async authorize() {
    const user = this;

    const authToken = await AuthToken.generate(user.userId)

    // await (user as any).addAuthToken(authToken);
    return { user, authToken };
  }

  async logout(token) {
    AuthToken.destroy({ where: {token: token.token}});
  };

};

export interface UserInterface {
  nom: string;
  prenom: string;
  username: string;
  password: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    prenom: {
      type: new DataTypes.STRING(20),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    sequelize: database,
    updatedAt: false,
    createdAt: false
  },
);

// User.hasMany(AuthToken, {foreignKey: 'userId'});
User.authenticate = async function(username, password) {

  const user = await User.findOne({ where: { username } });

  if (bcrypt.compareSync(password, user.password)) {
    return await user.authorize();
  };

  throw new Error('invalid password');
}

