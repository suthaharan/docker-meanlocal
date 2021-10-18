const db = require("../models");
const Lesson = db.lessons;

// Create and Save a new Lesson
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Lesson
  const lesson = new Lesson({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Lesson in the database
  lesson
    .save(lesson)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lesson."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Lesson.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lessons."
      });
    });
};

// Find a single Lesson with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Lesson.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Lesson with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Lesson with id=" + id });
    });
};

// Update a Lesson by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Lesson.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Lesson with id=${id}. Maybe Lesson was not found!`
        });
      } else res.send({ message: "Lesson was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Lesson with id=" + id
      });
    });
};

// Delete a Lesson with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Lesson.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`
        });
      } else {
        res.send({
          message: "Lesson was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Lesson with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Lesson.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all lessons."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Lesson.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lessons."
      });
    });
};
