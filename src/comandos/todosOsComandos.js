'use strict';

const newQuestion = require('./newQuestion');
const listQuestions = require('./listQuestions');
const deleteQuestion = require('./deleteQuestion');
const question = require('./question');

const todosOsComandos = [question, newQuestion, listQuestions, deleteQuestion];

module.exports = todosOsComandos;
