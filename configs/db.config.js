exports.connection =  {
    database: {
      database: process.env.DATABASE_NAME || 'test',
      username: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASSWORD || 'Passw0rd',
      host: process.env.DATABASE_SERVER || 'localhost',
      port: 27017
    },
    catalog_v3: {
      database: process.env.DATABASE_NAME || 'catalog_dev',
      username: process.env.DATABASE_USER || 'catalog_dev_usr',
      password: process.env.DATABASE_PASSWORD || 'rPj2GzV6XmZ123',
      host: process.env.DATABASE_SERVER || 'api.cataloging.ai',
      port: 27017
    },
    catalog_dev: {
      database: process.env.DATABASE_NAME || 'admin',
      username: process.env.DATABASE_USER || 'satyam',
      password: process.env.DATABASE_PASSWORD || 'Qwerty_123',
      host: process.env.DATABASE_SERVER || 'cluster-cataloging-shard-00-02-5gmlz.mongodb.net',
      port: 27017
    }

  };