function getRandomComputerResult() {
  const options = ['Rock', 'Paper', 'Scissors']

  
  for (let i = 0; i < options.length; i++) {
    let randomNumber = Math.floor(Math.random() * options.length)
    console.log(randomNumber)
    if (randomNumber === 0) {
      return options[0]
    } else if (randomNumber === 1) {
      return options[1]
    } else {
      return options[2]
    }
  }
}
console.log(getRandomComputerResult())
