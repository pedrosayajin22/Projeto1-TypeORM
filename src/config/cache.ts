import { RedisOptions } from "ioredis";

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

const cacheConfig: ICacheConfig = {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port:process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
  driver: "redis"
};

export default cacheConfig;
