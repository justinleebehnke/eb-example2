var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource test");
});

const lobbyCommands = [];

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
