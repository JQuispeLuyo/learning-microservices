const config:any  = {         
    email:{
        'service':'Gmail',
        'userEmail':'example@domain.com',
        'userPass':'123456',
        host:'localhost',
    },
    ports : 4003,
    kafka:{
        brokerIp: process.env.KAFKA || '192.168.0.128:9092',
        clientId: 'email-service'
    }
};

export default config;
