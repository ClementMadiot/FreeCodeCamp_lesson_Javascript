const mean = document.querySelector("#mean");

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  console.log(value)
  const array = value.split(/,\s*/g)
  // The value of an input element is always a string, even if the input type is number. 
  const numbers = array.map(el => Number(el)).filter((el => !isNaN(el)));
  // display the value of mean
  mean.textContent = getMean(numbers);
}


const getMean = (array) => {
  // take the sum of all numbers in the list.
  const sum = array.reduce((acc, el) => acc + el, 0);
  // divide the sum of numbers by the count of numbers in the list.
  const mean = sum / array.length
  return mean
}
// clean this logic up a bit. Using the implicit return 
// const getMean = (array) => array.reduce((acc, el) => acc + el, 0)/ array.length ;