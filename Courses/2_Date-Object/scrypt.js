// In this project, I learn how to work with the **JavaScript Date object**, including its methods and properties. I also learn how to correctly format dates.

// This project cover concepts such as the **getDate()**, **getMonth()**, and **getFullYear()** methods.

const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");
// date: the new operator to create a new Date object that returns a string with the current date and time
// day: The .getDate() returns a number between 1 and 31 that represents the day of the month for that date.
// month: The .getMonth() method returns a number between 0 and 11. This represents the month for the date provided, where 0 is January and 11 is December. Because the number this method returns is zero-based, you need to add 1 to it to get the expected month number.
// year: The getFullYear returns a number which represents the year for the provided date.
// hours: The .getHours() method returns a number between 0 and 23. This represents the hour for the provided date, where 0 is midnight and 23 is 11 p.m.
// minutes: The .getMinutes() method returns a number between 0 and 59 which represents the minutes for the provided date.
const date = new Date();
const day = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()
const hours = date.getHours()
const minutes = date.getMinutes()

// console.log(day,month, year, hours, minutes)

const formattedDate = `${day}-${month}-${year}`;
currentDateParagraph.textContent = formattedDate;

// A switch statement is used to compare an expression against multiple possible values and execute different code blocks based on the match. It's commonly used for branching logic.
dateOptionsSelectElement.addEventListener("change",() => {
  switch(dateOptionsSelectElement.value){
    case "yyyy-mm-dd":
      currentDateParagraph.textContent = formattedDate
      .split("-")
      .reverse()
      .join("-")
      break;
    case 'mm-dd-yyyy-h-mm':
      currentDateParagraph.textContent = `${formattedDate} ${hours} Hours ${minutes} Minutes`
      break;
      default:
        currentDateParagraph.textContent = formattedDate
  }
})
const exampleSentence = "selur pmaCedoCeerf".split("").reverse().join("");
console.log(exampleSentence)


