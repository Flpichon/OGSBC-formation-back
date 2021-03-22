import {Sequelize} from 'sequelize';

export const database = new Sequelize('mysql://root:@localhost:3306/ogsbc', {});