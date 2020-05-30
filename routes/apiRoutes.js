var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/userinfo", function(req, res) {
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      sex: req.body.sex,
      weight: req.body.weight,
      goalWeight: req.body.goalWeight,
      height: req.body.height
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/log", function(req,res){
    console.log(JSON.stringify(req.body));
    db.Foods.create({
      name: req.body.name,
      calories: req.body.calories,
      label: req.body.label,
      mealType: req.body.mealType
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  })

  app.get("/api/log", function(req,res){
    db.Foods.findAll({
      where: {
        name: req.body.name
      }
    }).then(function(dbExample) {
      console.log(dbExample);
      res.json(dbExample);
    });
  })

  app.delete("/api/log", function(req,res){
    db.Foods.destroy({
      where:{
        name: req.params.name,
        label: req.params.label,
        mealType: req.params.mealType
      }
    })
  })

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
