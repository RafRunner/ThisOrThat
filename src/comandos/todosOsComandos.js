'use strict';

const newQuestion = require('./newQuestion');
const listQuestions = require('./listQuestions');
const deleteQuestion = require('./deleteQuestion');
const question = require('./question');
const timeOut = require('./timeOut');
const mode = require('./mode');
const serverStatus = require('./serverStatus');
const help = require('./help');

const todosOsComandos = [question, newQuestion, listQuestions, deleteQuestion, timeOut, mode, serverStatus, help];

module.exports = todosOsComandos;
