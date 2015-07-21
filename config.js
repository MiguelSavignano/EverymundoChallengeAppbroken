var cfg = {
  mongo: {
    host:     process.env.MONGO_HOST  ,
    port:     process.env.MONGO_PORT  ,
    dbname:   process.env.MONGO_DBNAME,
    login:    process.env.MONGO_USER  ,
    password: process.env.MONGO_PASS
  }
};

cfg.mongo.url = ['mongodb://', cfg.mongo.host,':',cfg.mongo.port, '/', cfg.mongo.dbname].join('');

module.exports = cfg;
