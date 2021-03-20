var bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();

const jsonParser = bodyParser.json();

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

router.post("/lobby", jsonParser, (req, res) => {
  const newCommand = req.body;
  addCommandToLobby(newCommand);
  res.sendStatus(200);
});

function addCommandToLobby(command) {
  lobbyCommands.push(command);
}

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

router.post("/game/:hostId", jsonParser, (req, res) => {
  const { hostId } = req.params;
  addCommandToGame(hostId, req.body);
  res.sendStatus(200);
});

function addCommandToGame(hostId, command) {
  const commands = hostIdToGameCommands.get(hostId) || [];
  commands.push(command);
  hostIdToGameCommands.set(hostId, commands);
}

router.get("/game/:hostId/:indexOfNextCommand", (req, res) => {
  const { hostId, indexOfNextCommand } = req.params;
  try {
    const parsedIndex = parseInt(indexOfNextCommand, 10);
    if (parsedIndex >= 0) {
      res.json(getGameCommandsAfterIndex(hostId, parsedIndex));
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    res.sendStatus(400);
  }
});

function getGameCommandsAfterIndex(hostId, indexOfNextCommand) {
  const gameCommands = hostIdToGameCommands.get(hostId) || [];
  return getCommandsAfterIndex(gameCommands, indexOfNextCommand);
}

module.exports = router;
