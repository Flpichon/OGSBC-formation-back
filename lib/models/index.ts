import { AuthToken, TokenInterface } from './authToken';
import { Note, NoteInterface } from './note';
import { User, UserInterface } from './user';
import {Qcm, QcmInterface} from './qcm';
import {Reponse, ReponseInterface} from './reponse';

Note.belongsTo(User, {foreignKey: 'userId'});
AuthToken.belongsTo(User, {foreignKey: 'userId'});
Reponse.belongsTo(Qcm, {foreignKey: 'qcmId'});
Qcm.hasMany(Reponse, {foreignKey: 'qcmId'});

User.sync({ force: false }).then(() => console.log("user table created"));
Note.sync({ force: false }).then(() => console.log("Note table created"));
AuthToken.sync({ force: false }).then(() => console.log("Token table created"));
Qcm.sync({ force: false }).then(() => console.log("Qcm table created"));
Reponse.sync({ force: false }).then(() => console.log("Reponse table created"));


export { AuthToken, TokenInterface, Note, NoteInterface, User, UserInterface, Qcm, QcmInterface, Reponse, ReponseInterface };