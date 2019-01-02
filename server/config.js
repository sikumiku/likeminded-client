var development = {
    apiUrl : 'http://localhost:8080',
    env : global.process.env.NODE_ENV || 'development'
};

var production = {
    apiUrl : 'https://likeminded-server.herokuapp.com',
    env : global.process.env.NODE_ENV || 'production'
};

exports.Config = global.process.env.NODE_ENV === 'production' ? production : development;