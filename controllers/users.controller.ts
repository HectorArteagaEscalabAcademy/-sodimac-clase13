import { Request, Response } from 'express';
import Users from '../models/users.model';

export const getUsers = async (req: Request, res: Response) => {
    const users = await Users.findAll();
    res.json(users);
}

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const user = await Users.findByPk(id);

    if (user) {
        res.json(user);
    } else {
        return res.status(404).json({
            message: `The user with the id does not exits ${id}`
        });
    }

}

export const postUser = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existUser = await Users.findOne({
            where: {
                email: body.email
            }
        });

        if (existUser) {
            return res.status(404).json({
                message: `There is alredy a user with the email ${body.email}`
            });
        }

        const created_user = await Users.create(body);
        res.json(created_user);

    } catch (err) {
        return res.status(500).json({
            message: `An error ocurred while creating the record`
        });
    }

}

export const putUser = async (req: Request, res: Response) => {
   
    const { id } = req.params;
    const { body } = req;

    try {

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: `There user with the id not exists ${id}`
            });
        }

        const update_user = await user.update(body);
        res.json(update_user);
        
    } catch (err) {
        return res.status(500).json({
            message: `An error ocurred while creating the record`
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    
    const { id } = req.params;

    try {

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: `There user with the id not exists ${id}`
            });
        }

        //const updated_user = await user.update({state: false});
        //res.json(updated_user);
        const delete_user = await user.destroy();
        res.json(delete_user);
        
    } catch (err) {
        return res.status(500).json({
            message: `An error ocurred while creating the record`
        });
    }

}


