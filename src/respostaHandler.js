const prefix = "#";

function respostaHandler(msg) {
  if (!msg.content || msg.content[0] !== prefix) {
    return;
  }
}

module.exports = respostaHandler;
