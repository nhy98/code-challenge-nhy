import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
    MONGO_URI: Joi.string().uri().required(),
    PORT: Joi.number().default(3000),
})
    .unknown()
    .required();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    mongoUri: envVars.MONGO_URI,
    port: envVars.PORT,
};