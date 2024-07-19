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
	let letterPoints = 0;
 
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
 //console.log(oldScrabbleScorer(task1Word));
 return task1Word;
};

//let newPointStructure = transform(oldPointStructure); //LUCAS! is this ok here? or need to move into transform function?

function simpleScorer (word) { 
   word = word.toUpperCase();
	let simplePoints = 0;
	for (let i = 0; i < word.length; i++) {
      simplePoints += 1;
   }
   return simplePoints;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
	let vowelStructurePts = 0;
   let vowelArray = ['A', 'E', 'I', 'O', 'U'];
   for (let i = 0; i < word.length; i++) { 
      if (vowelArray.includes(word[i])) { //LUCAS i didnt include 'Y'
//(word.includes(['a', 'e', 'i', 'o', 'u'])) { LUCASSSSSS first attempt- save in case current is wrong .includes syntax but this one wasnt passing my npm tests
         vowelStructurePts += 3; //LUCASSS1!!!! above maybe change ([aeiou].includes(word[i])) {
		 }else {
         vowelStructurePts += 1;
       } //LUCASSSSSSSSSSSSSSSSS should i add an else statement here for " " or nums?
   }
   return vowelStructurePts;
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
	let newLetterPoints = 0;
   for (let i = 0; i < word.length; i++) {
   newLetterPoints += newPointStructure[word[i]];
   }
   return newLetterPoints;
}	


const scoringAlgorithms = [
   {
      "name": "Simple Score",
      "description": "Each letter is worth 1 point.",
      "scorerFunction": simpleScorer 
   },
   {
      "name": "Bonus Vowels",
      "description": "Vowels are 3 pts, consonants are 1 pt.",
      "scorerFunction": vowelBonusScorer 
   },
   {
      "name": "Scrabble",
      "description": "The traditional scoring algorithm.",
      "scorerFunction": scrabbleScorer //LUCASSSSSS replaced with my new function
   }
]; //Lucas idk if i need this ";"

function scorerPrompt() { //LUCAS i dont think this needs a parameter
   let gradingChoice = input.question("Which scoring algorithm would you like to use? \n \n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ");
   if (gradingChoice === "0") { 
      return(scoringAlgorithms[0]); //lucas maybe return if i dont need the object printed?
   }else if (gradingChoice === "1") {
      return(scoringAlgorithms[1]);
   }else if (gradingChoice === "2") {
      return(scoringAlgorithms[2]);
   } //LUCAS maybe do else here and log "invalid try again" and loop it back to prompt
   return scoringAlgorithms; 
} 

function transform(oldStructureObj) { 
let newStructure = {};

   for (let points in oldStructureObj) {
      let letters = oldStructureObj[points]; 
      for (let i = 0; i < letters.length; i++) {
         let letter = letters[i].toLowerCase();
         newStructure[letter] = Number(points); //LUCASSSS need points into num type IM GETTING A SYNTAX ERROR HERE
         // LUCAS above: syntax error: Invalid left-hand side in assignment expression.
      }
   }
return newStructure;
}//LUCAS navigates thru oldptstructure and makes new with letters as keys LOWERCASE and numbers as values for the keys

let newPointStructure = transform(oldPointStructure);
//for (item in oldPointStructure) { //LUCASSSS im not sure if my for...in loop needs to be inside of this function
   //make each item a key and assign it the pt value Lucasssss
//let oldPointStructure[0].split.toLowerCase = onePoint // LUCAS i might have to split these arrays and then make tolowercase


function runProgram() {
   let task1Word = initialPrompt();
   let selectedAlgorithm = scorerPrompt(task1Word); 
   let score = selectedAlgorithm.scorerFunction(task1Word);
   console.log(`Score for '${task1Word}': ${score}`);
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
