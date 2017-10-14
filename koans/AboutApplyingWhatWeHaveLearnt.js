var _; // globals   ??

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = []; // declares a handful of variables

    for (i = 0; i < products.length; i+=1) { // iterates over products
        if (products[i].containsNuts === false) { // checks if it contains nuts
            hasMushrooms = false; // assumes it does not have mushrooms
            for (j = 0; j < products[i].ingredients.length; j+=1) { //iterates over ingredients
               if (products[i].ingredients[j] === "mushrooms") { // checks if each ingredient is mushrooms
                  hasMushrooms = true; // sets mushrooms to true if it does
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]); // if mushrooms is false (& nuts is false), add to producsICanEat
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      
      /* solve using filter() & all() / any() */
      // push all products that pass nuts filter and any mushrooms check

      var productsICanEat = [];
      var hasMushrooms = function(x) {return x === "mushrooms"};

      products.filter(function(x) {
        if (x.containsNuts === false) {
          if (_(x.ingredients).any(hasMushrooms) === false) {
            productsICanEat.push(x);
          }
        }
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _(_.range(0, 1000, 1)).chain()   /* try chaining range() and reduce() */
                .reduce(function(sum, x) { if(x % 3 ===0 || x % 5 === 0) {return sum += x }return sum}) // [6]
                .value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) { // iterate over products array
        for (j = 0; j < products[i].ingredients.length; j+=1) { // iterate over ingredients in each product
          // populates the ingredientCount object with each ingredient
          // for each ingredient in products, if ingredient = ingedient or 0 it adds 1 to the count value
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    /* chain() together map(), flatten() and reduce() */
    var ingredientCount = { "{ingredient name}": 0 }
    var test = _(products).chain()
                .map(function(products) {return products.ingredients})
                .flatten() 
                .reduce(function(count, ingredient) {if (ingredientCount[ingredient] === undefined) {
                  return ingredientCount[ingredient] = 1;
                  } else {
                  return ingredientCount[ingredient]++;
                  }}, 0)
                .value();
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
  it("should find the largest prime factor of a composite number", function () {
  
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  */
});
