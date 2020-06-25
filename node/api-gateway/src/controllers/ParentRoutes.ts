import { Request, Response } from "express";
import axios, { Method }  from 'axios';

interface ExtendRoutes {
    host: string,
    resources?: boolean,
    routeResource?: string,
    routes?: any
}

export class ParentRoutes {

    // abstract server:any;
    
    //methods:Array<Method> = ['get', 'post', 'put', 'delete'];

    constructor(public router: any, public extendRoute?: ExtendRoutes) {
        this.registerRoutes();
    }

    registerRoutes() {
        if (this.extendRoute.resources) {
            let methods: Array<Method> = ['get', 'post', 'put', 'delete'];
            methods.forEach((method) => {
                let outerPath = this.extendRoute.routeResource;
                let ctrl = this._gateway(method, outerPath);
                this.router[method]('/', ctrl);
            });
        }

        if (this.extendRoute.routes) {
            let routes = Object.assign({}, this.extendRoute.routes);
            let _this: any = this;
            Object.keys(routes).forEach((path) => {
                let ctrl = routes[path];
                let verb = path.split(' ').length > 1 ? path.split(' ')[0] : 'get';
                let newPath = path.split(' ').length > 1 ? path.split(' ')[1] : path;
                verb = verb.toLowerCase();
                _this.router[verb](newPath, _this[ctrl].bind(_this));
            });
        }
    }


    _gateway(verb: Method, outerPath: string) {

        return (req: Request, res: Response) => {
            let urlQuery = req.originalUrl.split('?')[1];
            let query = urlQuery ? '?' + urlQuery : '';
            let url = this.extendRoute.host + outerPath + query
            console.log(url)

            axios({
                url: url,
                method: verb,
                data: req.body

            })
                .then((response)=>{
                    console.log(response.data)
                    res.json(response.data)
                })
                .catch(err => {
                    res.json({ err: true })
                    console.log(err)
                });
        }
    }


    handleError(res: Response) {
        return function (error: any) {
            return res.status(500).json(error);
        }
    }

}

