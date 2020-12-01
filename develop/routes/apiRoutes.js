const router = require("express").Router();
const workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
  workout.create({})
    .then(data => {res.json(data);
    })
    .catch(err => {res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  workout.find()
    .then(datas => {res.json(datas);
    })
    .catch(err => {res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true }
  )
    .then(data => {res.json(data);
    })
    .catch(err => {res.status(400).json(err);
    });
});

router.delete("/api/workouts", ({ body }, res) => {
  workout.findByIdAndDelete(body.id)
    .then(() => {res.json(true);
    })
    .catch(err => {res.status(400).json(err);
    });
});

router.get("/api/workouts/range", ({ query }, res) => {
  workout.find({ day: { $gte: query.start, $lte: query.end } })
    .then(datas => {res.json(datas);
    })
    .catch(err => {res.status(400).json(err);
    });
});

module.exports = router;
