const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/car_buying';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
//   'CREATE TABLE features(id SERIAL PRIMARY KEY, model VARCHAR(40) not null, color VARCHAR(40) not null, price VARCHAR(25))');
// query.on('end', () => { client.end(); });
//   'CREATE TABLE package(id SERIAL PRIMARY KEY, features_id VARCHAR(40))');
// query.on('end', () => { client.end(); });

'CREATE TABLE summary(package_id varchar(40), user1 varchar(25))');
query.on('end', () => { client.end(); });