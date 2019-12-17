function rangef(start, end, step) {
  var array = [];

  if (step == null)
    step = 1;

  if (step > 0 ) {
    for (var i = start; i <= end; i += step)
      array.push(i);
  } else {
    for (var i = start; i >= end; i += step)
      array.push(i);
  }
  return array;
}



function sumf(array) {
  total = 0;
  for (var i =0; i < array.length; i += 1)
    total += array[i];

  return total
}
