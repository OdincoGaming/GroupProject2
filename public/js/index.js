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
  // var card = $("<div class='card'>");
  // $("#choicesGoHere").append(card);

  // //here we make a card header
  // var cardHeader = $("<div>");
  // cardHeader.addClass("card-header")
  // cardHeader.html("<h1>Food Diary</h1><br><p class='lead'>Choose a food to add to your diary</p><hr>");
  // $(card).append(cardHeader);

  // //here we will make a card body
  // var cardBody = $("<div class='card-body'>");
  // $(cardHeader).append(cardBody);

  for (var i = 0; i < choices.length; i++) {
    //var cardTitle = $("<div class='card-title col-md-4'>");
    $(".table").append("<tbody><tr><td>" + choices[i].foodName + "</td><td>" + choices[i].calories.toFixed() + "</td></tr></tbody>");
    //$(cardBody).append(cardTitle);
  }
}