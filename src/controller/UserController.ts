import { Request, Response } from 'express';
import { userService } from '../service/UserService';

class UserController {
    public register = async (req: Request, res: Response) => {
        try {
            // create payload
            const payload = {
                mobile: req.body.mobile,
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
            };
            
            const user = await userService.register(payload);

            // format user response
            const formattedUser = await userService.formatUserResponse(user);
            res.send(formattedUser);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            // create payload
            const payload = {
                email: req.body.email,
                password: req.body.password,
            };

            const user = await userService.login(payload);
            res.send(user);
        } catch (error) {
            res.status(500).send(String(error));
        }
    }

    public getToken = async (req: Request, res: Response) => {
        try {
            
        } catch (error) {
            res.status(500).send(error);
        }
    }


    public getModules = async (req: Request, res: Response) => {
        res.send('Heres modules data since you are secured!');
    }
}

export const userController = new UserController();
