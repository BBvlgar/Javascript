const homeHanlder = require('./home')
const staticFiles = require('./static-files')
const catHandler = require('./cat')

module.exports = [homeHanlder, staticFiles, catHandler];
