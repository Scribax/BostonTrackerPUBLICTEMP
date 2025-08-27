const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for socket.io-client
config.resolver.alias = {
  ...config.resolver.alias,
  'socket.io-client': require.resolve('socket.io-client'),
  'engine.io-client': require.resolve('engine.io-client'),
};

// Ensure correct file extensions
config.resolver.sourceExts.push('cjs');

module.exports = config;
