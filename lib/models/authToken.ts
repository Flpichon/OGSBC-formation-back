import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { User } from "./user";

export class AuthToken extends Model {
  public token!: string;
  static generate: (UserId: any) => Promise<AuthToken>;
};

export interface TokenInterface {
  token: string;
}

AuthToken.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "authtoken",
    sequelize: database,
  },
);


AuthToken.generate = async function (UserId) {
  if (!UserId) {
    throw new Error('AuthToken requires a user ID')
  }

  let token = '';

  const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 15; i++) {
    token += possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
  }
  
  return AuthToken.create({ token, userId: UserId })
}
