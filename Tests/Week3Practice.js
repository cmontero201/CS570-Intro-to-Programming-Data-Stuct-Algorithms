
//1. Construct an array of all of the numbers from 1 through 50.
function makeArr(start, end, step) {
    var arr = [];
    for (var i = start; i <= end; i+= step) {
        arr.push(i);
    }
    return arr
}

//2. Take the array constructed above and remove all even values.
function removeEven(arr) {
    oddArr = [];
    for (i = 0; i < arr.length - 1; i++) {
        if ((arr[i] % 2) == 0) {
            continue
        }
        else {
            oddArr.push(arr[i])
        }
    }
    return oddArr
}

/*
3. Recursively split the array into two arrays, calling the recursive function on each of 
the two arrays for further splitting. Output the arrays whose sum is > 10 to the screen as 
you go.
*/
function splitArr(arr) {
    if (arr.length > 1) {
        for (i = 0; i <= arr.length - 1; i++) {
            if ((i % 2) ==0) {
                newArr1.push(arr[i]);
            }
            else {
                newArr2.push(arr[i]);
            }
        }

        var sum1 = newArr1.map( (value) => {
            return sum1 += value;
        })
        var sum2 = newArr2.map( (value) => {
            return sum2 += value;
        })

        if (sum1[sum1.length - 1] >= 10) {
            console.log(sum1[sum1.length - 1]);
        }
        else if (sum2[sum2.length - 1] >= 10) {
            console.log(sum2[sum2.length - 1])
        }
    }

    splitArr(newArr1);
    splitArr(newArr2);
}

/*
4. Prompt the user for a quantity of numbers they would like to input. Then input that many 
numbers, storing each one in an array. Then, ask the user for a number to which to compare 
their list. Output all numbers in the array greater than their target and then all numbers 
less than their target.
*/



/*
5. Without using any explicitly written loops, write a function that when given an array as 
its sole parameter will return all numbers in the array that are a multiple of the value's 
index. HINT: The arguments to the predicates taken by filter/map/reduce/etc have some optional 
arguments. Look at the documentation for those functions.
*/



/*
6. Create your own version of the map function. Call it map2, but have it perform the same 
actions as the built in map function if you call it with two arguments: an array and a function.
*/