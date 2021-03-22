import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { Note } from '../models/note';

export class User extends Model {
  public userId!: string;
  public nom!: string;
  public prenom!: string;
};

export interface UserInterface {
  nom: string;
  prenom: string;
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
    }
  },
  {
    tableName: "user",
    sequelize: database,
    updatedAt: false,
    createdAt: false
  },
);

  
User.sync({ force: false }).then(() => console.log("Node table created"));