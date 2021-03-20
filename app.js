var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

/* START MY APPLICATION 
var router = express.Router();
const jsonParser = bodyParser.json();

const hostIdToGameCommands = new Map();
const lobbyCommands = [];

router.delete("/", (req, res) => {
  hostIdToGameCommands.clear();
  while (lobbyCommands.length > 0) {
    lobbyCommands.pop();
  }
  res.send(200);
});

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

function getGameCommandsAfterIndex(hostId, indexOfNextCommand) {
  const gameCommands = hostIdToGameCommands.get(hostId) || [];
  return getCommandsAfterIndex(gameCommands, indexOfNextCommand);
}

function getCommandsAfterIndex(commands, indexOfNextCommand) {
  return {
    indexOfNextCommand: commands.length,
    newCommands: commands.slice(indexOfNextCommand),
  };
}

router.get("/game/:hostId/:indexOfNextCommand", (req, res) => {
  const { hostId, indexOfNextCommand } = req.params;
  try {
    const parsedIndex = parseInt(indexOfNextCommand, 10);
    if (parsedIndex >= 0) {
      res.json(getGameCommandsAfterIndex(hostId, parsedIndex));
    } ellobbyse {
      res.sendStatus(400);
    }
  } catch (err) {
    res.sendStatus(400);
  }
});

router.post("/lobby", jsonParser, (req, res) => {
  const newCommand = req.body;
  addCommandToLobby(newCommand);
  res.sendStatus(200);
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

function addCommandToLobby(command) {
  lobbyCommands.push(command);
}

END MY APPLICATION */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
