var _; //globals

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

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });
  /***************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      /* solve using filter() & all() / any() */

      var productsICanEat = [];

      productsICanEat = _.filter(products, function (product) {
        return product['containsNuts'] === false &&
          _.every(product['ingredients'], function (item) {
              return item !== 'mushrooms';
          });
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
  /***************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
  /* try chaining range() and reduce() */

    var sum = 233168;
        
    var result = _.reduce(_.range(1, 1000, 1),
      function(memo, num){
        if (num%3===0 || num%5===0) {
          return memo += num;
        } else {
          return memo;
        }
      }, 0);

    expect(result).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {

    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });
  /***************************/

  it("should count the ingredient occurrence (functional)", function () {
    /* chain() together map(), flatten() and reduce() */

    var ingredientCount = { "{ingredient name}": 0 };
    
    var results = [];

    ingredientCount =
      _.chain(products)
        .map(function(thisPizza) {return thisPizza['ingredients'];})
        .flatten()
        .reduce(function (ingredientsObj, ingredient) {
          ingredientsObj[ingredient] = (ingredientsObj[ingredient] || 0) +1;
          return ingredientsObj;
        }, {})
        .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {

    function getHighestPrime (value) {
      function largestFactorId (item) {
        var result = _.reduce( _.range (2, Math.ceil(item/2), 1), function (memo, divisor) {
          return (memo === item && (item % divisor === 0) ? item/divisor : memo);
        }, item);

        if (result !== item) return largestFactorId(result);
        else return (result !== value ? result : 'value is prime');
      }
      return largestFactorId (value);
    }

    expect(getHighestPrime(3366)).toBe(17);
    expect(getHighestPrime(90)).toBe(5);
  });
  /***************************/

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function largestPalinDrome (a, b) {
                
      function palindromeTest(str) {
        var halfLength = str.length/2;
        var compareStr = str.slice(0, Math.ceil(halfLength));
        compareStr = compareStr.split('').reverse().join('');
        return (str.slice(Math.floor(halfLength)) === compareStr);
      }

      for (; a>0; a--) {
        for (; b>0; b--) {
          var value = (a * b);
          if (palindromeTest(value.toString())) return Number(value);
        }
      }

      return "no match";
    }

    expect(largestPalinDrome(999,999)).toBe(90909);
  });
  /***************************/

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
  
    function lowestCommonMultiple (rangeEnd) {
        function getPrimeFactors (value) {
            var primesObj = {};

            function FactorsId (item) {
                var multResults = _.reduce(_.range (2, Math.ceil(item/2), 1), function (memo, divisor) {
                    return (memo === item && item % divisor === 0 ? [divisor, item/divisor] : memo);
                }, item);
                if (Array.isArray(multResults)) {
                    primesObj[multResults[0]] = (primesObj[multResults[0]] || 0) +1;
                    FactorsId (multResults[1]);
                } else {
                    primesObj[multResults] = (primesObj[multResults] || 0) +1;
                }
            }
            FactorsId (value);
            return primesObj;
        }

        mutualFactors = _.reduce(_.range(2, rangeEnd, 1), function (memo, index) {
            var primesObj = getPrimeFactors(index);
            _.each(Object.keys(primesObj), function (key) {
                memo[key] = (!memo[key] || (memo[key] < primesObj[key]) ? primesObj[key] : memo[key]);
            })
            return memo;
        }, {});

        return _.reduce (Object.keys(mutualFactors), function (memo, key) {
            return memo *= Math.pow(key,mutualFactors[key]);
        }, 1);
    }

    expect(lowestCommonMultiple(20)).toBe(232792560);
  });
  /***************************/

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function squaresDiff(focusValue) {
      var result, squaresArr=[], rawArray=[];

      function reduceFunc (selectedArr) {
        return _.reduce(selectedArr, function(memo,value) {
          return memo += value;
        }, 0);
      }

      rawArray = _.range(1, focusValue+1, 1);
      squaresArr = _.map(rawArray, function (value) {
        return Math.pow(value,2);
      });

      return  Math.pow(reduceFunc(rawArray), 2) - reduceFunc(squaresArr);
    }

    expect(squaresDiff (10)).toBe(2640);
  });
  /***************************/

  it("should find the 10001st prime", function () {

    function getPrimes (noOfPrimes) {
      var primeIndex = 1, lastResult = 2;

      for (var n=3; primeIndex < noOfPrimes; n++) { 
        var isPrime = _.every(_.range(2, Math.ceil(Math.sqrt(n)+1), 1), function (divider) {
          return (n%divider !== 0);
        });
        if (isPrime) {
          primeIndex++;
          lastResult = n;
        }
      }

      return lastResult;
    }

    expect(getPrimes (10001)).toBe(104743);
  });
  /***************************/

});