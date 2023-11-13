const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let secretNumber;
let tries;

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function askGuess() {
  rl.question("Enter a guess: ", (answer) => {
    if (checkGuess(Number(answer))) {
      console.log("You Win!");
      rl.close;
    } else if (tries === 1) {
      console.log(`You Lose! The number was ${secretNumber}.`);
    } else {
      tries -= 1;
      askGuess();
    }
  });
}

function askLimit() {
  rl.question("How many turns would you like? ", (turns) => {
    tries = turns;
    rl.close;
    askGuess();
  });
}

function askRange() {
  rl.question("Enter a max number: ", (maxInput) => {
    const max = Number(maxInput);
    rl.question("Enter a min number: ", (minInput) => {
      const min = Number(minInput);
      console.log(
        `I'm thinking of a number between ${minInput} and ${maxInput}...`
      );
      secretNumber = randomInRange(min, max);
      rl.close;
      askLimit();
    });
  });
}

function checkGuess(num) {
  if (num > secretNumber) {
    console.log("Too high");
    return false;
  } else if (num < secretNumber) {
    console.log("Too low");
    return false;
  } else {
    console.log("Correct!");
    return true;
  }
}

askRange();
