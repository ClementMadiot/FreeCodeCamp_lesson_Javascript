// In this project, I help CamperBot to build a **random background color changer** and help him to find and fix errors.

const body = document.querySelector('body')
const bgHexCodeSpanElement = document.querySelector('#bg-hex-code')
const btn = document.querySelector("#btn");

const darkColorsArr = [
  '#2C3E50',
  '#34495E',
  '#2C2C2C',
  '#616A6B',
  '#4A235A',
  '#2F4F4F',
  '#0E4B5A',
  '#36454F',
  '#2C3E50',
  '#800020',
]
function getRandomIndex() {
  return  Math.floor(darkColorsArr.length * Math.random())
  // console.log(Math.floor(darkColorsArr.length * Math.random()))
}
getRandomIndex() 

function changeBackgroundColor() {
  const color = darkColorsArr[getRandomIndex()]
  
  bgHexCodeSpanElement.innerText = color
  body.style.backgroundColor = color
}
changeBackgroundColor()

btn.onclick = changeBackgroundColor;
