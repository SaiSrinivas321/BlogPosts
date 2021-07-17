module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": true,
    "logging": true,
    "entities": ["src/entity/*.*"],
};