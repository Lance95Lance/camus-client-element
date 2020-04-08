module.exports = {
  devServer: {
    port: 8085,
    host: '0.0.0.0',
    open: true,
    // proxy: 'http://127.0.0.1:8000',
    proxy: 'http://127.0.0.1:4396',
    // proxy: 'http://10.164.70.12:8000',
    disableHostCheck: true,
  },
};
