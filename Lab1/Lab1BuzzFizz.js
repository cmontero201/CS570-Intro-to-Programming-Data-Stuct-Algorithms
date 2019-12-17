/*
Created by Christian Montero August 31, 2018
Lab 1: BuzzFizz
This script utilizes a while loop and prints numbers from 74 to 291
(inclusive). Numbers divisbile by 3 output 'Buzz', numbers divisible by
5 output 'Fizz,' number divisible by 3 and 5 output 'BuzzFizz'
*/

num = 73;
while (num < 291) {
  num += 1
  var output = '';
  if (num % 5 == 0 && num % 3 == 0)
    output += 'BuzzFizz';
  else if (num % 3 == 0)
    output += 'Buzz';
  else if (num % 5 == 0)
    output += 'Fizz';
  console.log(output || num);
}
