import {Sequelize} from "sequelize-typescript";
import {Profile} from "./models/Profile";
import {User} from "./models/User";

export const sequelize = new Sequelize('sqlite::memory:', {
    models: [User, Profile]
})

