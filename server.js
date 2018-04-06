const express = require('express');

//importing routes
const actionRoutes = require('./Routes/actionRoutes');
const projectRoutes = require('./Routes/projectRoutes');

//declaring middleware
const helmet = require('helmet'); // security to prevent client from seeing express use
const morgan = require('morgan'); // logger
const cors = require('cors'); //allows client to access this server


const server = express();

//using middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

//using routes
server.use('/api/actions', actionRoutes)
server.use('/api/projects', projectRoutes )

//initial route
server.get('/', (req, res) => {
    res.json({api: 'running...'})
})




server.listen(5000, console.log('API running on port 5000'))