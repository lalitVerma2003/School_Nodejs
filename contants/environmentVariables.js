import dotenv from 'dotenv'
dotenv.config()

const env =  {
    PORT: 3000,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
}

export default env