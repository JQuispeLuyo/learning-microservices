const config:any  = {
    port: 3000,    
    services:{
        courses:process.env.COURSES ? `http://${process.env.COURSES}` : 'http://localhost:4002',
        users:process.env.USERS ? `http://${process.env.USERS}` : 'http://localhost:4001',
    },
    kafka:{
        brokerIp: process.env.KAFKA || '192.168.0.128:9092',
        clientId: 'api-gateway'
    }
};

export default config;
