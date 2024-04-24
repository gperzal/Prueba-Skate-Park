import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: process.env.PGDIALECT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
    }
);

export default sequelize;