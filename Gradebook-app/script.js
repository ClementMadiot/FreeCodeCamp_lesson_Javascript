function getAverage(scores) {
  let sum = 0;

  for (const score of scores) {
    sum += score;
  }

  return sum / scores.length;
}
// console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
// console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function hasPassingGrade(score) {
  return getGrade(score) !== "F"; 
}

function studentMsg(totalScores, studentScore) {
  let passed = ' You passed'
  let failed = ' You failed'
  
  let averageTotalScores = getAverage(totalScores)
  let scores = getGrade(studentScore)
  let conclusion = (getGrade(studentScore) === "F") ? failed : passed
  
return "Class average: " + averageTotalScores + ". Your grade: " + scores + "." + conclusion + " the course."

}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
