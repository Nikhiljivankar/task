let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/User', //  , 127.0.0.1:27017/image
}
appConfig.apiVersion = '/api/v1';

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    envviroment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}//end module export