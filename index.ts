import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose'; 
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import postRoutes from './routes/post';

import cors from 'cors';


const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//fileUpload
server.app.use(fileUpload());

//configurar cors
server.app.use(cors({origin: true,credentials: true}));

//Rutas de mi app
server.app.use('/user', userRoutes  );
server.app.use('/posts', postRoutes  );

//conectar DB
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/mercadouni', 
                {useNewUrlParser:true, useCreateIndex:true},(err)=>{
                    if(err)throw err;

                    console.log('Base de datos ONLINE')
                });

//levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});