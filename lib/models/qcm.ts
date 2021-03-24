import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class Qcm extends Model {
  public qcmId!: string;
  public theme: string;
  public enonce: string
};

export interface QcmInterface {
  theme: string;
}

Qcm.init(
  {
    qcmId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    theme: {
      type: new DataTypes.STRING,
      allowNull: true,
    },
    enonce: {
      type: new DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "qcm",
    sequelize: database,
    updatedAt: false,
    createdAt: false
  }
);
