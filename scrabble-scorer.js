// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! \n");
  let word = input.question("Enter a word: ");
  return word;
}

let newPointStructure;

function simpleScorer(word) {
   word = word.toUpperCase();
   return word.length;
}

function vowelBonusScorer(word) {
   const vowels = "AEIOU";
   word = word.toUpperCase();
   let score = 0;
 
   for (let char of word) {
     if (vowels.includes(char)) {
       score += 3;
     } else if (/[A-Z]/.test(char)) {
       score += 1;
     }
   }
   return score;
}

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;

  for (let char of word) {
    score += newPointStructure[char];
  }
  return score;
}

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
    },
    {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
    },
    {
      name: 'Scrabble',
      description: 'Uses the traditional Scrabble point system',
      scorerFunction: scrabbleScorer
    }
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?\n");
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");
  let choice = input.question("Enter 0, 1, or 2: ");
  return scoringAlgorithms[Number(choice)];
}

function transform(oldPointStructure) {
  let newPointStructure = {};
  for (let pointValue in oldPointStructure) {
    for (let letter of oldPointStructure[pointValue]) {
      newPointStructure[letter.toLowerCase()] = Number(pointValue);
    }
  }
  return newPointStructure;
}

newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word = initialPrompt();
  let selectedScorer = scorerPrompt();
  let score = selectedScorer.scorerFunction(word);
  console.log(`Score for '${word}': ${score}`);
}
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
