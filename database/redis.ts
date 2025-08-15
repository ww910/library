import config from "@/lib/config";
import {Redis} from "@upstash/redis";


export const redis = new Redis({
  url: config.env.upstash.redis.redisUrl,
  token: config.env.upstash.redis.redisToken,
})