const Redis = require('ioredis')
const redisClient = new Redis()

const { RedisSessionStore } = require('./sessionStore')
const createRedisSessionStore = () => new RedisSessionStore(redisClient)

const { RedisMessageStore } = require('./messageStore')
const createRedisMessageStore = () => new RedisMessageStore(redisClient)

module.exports = {
  redisClient,
  createRedisSessionStore,
  createRedisMessageStore,
}
