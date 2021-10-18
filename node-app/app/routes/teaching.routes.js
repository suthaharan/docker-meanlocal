module.exports = app => {
  const lessons = require("../controllers/lesson.controller.js");

  var router = require("express").Router();

  // Create a new Lesson
  router.post("/", lessons.create);

  // Retrieve all Tutorials
  router.get("/", lessons.findAll);

  // Retrieve all published Tutorials
  router.get("/published", lessons.findAllPublished);

  // Retrieve a single Lesson with id
  router.get("/:id", lessons.findOne);

  // Update a Lesson with id
  router.put("/:id", lessons.update);

  // Delete a Lesson with id
  router.delete("/:id", lessons.delete);

  // Create a new Lesson
  router.delete("/", lessons.deleteAll);

  app.use("/api/lessons", router);
};
