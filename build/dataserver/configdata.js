var configdata = (function () {
    function configdata() {
    }
    configdata.DatabaseConnectUrl = "mongodb://@localhost:27017/infodb";
    configdata.ServerHost = "localhost";
    configdata.ServerPort = 52999;
    return configdata;
})();
exports.configdata = configdata; // class configdata
