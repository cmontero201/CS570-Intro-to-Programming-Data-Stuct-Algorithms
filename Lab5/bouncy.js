/*
Created by Christian Montero
October 5, 2018
Lab 6: Bouncy Bubble Sort
*/

var data = [7634,2,34,6,78,23,9013,7654,32,54657687,213425];


console.log(data)
console.log(data.length)
disp = Bounce(data)
console.log(disp)


function Bounce(arr) {
    rPass = 0;
    lPass = 0;
    var swapNum = 0;
    var len = arr.length - 1;

    for (var pass = 0; pass < len; pass++) {
        if ((pass % 2) == 0) {
            for (var i = 0; i < len - rPass; i++) {
                if (arr[i] > arr[i + 1]) {
                    var holder = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = holder;
                    swapNum++;
                }
            }
            rPass++
        }

        else {
            for (var j = len - rPass; j > lPass; j--) {
                if (arr[j] < arr[j - 1]) {
                    holder = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = holder
                    swapNum++
                }
            }
            lPass++
        }
        // console.log(pass, swapNum, rPass,lPass)
    } 
    return arr
}