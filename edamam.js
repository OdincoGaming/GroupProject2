var unirest = require("unirest");

function foodQuery(ingr){
    var options = [];
    var req = unirest("GET", "https://edamam-food-and-grocery-database.p.rapidapi.com/parser");
    req.query({
        "ingr": ingr
    });
    
    req.headers({
        "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
        "x-rapidapi-key": "c74d2ef8bemshe0ded426aa3cec0p139978jsn12569246ff74",
        "useQueryString": true
    });
    
    
    req.end(function (res) {
    	if (res.error) throw new Error(res.error);
        for(var i = 0; i < 10; i++){
            var name = res.body.hints[i].food.label;
            var calories = res.body.hints[i].food.nutrients.ENERC_KCAL;
            var option = {
                index: i,
                name: name,
                calories: calories
            }
            options.push(option);
        }
    });
    return(options);
}

module.exports = foodQuery;