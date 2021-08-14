import {Sequelize} from "sequelize-typescript";
import {User} from "./User";
import {Profile} from "./Profile";

export const testingSequelize = new Sequelize('sqlite::memory:', {
    models: [User, Profile]
})

describe('User', () => {
    beforeEach(async () => {
        await testingSequelize.authenticate();
        await testingSequelize.sync({force: true});

        const user = new User();
        user.firstName = 'test-firstName';
        user.lastName = 'test-lastName';
        await user.save()
    })

    it('finds by firstName', async () => {
        const user = await User.findByFirstName('test-firstName')
        expect(user).toMatchObject({
            firstName: 'test-firstName',
            lastName: 'test-lastName'
        });
    })

    it('does not find user if specified firstName is not matching', async () => {
        const user = await User.findByFirstName('invalid-firstName')
        expect(user).toBe(null);
    })
})
