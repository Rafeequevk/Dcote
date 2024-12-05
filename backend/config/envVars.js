import dotenv from 'dotenv'
dotenv.config()

export const ENV_VARS ={
MONGO_URI : process.env.MONGO_URI,
PORT : process.env.PORT || 5050,
CORS_ORIGIN :process.env.CORS_ORIGIN || 'http://localhost:3000'
}



