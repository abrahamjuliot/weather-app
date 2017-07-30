'use strict';
const
weather = require('./weather'),

// join arguments and replaces each ' ' with '_'
query = process.argv.slice(2).join('_').replace(' ', '_');

weather.get(query);