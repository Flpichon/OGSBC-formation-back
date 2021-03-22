import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";
import { User } from "./user";

export class Note extends Model {
  public noteId!: string;
  public valeur!: Number;
};

export interface NoteInterface {
  valeur: Number;
}

Note.init(
  {
    noteId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    valeur: {
      type: new DataTypes.DECIMAL,
      allowNull: false,
    }
  },
  {
    tableName: "note",
    sequelize: database,
    updatedAt: false,
    createdAt: false
  }
);

Note.belongsTo(User, {foreignKey: 'userId'});

Note.sync({ force: false }).then(() => console.log("Node table created"));