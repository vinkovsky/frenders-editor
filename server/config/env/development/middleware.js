module.exports = {
  //...
  settings: {
    parser: {
      enabled: true,
      multipart: true,
      jsonLimit: 1200 * 1024 * 1024,
      formLimit: 1200 * 1024 * 1024,
      textLimit: 1200 * 1024 * 1024,
      formidable: {
        maxFileSize: 1200 * 1024 * 1024 // Defaults to 200mb
      }
    }
  },
  //...
};