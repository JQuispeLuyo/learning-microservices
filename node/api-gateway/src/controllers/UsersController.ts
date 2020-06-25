import { Request, Response } from "express";
import { ParentRoutes } from './ParentRoutes';
import { default as config } from '../config/config';
import axios from 'axios';

export class UsersController extends ParentRoutes {

    constructor(router: any) {
        super(router, {
            host: config.services.users,
            resources: true,
            routeResource: '/users',
            routes: {
                "get /:email": "forUser"
            }
        });
    }

    forUser(req: Request, res: Response) {
        let body = req.params;
        console.log('asdasdasd');
        console.log(body);

        if (body.email) {
            axios({
                url: config.services.users + `/users/${body.email}`,
                method: 'get'
            })
                .then((response) => {

                    let user = JSON.parse(response.data)
                    console.log('user');
                    console.log(user);
                    if (user) {

                        axios({
                            url: config.services.courses + '/courses-user/forUser',
                            method: 'post',
                            data: {
                                idUser: user._id,
                            }
                        })
                            .then((response) => {
                                console.log("bodyComplete")
                                console.log(response.data)
                                let result = {
                                    user: user,
                                    courses: response.data
                                }
                                res.json(result)
                            })
                            .catch(err => {
                                res.json({ error: true })
                            })
                        // res.json(bodyComplete)
                    } else {
                        res.json({
                            error: true,
                            msg: 'User not found'
                        })
                    }

                })
                .catch(err => {
                    res.json({ err: true })
                })
        } else {
            res.json({ error: true })
        }
    }

}