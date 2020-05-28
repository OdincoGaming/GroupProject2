$(document).ready(function() {
  // Get references to page elements
  // var $exampleText = $("#example-text");
  // var $exampleDescription = $("#example-description");
  var submitBtn = $("#submit-btn");
  var exampleList = $("#example-list");

  var userName = $("#userName");
  var userEmail = $("#userEmail");
  var userPassword = $("#userPassword");
  var userAge = $("#userAge");
  var userGender = $("#userGender").val();
  var userHeight = $("#userHeight");
  var userWeight = $("#userWeight");
  var userGoalWeight = $("#userGoalWeight");
  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function(user) {
      console.log("hello");
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/user",
        data: JSON.stringify(user)
      });
    },
    getExamples: function() {
      return $.ajax({
        url: "api/user",
        type: "GET"
      });
    },
    deleteExample: function(id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };


  // refreshExamples gets new examples from the db and repopulates the list
  // var refreshExamples = function() {
  //   API.getExamples().then(function(data) {
  //     var $examples = data.map(function(example) {
  //       var $a = $("<a>")
  //         .text(example.text)
  //         .attr("href", "/example/" + example.id);

  //       var $li = $("<li>")
  //         .attr({
  //           class: "list-group-item",
  //           "data-id": example.id
  //         })
  //         .append($a);

  //       var $button = $("<button>")
  //         .addClass("btn btn-danger float-right delete")
  //         .text("ｘ");

  //       $li.append($button);

  //       return $li;
  //     });

  //     $exampleList.empty();
  //     $exampleList.append($examples);
  //   });
  // };

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function() {
    //console.log("Why?");
    event.preventDefault();

    var user = {
      name: userName.val().trim(),
      email: userEmail.val().trim(),
      password: userPassword.val().trim(),
      age: userAge.val().trim(),
      gender: userGender.val(),
      height: userHeight.val().trim(),
      weight: userWeight.val().trim(),
      goalWeight: userGoalWeight.val().trim()
    };
    //console.log(user);

    if (!user) {
      alert("You must enter an example text and description!");
      return;
    }

    API.saveExample(user).then(function() {
      //refreshExamples();
    });

    userName.val("");
    userEmail.val("");
    userPassword.val("");
    userGender.val("");
    userAge.val("");
    userHeight.val("");
    userWeight.val("");
    userGoalWeight.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteExample(idToDelete).then(function() {
      refreshExamples();
    });
  };

  // Add event listeners to the submit and delete buttons
  //submitBtn.on("click", handleFormSubmit());
  submitBtn.on("click", handleFormSubmit, function() {
    console.log("click worked");
    //event.preventDefault();
  });
  exampleList.on("click", ".delete", handleDeleteBtnClick);
});

function foodQuery(){
  return new Promise((resolve,reject)=>{
    var ingr = $("#food").val();
    var mealType = $("#mealType").val();
    var name =  $("#name").val();
    var options = [];
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=" + ingr,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
        "x-rapidapi-key": "c74d2ef8bemshe0ded426aa3cec0p139978jsn12569246ff74"
      }
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    }).then(function(response){
      var res = response.hints;
      for(var i = 0; i < res.length; i++){
        var foodName = res[i].food.label;
        var calories = res[i].food.nutrients.ENERC_KCAL;
        var option = {
            index: i,
            name: name,
            type: mealType,
            foodName: foodName,
            calories: calories
        }
        options.push(option);
      }
      if(options.length > 0){
        console.log(options);
        resolve(options);
      } else {
        reject("error");
      }
    });
  })
}

async function createModal(){
  var choices;
  await foodQuery().then((options)=>{
    choices= options;
    console.log(choices)
  });
}