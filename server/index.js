// this will make possible imports like -> import logger from 'logger'
require('app-module-path').addPath(__dirname);
require('./server');
