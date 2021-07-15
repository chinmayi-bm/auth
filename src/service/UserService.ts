import bcrypt from 'bcryptjs';
import { db } from '../models';
import jwt from 'jsonwebtoken';
const User = db.users;

class UserService {
    public register = async (payload: { mobile?: any; email?: any; name?: any; password: any; }) => {
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash password with salt
        const hashedPassword = await bcrypt.hash(payload.password, salt);

        // Create payload
        payload.password = hashedPassword;

        // Save User in the database
        const createdUser = await User.create(payload);
        return createdUser;
    }

    public login = async (payload: { email: any; password: any; }) => {
        const dbUser = await User.findAll({ where: { email: payload.email } });
        if (!dbUser.length) {
            throw new Error('User not found');
        }
        const user = dbUser[0].dataValues;

        const isValidPassword = await bcrypt.compare(payload.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        const tokenSecret = String(process.env.TOKEN_SECRET);
        const token = jwt.sign({ id: user.id, name: user.name }, tokenSecret);
        const formatLoginResponse = await this.formatLoginResponse(user, token);
        return formatLoginResponse;
    }

    public formatUserResponse = async (response: { mobile?: any; email?: any; name?: any; password: any; }) => {
        const formattedResponse = JSON.parse(JSON.stringify(response));
        delete formattedResponse.password;
        return formattedResponse;
    }

    public formatLoginResponse = async (user: any, token: string) => {
        const formattedResponse = JSON.parse(JSON.stringify(user));
        delete formattedResponse.password;
        formattedResponse.authToken = token;
        return formattedResponse;
    }
}
export const userService = new UserService();
