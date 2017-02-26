'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/dev_flashquiz'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
