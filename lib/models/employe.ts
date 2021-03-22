import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

export class Employe extends Model {
  public numero_employe!: string;
  public nom!: string;
  public prenom!: string;
  public adresse: string;
  public telephone: string;
};

export interface EmployeInterface {
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
}

Employe.init(
  {
    numero_employe: {
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
    adresse: {
      type: new DataTypes.STRING(50),
      allowNull: true
    },
    telephone: {
      type: new DataTypes.STRING(15),
      allowNull: true
    },
  },
  {
    tableName: "employe",
    sequelize: database,
    
  }
);

Employe.sync({ force: false }).then(() => console.log("Node table created"));