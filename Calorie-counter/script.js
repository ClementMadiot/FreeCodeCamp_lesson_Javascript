const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');

let isError = false

function cleanInputString(str) {
  
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
  console.log("original string: ", str)
}
console.log(cleanInputString("+-99"))

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex)
}
// console.log(isInvalidInput("1e0"))

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`)
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length
  let HTMLString = ``;

}