declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URL: string;
    ACCESS_TOKEN: string;
    REFRESH_TOKEN: string;
  }
}
