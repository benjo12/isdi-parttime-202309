import { validate, errors } from 'com';
import { User } from '../data/models.js';

const { SystemError, CredentialsError, NotFoundError } = errors;

export default async function authenticateUser(email, password) {
    try {
        validate.email(email, 'email');
        validate.password(password, 'password');
        
        const user = await User.findOne({ email });
        if (!user) {
            throw new NotFoundError('User not found');
        }
        
        if (user.password !== password) {
            throw new CredentialsError('Wrong password');
        }

        return user.id;
    } catch (error) {
        throw new SystemError(error.message);
    }
}
