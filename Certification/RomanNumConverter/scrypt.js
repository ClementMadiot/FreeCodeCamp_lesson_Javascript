const number = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const romainNumber = [{
  M: 1000,
  CM: 900,
  D:500,
  CD: 400,
  C:100,
  XC: 90,
  L:50,
  XL: 40,
  X:10,
  IX: 9,
  V:5,
  IV: 4,
  I:1
}]

const showMsg = (msg) => {
  output.classList.remove('hidden')
  output.classList.add('alert')
  output.textContent = msg
}

const numeralConvert = (input) =>{
if(input === ''){
  showMsg('Please enter a valid number')
} else if(input <= 0){
  showMsg('Please enter a number greater than or equal to 1')
} else if(input >= 4000){
  showMsg('Please enter a number less than or equal to 3999')
}

// output.textContent = input

}
convertBtn.addEventListener('click', (e) => {
e.preventDefault()
numeralConvert(number.value)
// output.classList.remove("hidden")
});


