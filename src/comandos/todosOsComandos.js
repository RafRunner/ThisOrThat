'use strict';

const newQuestion = require('./newQuestion');
const listQuestions = require('./listQuestions');
const deleteQuestion = require('./deleteQuestion');
const question = require('./question');
const help = require('./help');

const todosOsComandos = [question, newQuestion, listQuestions, deleteQuestion, help];

module.exports = todosOsComandos;
