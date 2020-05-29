var db = require("../../models");

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
    $(".table").append('<tbody><tr id="optionRow"><td id="name">' + choices[i].foodName + '</td><td id="calories">' + choices[i].calories.toFixed() + "</td></tr></tbody>");
    //$(cardBody).append(cardTitle);
  }

  $("#optionRow").on("click", function(){
    db.User.create({
      name: choices[0].name,
      type: mealType,
      foodName: $(this).find("#name"),
      calories: $(this).find("#calories")
    })
  })

}