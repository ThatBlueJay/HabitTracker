//This entire file is just the index for the API, setting up the port and wrapping the functions with the request types.
//To find actual information on the functions, check their corresponding files.


const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

const habit_model = require("./habit_model.js");
const user_model = require("./user_model.js");
const analyzer_model = require("./analysis_model.js");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
//Habit Model

app.get("/habits/:id", (req, res) => {
  habit_model
    .getHabit(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/habits", (req, res) => {
  habit_model
    .getCurrentHabits(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/habits", (req, res) => {
  habit_model
    .createHabit(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/habits/:id", (req, res) => {
  habit_model
    .deleteHabit(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/habits/:id", (req, res) => {
  habit_model
    .confirmHabit(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/habits/", (req, res) => {
  habit_model
    .generateRecords()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//User Model

app.get("/users/:id", (req, res) => {
  user_model
    .getUser(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/users", (req, res) => {
  user_model
    .createUser(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/users/:id", (req, res) => {
  user_model
    .deleteUser(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/auth", (req, res) => {
  user_model
    .authorize(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//Analysis Model

app.get("/analysis", (req, res) => {
  analyzer_model
    .getData(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
