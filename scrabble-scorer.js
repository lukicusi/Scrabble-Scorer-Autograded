// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
 let task1Word = input.question("Enter a word to score: "); 
 console.log(oldScrabbleScorer(task1Word));
};

let newPointStructure;

function simpleScorer (word) { //LUCAS i think done, or add more after accumulator like oldScrabbleScorer example
   word = word.toUpperCase();
	let simplePoints = "";
	for (let i = 0; i < word.length; i++) {
      simplePoints += 1;
   }
   return simplePoints;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
	let vowelStructurePts = "";
   for (let i = 0; i < word.length; i++) {
      if (word.includes(['a', 'e', 'i', 'o', 'u'])) { //LUCAS i didnt include 'Y'
			vowelStructurePts += 3;
		 }else if (word.includes(['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'])) {
         vowelStructurePts += 3;
       } //LUCASSSSSSSSSSSSSSSSS should i add an else statement here for " " or nums?
   }
   return vowelStructurePts;
};

let scrabbleScorer;

const scoringAlgorithms = [
   {
      "name": "Simple Score",
      "description": "Each letter is worth 1 point.",
      "scorerFunction": simpleScorer() //LUCAS functions at these places correct? or need to call function() ?
   },
   {
      "name": "Bonus Vowels",
      "description": "Vowels are 3 pts, consonants are 1 pt.",
      "scorerFunction": vowelBonusScorer() //LUCAS do these need ';'? or maybe even pass in (word)
   },
   {
      "name": "Scrabble",
      "description": "The traditional scoring algorithm.",
      "scorerFunction": oldScrabbleScorer()
   }
]; //Lucas idk if i need this ";"

function scorerPrompt() { //LUCAS i dont think this needs a parameter
   let gradingChoice = input.question("Enter 0, 1, or 2 for a scoring algorithm: ");
   if (gradingChoice === 0) { //Lucas is this correct with ===?
      console.log(simpleScorer(word)); //LUCAS is the () word, tast1word, or a new variable?
   }else if (gradingChoice === 1) {
      console.log(vowelBonusScorer(word));
   }else if (gradingChoice === 2) {
      console.log(oldScrabbleScorer(word));
   } //LUCAS maybe do else here and log "invalid try again" and loop it back to prompt
   return gradingChoice; //LUCAS do i pass in (word)?
} //;LUCAS does this need ';'?


function transform() {};

function runProgram() {
   initialPrompt();
   scorerPrompt(); ///LUCAS DO I NEED MORE HERE TO CALL AND RUN THIS?
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
	scorerPrompt: scorerPrompt
};
