'use strict';

const newQuestion = require('./newQuestion');
const listQuestions = require('./listQuestions');
const deleteQuestion = require('./deleteQuestion');

const todosOsComandos = [newQuestion, listQuestions, deleteQuestion];

module.exports = todosOsComandos;
