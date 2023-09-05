import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response, NextFunction } from 'express';
import http, { Server } from 'http';
import mongoose from 'mongoose';
import path from 'path';
/**
 * Routes v1
 */
import routerv1 from './network/routes/v1';

/**
 * CORS
 */
const application: Application = express();

/**
 * Bootstrap function
 * @param server Server
 * @param mongoDBUrl url de mongoDB
 * @param port port to connect
 * @param https secure https
 */
const bootstrap = async (
    server: Server,
    mongoDBUrl: string,
    port: string,
    https = false
): Promise<void> => {
    try {
        await mongoose.connect(mongoDBUrl);
        server.listen(port);
        console.log(`App listening on http${https ? 's' : ''}://localhost:${port}`);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Set the options to aplication to use
 * @param application Aplication to use
 */
const setOptions = (application: Application): void => {
    application.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    application.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    application.use(express.json());
    application.use(express.urlencoded({ extended: false }));
    application.use('/', express.static('./public'));
    /**
     * Solucion rapida TODO: Cambiar a un dominio especifico
     */
    application.use(
        cors({
            origin: '*',
        })
    );

    application.use('/api/v1', routerv1);
};

dotenv.config({
    path: path.join(path.resolve('./env'), process.env.NODE_ENV + '.env'),
});

const mongoDBUrl = `${process.env.MONGODB_URL}`;
const port: string = `${process.env.PORT}` || '4000';

/**
 * Verifica el ambiente
 * Si es produccion cargamos as credenciales para levantar el servicio con HTTPS
 */
if (process.env.NODE_ENV === 'production') {
    setOptions(application);
    /**
     * Set the credentials
     */
    // const credentials = {
    //     cert: fs.readFileSync(path.resolve('./public.crt')),
    //     key: fs.readFileSync(path.resolve('./private.key')),
    // };

    // const httpsServer: Server = https.createServer(credentials, application);

    const httpServer: Server = http.createServer(application);


    bootstrap(httpServer, mongoDBUrl, port, true);
} else {
    setOptions(application);

    const httpServer: Server = http.createServer(application);


    bootstrap(httpServer, mongoDBUrl, port);
}
