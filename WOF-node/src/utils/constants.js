if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required but was not set.');
}

exports.JWT_SECRET = process.env.JWT_SECRET;
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/roadworthy-node';
