const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    presets: [
        ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        // ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
    ]
};