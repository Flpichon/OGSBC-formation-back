import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class Resultat extends Model {
  public resultatId!: string;
  public userId!: string;
  public nbr: Number;
  public titre: string;
};

export interface ResultatInterface {
  userId;
  nbr;
}

Resultat.init(
  {
    resultatId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: new DataTypes.STRING,
      allowNull: false,
    },
    titre: {
      type: new DataTypes.STRING,
      allowNull: true,
    },
    nbr: {
      type: new DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "resultat",
    sequelize: database,
    createdAt: false
    
  }
);