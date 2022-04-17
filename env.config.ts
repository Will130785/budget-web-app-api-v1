// File needed to convert envs to empty string
export default {
  DB_CONNECT: process.env.DB_CONNECT ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? ''
}
