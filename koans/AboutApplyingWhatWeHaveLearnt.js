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
          // or=> // ingredientsObj[ingredient] ? 
                  //ingredientsObj[ingredient] +=1: ingredientsObj[ingredient]=1;
          return ingredientsObj;
        }, {})
        .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {

    function getHighestPrime (value) {

      function screenMultiples(numb) {
        var max = Math.ceil(numb / 2);
        for (var divisor = 2; divisor <= max; divisor++) {
            if (numb % divisor === 0) return [numb / divisor];
        }
        return numb;
      }

      function largestFactorId (item) {
          var result = screenMultiples(item);
          if (Array.isArray(result)) return largestFactorId (result[0]);
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
                
      function isPalindrome(str) {
        var halfLength = str.length/2;
        var compareStr = str.slice(0, Math.ceil(halfLength));
        compareStr = compareStr.split('').reverse().join('');
        return (str.slice(Math.floor(halfLength)) === compareStr);
      }

      for (; a>0; a--) {
        for (; b>0; b--) {
          var value = (a * b);
          if (isPalindrome (value.toString())) return Number(value);
        }
      }

      return "no match";
    }

    expect(largestPalinDrome(999,999)).toBe(90909);
  });
  /***************************/

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
  
    function lowestCommonMultiple (rangeEnd) {
      var mutualFactors = {}, accum =1;

      function getPrimeFactors (value) {
        var primesObj = {};

        function screenMultiples(numb) {
          var max = Math.ceil(numb / 2), divisor = 2;
          for (; divisor <= max; divisor++) {
            if (numb % divisor === 0) return [divisor, numb / divisor];
          }
          return numb;
        }

        function FactorsId (item) {
          var multResults = screenMultiples(item);

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

      for (var i = 2; i <= rangeEnd; i++) {
        var primes = getPrimeFactors (i);
        _.each(Object.keys(primes), function (key) {
            mutualFactors[key] = (mutualFactors[key] < primes[key] ? primes[key] : mutualFactors[key]) || primes[key];
        });
      }

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
        });
      }

      rawArray = _.range(1, focusValue+1, 1);
      squaresArr = _.map(rawArray, function (value) {
        return Math.pow(value,2);
      });

      return  Math.pow(reduceFunc (rawArray),2) - reduceFunc (squaresArr);
    }

    expect(squaresDiff (10)).toBe(2640);
  });
  /***************************/

  it("should find the 10001st prime", function () {

    function getPrimes (noOfPrimes) {
      var primeArr = [2];
      
      function checkForPrime(n) {
          for (var div = 2; div <= Math.sqrt(n); ) {
              if (n%div === 0) return false;
              else div++;
          }
          return true;
      }
      
      for (var n=3; primeArr.length < noOfPrimes; n++) {
        if (checkForPrime(n)) primeArr.push(n);
      }

      return primeArr[noOfPrimes-1];
    }

    expect(getPrimes (10001)).toBe(104743);
  });
  /***************************/

});