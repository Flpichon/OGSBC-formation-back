import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class Resultat_Reponse extends Model {
  public resultat_ReponseId!: string;
};

export interface Resultat_ReponseInterface {
  userId;
}

Resultat_Reponse.init(
  {
    resultat_ReponseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    }
  },
  {
    tableName: "resultat_reponse",
    sequelize: database,
    updatedAt: false,
    createdAt: false
  }
);