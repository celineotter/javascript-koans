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

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      // tricky !!

        productsICanEat = _.filter(products, function (product) {
            return product['containsNuts'] === false &&
              _.every(product['ingredients'], function (item) {
                  return item !== 'mushrooms';
              })
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

    var sum = 233168;    /* try chaining range() and reduce() */
    
    // tricky !!
    
    var result = _.reduce(_.range(1, 1000, 1),
      function(memo, num){ if (num%3===0 || num%5===0) {return memo += num;} else {return memo}},
      0);

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

  it("should count the ingredient occurrence (functional)", function () {
    
    var ingredientCount = { "{ingredient name}": 0 };
    
    // v. tricky
    /* chain() together map(), flatten() and reduce() */

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
      var primeArr =[];

      function multiples(numb) {
          var max=Math.ceil(numb/2), i = 2;
          while (i<=max) {
              if (numb%i===0) {
                  return [i,numb/i];
              } else {
                i++;
              }
          }
          return numb;
      }

      function recursion (item) {
          var multResults = multiples(item);
          if (typeof multResults !== 'number') {
              primeArr.push(multResults[0]);
              recursion (multResults[1]);
          } else {
              if (multResults !== value) {
                  primeArr.push(multResults);
              }
          }
      }
      recursion (value);

      return primeArr.length===0 ? 'value is prime' : primeArr[primeArr.length-1];
    }

  expect(getHighestPrime(62)).toBe(31);
    });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function largestPalinDrome (a,b) {
                
      function isPalindrome(str) {
          for (var k= 0; k< str.length/2; k++) {
              if (str.slice(k,k+1) != str.slice(-1-k, str.length-k)) {
                  return false;
              }
          }
        return true;
      }

      for (var i=a;i>0;i--){
          for (var j=b;j>0;j--){
              var value = (i*j).toString();
              var result = isPalindrome (value);
              if (result === true) {return Number(value);}
          }
      }
      return "no match";
    }

        expect(largestPalinDrome(999,999)).toBe(90909);
;
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
  
    function lowestCommonMultiple (rangeEnd) {
        var globalPrimesObj = {}, accum =1;

        function getPrimeFactors (value) {
          var primesObj ={};

          function multiples(numb) {
              var max=Math.ceil(numb/2), i = 2;
              while (i<=max) {
                  if (numb%i===0) {
                      return [i,numb/i];
                  } else {
                    i++;
                  }
              }
              return numb;
          }

          function recursion (item) {
              var multResults = multiples(item);
              if (Array.isArray(multResults)) {
                  primesObj[multResults[0]] = (primesObj[multResults[0]] ||0) +1;
                  recursion (multResults[1]);
              } else {
                 primesObj[multResults] = (primesObj[multResults] || 0) +1;
              }
          }
          
          recursion (value);
          return primesObj;
        }
        for (var j=2;j<=rangeEnd;j++) {
            var primes = getPrimeFactors (j);
            for (key in primes) {
                if (!globalPrimesObj[key]) {
                  globalPrimesObj[key] = primes[key];
                } else if (globalPrimesObj[key] < primes[key]) {
                  globalPrimesObj[key] = primes[key];
                }
            }
        }
        for (key in globalPrimesObj) {
          if (typeof globalPrimesObj[key] === 'number'){
            accum*= Math.pow(key,globalPrimesObj[key]);
          }
        }
        return accum;
    }

    expect(lowestCommonMultiple(20)).toBe(232792560);
  });


  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function squaresDiff(item) {
      var result, squaresArr=[], valuesArr=[];
      debugger;
      for (var i=1;i<=item;i++) {
        valuesArr.push(i);
        squaresArr.push(i*i);
      }

      var sumSquares = _.reduce(squaresArr, function(memo,value){return memo+=value;});
      var sumValues = _.reduce(valuesArr, function(memo,value){return memo+=value;});
      return  Math.pow(sumValues,2)-sumSquares;
    }
    expect(squaresDiff (10)).toBe(2640);

  });


  it("should find the 10001st prime", function () {

    function getPrimes (noOfPrimes) {
        var primeArr = [2];
        
        function checkForPrime(n) {
            var max=Math.sqrt(n);
            var div = 2;
            while (div<=max) {
                if (n%div===0) {
                  return false;
                } else {
                  div++;
                }
            }
            return true;
        }
        
        for (var n=3; primeArr.length<noOfPrimes; n++) {
            var result = checkForPrime(n);
            if (result) {
              primeArr.push(n);
            }
        }
        return primeArr[noOfPrimes-1];
    }

    expect(getPrimes (10001)).toBe(104743);

  });

});

/*****************************************************************/
/*  
    function getHighestFactor (numb) {

      function getPrimes (maxValue) {
          var primeArr = [2];
      
          function checkIfPrime(testValue) {
              var divider = 2;
              
              while (divider<testValue) {
                  if (testValue%divider==0) {return false}
                  else {divider++}
              }
              return true
          }
      
          var testValue=3;
          while (testValue<maxValue) {
              var result = checkIfPrime(testValue);
              if (result) {primeArr.push(testValue)}
              testValue++;
          }
          return primeArr;
      } 

      if (numb > 2 & numb%1==0) {
          if (Math.sqrt(numb)%1==0) {return Math.sqrt(numb)}
          else {
              var max=Math.ceil(numb/2);

              var primes= getPrimes(max);
          
              var i=primes.length-1;
              while (i>=0) {
                  if (numb%primes[i]==0) {
                      return primes[i];
                  } else {
                      i--
                  }
              }
          }
          return "value is prime";
      }
      return "not valid input"
    }
*/