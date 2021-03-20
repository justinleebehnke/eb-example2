var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("This is the backend for sheephead");
});

const lobbyCommands = [];
const hostIdToGameCommands = new Map();

router.delete("/", (req, res) => {
  hostIdToGameCommands.clear();
  while (lobbyCommands.length > 0) {
    lobbyCommands.pop();
  }
  res.send(200);
});

router.get("/lobby/:indexOfNextCommand", function (req, res) {
  const { indexOfNextCommand } = req.params;
  try {
    const parsedIndex = parseInt(indexOfNextCommand, 10);
    if (parsedIndex >= 0) {
      res.json(getCommandsAfterIndex(lobbyCommands, parsedIndex));
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    res.sendStatus(400);
  }
});

function getCommandsAfterIndex(commands, indexOfNextCommand) {
  return {
    indexOfNextCommand: commands.length,
    newCommands: commands.slice(indexOfNextCommand),
  };
}

module.exports = router;
