var colorOptions = ["blue", "red", "yellow", "green", "orange", "purple", "white", "black"];	// Possible colors
var color = "none";
var favoriteColor = "none";
var guessFirst = "none";
var guessAgain = "none";
var checksOut = true;
var tryCount = 0;
var gameNumber = 1;
var started = false;
var convergence = false;
var firstTry = false;
var win = false;
var instruction = document.getElementById("instruction");
var entryField = document.getElementById("entryField");
var entry = document.getElementById("entry");
var playButton = document.getElementById("play");
var replayButton = document.getElementById("replay");
var result = document.getElementById("results");
var image = document.getElementById("resultImage");

entryField.style.display = "none";
replayButton.style.display = "none";

// randomizes the computer's color selection
function randomColor() {
	var colorSelector = Math.random();
	if (colorSelector <= 0.125) {
		color = colorOptions[0]
	} else if (0.125 < colorSelector && colorSelector <= 0.25) {
		color = colorOptions[1]
	} else if (0.25 < colorSelector && colorSelector <= 0.375) {
		color = colorOptions[2]
	} else if (0.375 < colorSelector && colorSelector <= 0.5) {
		color = colorOptions[3]
	} else if (0.5 < colorSelector && colorSelector <= 0.625) {
		color = colorOptions[4]
	} else if (0.625 < colorSelector && colorSelector <= 0.75) {
		color = colorOptions[5]
	} else if (0.75 < colorSelector && colorSelector <= 0.875) {
		color = colorOptions[6]
	} else {
		color = colorOptions[7]
	}
}

// gets the user's entry
function getSubmission() {
	return entry.value;
}

// clears the field at the end of each entry
function clearField() {
	entry.value = "";
}

// validates user's subsequent guesses
function guessChecker() {
	for(var i = 0; i < colorOptions.length; i++) {
		if (colorOptions[i] === guessAgain) {
			checksOut = true;
			break;
		} else {
			checksOut = false;
		}
	}
}

// gives first instructions and opens the entry field
function gameStart() {
	clearField();
	entryField.style.display = "block";
	playButton.style.display = "none";
	instruction.innerHTML = "Hello. I'm your computer (surprise, I'm sentient!). What's your favorite color?";

	// This part just confirms that the function has run
	console.log("gameStart done!");
}

// here we decide and insert the image that should display with this result
function getImage() {
	document.getElementById("box").style = "float: left";
	document.getElementById("resultImage").style = "float: right;";
	image.innerHTML = "<h2>I picked " + color + ".</h2><br /><img src='images/" + color + ".jpg' />";
}

// the first time the user guesses, there are several unique outcomes possible
function comparisonFirst() {
	randomColor();
	if (guessFirst === "milk and eggs") {
		console.log("User found the joke!");
		alert("Oh, you want a joke? Great! I've got a good one.");
		alert('A programmer is going to the grocery store and his wife tells him, "Buy a gallon of milk, and if there are eggs, buy a dozen." So the programmer goes, buys everything, and drives back to his house. Upon arrival, his wife angrily asks him, "Why did you get 13 gallons of milk?" The programmer says, "There were eggs!"');
		alert("Funny, right? Yeah, I like that one.");
		alert("Anyway, let's play the game.");
		instruction.innerHTML = "So guess what color I'm thinking of."
	} else if ((guessFirst === color) && (color === favoriteColor)) {
		convergence = true;
		console.log("Perfect convergence! User favorite color, user guess, and computer selection all match.");
		instruction.innerHTML = "OK, OK. I cheated and just used your favorite color, so sue me.";
		entryField.style.display="none";
		playButton.value="Give computer another shot";
		clearField();
		getImage();
	} else if (guessFirst === color) {
		firstTry = true;
		console.log("User guessed " + guessFirst + ". It's a match!");
		instruction.innerHTML = "Wow. How the heck did you guess that? No matter. You win!";
		clearField();
		getImage();
	} else if (gameNumber > 1) {
		console.log("User guessed " + guessFirst + ", but computer chose " + color + ". Not a match.");
		instruction.innerHTML = "Nope, not it. That's try # " + tryCount + " . I'll pick a new color, and you guess again.";
		tryCount++;
		clearField();
		getImage();
	} else {
		// a first wrong guess returns the possible answers, starts counting tries, and generates a new user-guess variable
		console.log("User guessed " + guessFirst + ", but computer chose " + color + ". Not a match.");
		instruction.innerHTML = "Hint: I only know white, black, primary, and secondary colors. And... " + guessFirst.toUpperCase() + " isn't what I was thinking of.";
		tryCount++;
		clearField();
		getImage();
	}
}

