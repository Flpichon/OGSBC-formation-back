import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class Reponse extends Model {
  public reponseId!: string;
  public contenu: string;
  public isValid: boolean;
};

export interface ReponseInterface {
  contenu: string;
  isValid: boolean;
}

Reponse.init(
  {
    reponseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    contenu: {
      type: new DataTypes.STRING,
      allowNull: true,
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: "reponse",
    sequelize: database,
    updatedAt: false,
    createdAt: false
  }
);
