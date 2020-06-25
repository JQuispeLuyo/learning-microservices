import { Request, Response } from "express";
import { ParentRoutes } from './ParentRoutes';
import { default as config } from '../config/config';
import axios from 'axios';
import { default as KafkaService } from '../kafka/kafka.service';
const kafkCon: any = KafkaService();
export class CoursesController extends ParentRoutes {

    constructor(router: any) {
        super(router, {
            host: config.services.courses,
            resources: true,
            routeResource: '/courses',
            routes: {
                "POST /buy": "buyCourse",
                "/ping": "ping",
                "post /forUser": "forUser"
            }
        });
    }

    buyCourse(req: Request, res: Response) {
        let body: any = req.body;
        console.log(body);
        console.log("Buy course");
        
        if (body.email) {
            let url = config.services.users + '/users/requestUser'
            console.log(url)
            console.log("Buscar User");
            axios({
                url: url,
                method: 'post',
                data: req.body
            })
                .then((response) => {

                    console.log(response.data)
                    let user: any = response.data;
                    if (user.new) {
                        console.log("envia mail");

                        kafkCon.sendMessage('email_events', {
                            cuerpo: {email: body.email, message:"Bienvenido :D"},
                            evento: 'NEW_USER',
                        });
                    }
                    console.log("Hacer compra libro");
                    return axios({
                        url: config.services.courses + '/courses-user/buy',
                        method: 'post',
                        data: {
                            idUser: user.data._id,
                            idCourse: body.idCourse
                        }
                    })

                })
                .then((response) => {
                    kafkCon.sendMessage('email_events', {
                        cuerpo: {email: body.email, message:"Gracias por su compara :D"},
                        evento: 'BUY_COURSE',
                    });
                    res.json(response.data)
                })
                .catch(err => {
                    res.json({ err: true })
                    console.log(err)
                });

        } else {
            res.json({ error: true })
        }
    }

    forUser(req: Request, res: Response) {
        let body: any = req.body;
        if (body.idUser) {
            axios({
                url: config.services.courses + '/courses-user/forUser',
                method: 'post',
                data: {
                    idUser: body.idUser,
                }
            })
                .then((response) => {
                    res.json(response.data)
                })
                .catch(err => {
                    res.json({ error: true })
                });
        }
    }

    ping(req: Request, res: Response) {
        console.log('rsafasfasdfasd')
        res.json({
            status: 'OK'
        })
    }

}