// for all subsequent guesses we generate a new computer-selection and track tries
function comparison() {
	guessAgain = guessAgain.toLowerCase();
	randomColor();
	guessChecker();
	tryCount++;
	if (checksOut === false) {
		console.log("User guess is invalid.");
		instruction.innerHTML = "Hey, that's not even one of colors I listed! You're not taking this seriously.";
		getImage();
	} else if (guessAgain === color) {
		win = true;
		console.log("User guessed " + guessAgain + ". It's a match!");
		instruction.innerHTML = "Look at you, you clever human. You got it!";
		entryField.style.display="none";
		clearField();
		recordGame();
		replayButton.value="Yes. Yes I did!";
		replayButton.style.display = "block";
		getImage();
	} else {
		console.log("User guessed " + guessAgain + ", but computer chose " + color + ". Not a match.");
		instruction.innerHTML = "Sorry, still not the one. That's try # " + tryCount + " . I'll pick a new one, and you can try again.";
		getImage();
	}
}

function submissionStart() {
	favoriteColor = getSubmission();
	favoriteColor = favoriteColor.toLowerCase();

	// just to verify the function has run
	console.log("User chose " + favoriteColor + " as favorite color.");
	instruction.innerHTML = "Really? Well, OK, if you say so. Now guess what color I'm thinking of.";
	clearField();
	started = true;
}

function submissionSecond() {
	guessFirst = getSubmission();
	guessFirst = guessFirst.toLowerCase();
	comparisonFirst();
	clearField();
}

function submissionAll() {
	guessAgain = getSubmission();
	guessAgain = guessAgain.toLowerCase();
	comparison();
	clearField();
}

function endWin() {
	entryField.style.display="none";
	instruction.innerHTML = "That was pretty good, but I don't know if you could do it again. Try again to prove me wrong.";
	playButton.value="Play again";
	recordGame();
}	

function endLose() {
	lose = true;
	entryField.style.display="none";
	instruction.innerHTML = "Don't worry, I won't tell the other humans about your terrible guessing skills. You could always redeem yourself with a rematch...";
	replayButton.value="Redeem yourself";
	replayButton.style.display = "block";
	recordGame();
}

// records the results of this game
function recordGame() {
		var resultNow = result;
	if (convergence === true) {
		result.innerHTML = resultNow.innerHTML + "<br />Game #" + gameNumber + ": User WON! Computer admitted to stealing user's favorite color, " + color.toUpperCase() + ".";
		gameNumber++;
	} else if (firstTry === true) {
		result.innerHTML = resultNow.innerHTML + "<br />Game #" + gameNumber + ": User WON! " + color.toUpperCase() + " it was. User got it in one try!";
		gameNumber++;
	} else if (win === true) {
		result.innerHTML = resultNow.innerHTML + "<br />Game #" + gameNumber + ": User WON! It took some guessing, but user finally got it with " + color.toUpperCase() + ".";
		gameNumber++;
	} else if (lose === true) {
		result.innerHTML = resultNow.innerHTML + "<br />Game #" + gameNumber + ": User LOST. 10 guesses, and user couldn't get it.";
		gameNumber++;
	}
}

function roundSelector() {
		if (started === false) {
			submissionStart();
		} else if (tryCount === 0) {
			submissionSecond();
		} else if ((tryCount < 9) && (win === false)) {
			submissionAll();
		} else if (win === true) {
			endWin();
		} else {
			endLose();
		}
}

function newGame() {
	replayButton.style.display = "none";
	checksOut = true;
	tryCount = 1;
	convergence = false;
	firstTry = false;
	win = false;
	console.log("User started a new game.");
	instruction.innerHTML = "OK, let's do this. Round " + gameNumber + "!" + " What color am I thinking of?";
	clearField();
	entryField.style.display="block";
}