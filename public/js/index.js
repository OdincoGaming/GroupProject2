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

//This function empties the table when a new search is made.
var emptyTable = function() {
  $("#choicesGoHere").empty();
};

async function createModal(){
  var choices;
  
  await foodQuery().then((options)=>{
    choices= options;
    console.log(choices)
  });

  
  emptyTable();

  //here we make a card
  var card = $("<div>");
  card.addClass("card");
  $("#choicesGoHere").append(card);

  // //here we make a card header
  var cardHeader = $("<div>");
  cardHeader.addClass("card-header");
  cardHeader.html("<strong>Food Diary</strong>");
  $(card).append(cardHeader);

  // //here we will make a card body
  var cardBody = $("<div class='card-body'>");
  $(card).append(cardBody);

  //here we make the table
  var table = $("<table>");
  table.addClass("table table-bordered table-hover");
  $(cardBody).append(table);

  //here we make the table head
  var tableHead = $("<thead class='thead-dark'><th>Food Name</th><th>Calories</th></thead>");
  $(table).append(tableHead);


  for (var i = 0; i < choices.length; i++) {
    //var cardTitle = $("<div class='card-title col-md-4'>");
    $(".table").append('<tbody><tr data-type="' + choices[i].type + '" data-name="' + choices[i].name + '" data-calories="' + choices[i].calories + '" data-label="' + choices[i].foodName + '" id="optionRow"><td id="label">' + choices[i].foodName + '</td><td id="calories">' + choices[i].calories.toFixed() + "</td></tr></tbody>");
    //$(cardBody).append(cardTitle);
  }
  $("#optionRow").on("click", foodSubmit);
}


var API = {
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-type": "application/json"
      },
      type: "POST",
      url: "api/userinfo",
      data: JSON.stringify(user)
    });
  },
  getUser: function() {
    return $.ajax({
      url: "api/userinfo",
      type: "GET"
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "api/userinfo/" + id,
      type: "DELETE"
    });
  },
  saveFood: function(choice){
    return $.ajax({
      headers: {
        "Content-type": "application/json"
      },
      url: "api/log",
      type: "POST",
      data: JSON.stringify(choice)
    });
  },
  readFood: function(choice){
    return $.ajax({
      url: "api/log",
      type: "GET",
    });
  },
  deleteFood: function(choice){
    return $.ajax({
      url: "api/log",
      type: "DELETE"
    });
  }
}

var foodSubmit = function(event){
  event.preventDefault();
  var choice = {
    name: $(this).attr("data-name"),
    calories: $(this).attr("data-calories"),
    label: $(this).attr("data-label"),
    mealType: $(this).attr("data-type")
  }

  API.saveFood(choice)
}

var foodDelete = function(event){
  event.preventDefault();
  var choice = {
    name: $(this).attr("data-name"),
    label: $(this).attr("data-label"),
    mealType: $(this).attr("data-mealType")
  }

  API.deleteFood(choice)
}


var userFormSubmit = function(event) {
  event.preventDefault();

  var userForm = {
    name: $("#userName").val().trim(),
    email: $("#userEmail").val().trim(),
    password: $("#userPassword").val().trim(),
    age: $("#userAge").val().trim(),
    sex: $("#userGender").val().trim(),
    height: $("#userHeight").val().trim(),
    weight: $("#userWeight").val().trim(),
    goalWeight: $("#userGoalWeight").val().trim()
  }

  API.saveUser(userForm);
  console.log(userForm);

  $("#userName").val("");
  $("#userEmail").val("");
  $("#userPassword").val("");
  $("#userAge").val("");
  $("#userGender").val("");
  $("#userHeight").val("");
  $("#userWeight").val("");
  $("#userGoalWeight").val("");
};

$("#userInfoSubmitBtn").on("click", userFormSubmit);