//* Function infix
const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

//* Function evaluate infix
const infixEval = (str, regex) =>
  str.replace(regex, (_match, arg1, operator, arg2) =>
    infixToFunction[operator](parseFloat(arg1), parseFloat(arg2))
  );

//* Function to account for order of operations
const highPrecedence = (str) => {
  const regex = /([1-9][0-9]?)([*\/])([1-9][0-9]?)/;
  // return regex.test(str); check the regex before continue
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2);
};
// console.log(highPrecedence("5*3")) // true

// Explication :
// The regex parameter will match two numbers with an operator between them.
//The first number will be assigned to arg1 in the callback
//The second to arg2, and the operator to operator.
// Your callback function implicitly return the operator property of your infixToFunction object.

//* Function built-in for calculation.
const isEven = (num) => num % 2 === 0;
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);
/// return the average of all the numbers in the array.
const average = (nums) => sum(nums) / nums.length;
const median = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length) ? average([middle]) : sorted([middle + 1]);
};

// Explication :
// - sum function takes a nums parameter, which will be an array of numbers. Return the result of calling reduce on the array to sum all of the numbers.
// - isEven function,takes a num parameter and returns true if the number is even, and false otherwise.
// - average function takes an array of numbers as the nums parameter. Return the average of all the numbers in the array.
// -  median arrow function that takes a nums parameter. This function will calculate the median value of an array of numbers.

//* Object properties
const spreadsheetFunctions = {
  sum,
  average,
  median,
};

const applyFunction = (str) => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = (args) => args.split(",").map(parseFloat);
  const apply = (fn, args) =>
    spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, () => {});
};

//* Function to generate a range of numbers
// Your array will need to be the size of the range. Calculate this by finding the difference between end and start, and adding 1 to the result.
const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);

//* Function to generate a range of letters
const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
    String.fromCharCode(code)
  );

//* Parse and evaluate the input string.
const evalFormula = (x, cells) => {
  const idToText = (id) => cells.find((cell) => cell.id === id).value;
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));

  const elemValue = (num) => (character) => idToText(character + num);
  const addCharacters = (character1) => (character2) => (num) =>
    charRange(character1, character2).map(elemValue(num));
  const rangeExpanded = x.replace(
    rangeRegex,
    (_match, char1, num1, char2, num2) =>
      rangeFromString(num1, num2).map(addCharacters(char1)(char2))
  );
  const cellRegex = /[A-J][1-9][0-9]?/gi;
  const cellExpanded = rangeExpanded.replace(cellRegex, (match) =>
    idToText(match.toUpperCase())
  );

  const functionExpanded = applyFunction(cellExpanded);
  return functionExpanded === x
    ? functionExpanded
    : evalFormula(functionExpanded, cells);
};

window.onload = () => {
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  };
  const letters = charRange("A", "J");
  letters.forEach(createLabel);
  range(1, 99).forEach((number) => {
    createLabel(number);
    letters.forEach((letter) => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      input.onchange = update;
      container.appendChild(input);
    });
  });
  // console.log(letters);
};

/// update event is running as a change event listener, the event parameter will be a change event.
const update = (event) => {
  const element = event.target;
  const value = element.value.replace(/\s/g, "");
  if (!value.includes(element.id) && value.startsWith("=")) {
    element.value = evalFormula(
      value.slice(1),
      Array.from(document.getElementById("container").children)
    );
  }
};
