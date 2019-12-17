/*
Created by Christian Montero September 14, 2018
Lab 3: Advanced BuzzFizz
This script creates a  function called FizzBuzzer that takes a sequential
container of integer numbers as an arugment and creates an an array of same 
length displaying Buzz if the number is divisible by 3, Fizz if the number is
divisble by 5, and BuzzFizz if the number is divisible by both.
*/

// Creates an array range 10 to 250 at step 1 and calls function FizzBuzzer
// with created array as argument
var start = 10;
var end = 250;
numbers = [];

for (i = start; i < end + 1; i++) {
  numbers.push(i)
}

outputArray = FizzBuzzer(numbers)

// Function takes in an array and outputs an array
function FizzBuzzer(array) {
  var output = [];
  for (i = 0; i <= array.length - 1; i++) {
    var current = array[i];
    if (current % 5 == 0 && current % 3 == 0)
      output.push('BuzzFizz');
    else if (current % 3 == 0)
      output.push('Buzz');
    else if (current % 5 ==0)
      output.push('Fizz');
    else {
      output.push(array[i]);
    }
  }
  return output;
}
