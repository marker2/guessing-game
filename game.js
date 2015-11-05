var colorOptions = ["blue", "red", "yellow", "green", "orange", "purple", "white", "black"];	// Possible colors
var color = "none";
var favoriteColor = "none";
var guessFirst = "none";
var guessAgain = "none";
var checksOut = true;

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
	};
};

// I have to come back to this. It's always showing false, and I don't know why
function guessChecker() {
	for(var i = 0; i < colorOptions.length; i++) {
		if (colorOptions[i] === guessAgain) {
			checksOut = true;
			break;
		} else {
			checksOut = false;
		};
	};
};

function game() {
	// get the first color pair: computer-selection and user-guess
	var convergence = false;
	var firstTry = false;
	var win = false;
	randomColor();
	favoriteColor = prompt("Hello. I'm your computer (surprise, I'm sentient!). What's your favorite color?");
	favoriteColor = favoriteColor.toLowerCase();
	guessFirst = prompt("Really? Well, OK, if you say so. Now guess what color I'm thinking of.")
	guessFirst = guessFirst.toLowerCase();

	// compare the selections
	if ((guessFirst === color) && (color === favoriteColor)) {
		convergence = true;
		console.log("Perfect convergence! User favorite color, user guess, and computer selection all match.");
		alert("OK, OK. I cheated and just used your favorite color, so sue me.");
		document.getElementById("play").value="Give computer another shot";
	} else if (guessFirst === color) {
		firstTry = true;
		console.log("User guessed " + guessFirst + ". It's a match!");
		alert("Wow. How the heck did you guess that? No matter. You win!");
	} else {
		// a first wrong guess returns the possible answers, starts counting tries, and generates a new user-guess variable
		console.log("User guessed " + guessFirst + ", but computer chose " + color + ". Not a match.");
		alert("Hint: I only know white, black, primary, and secondary colors. And... " + guessFirst.toUpperCase() + " isn't what I was thinking of.");
		var tryCount = 1;

		// for all subsequent guesses we generate a new computer-selection and track tries
		while ((guessAgain !== color) && (tryCount < 10))  {
			guessAgain = prompt("I'm thinking of a new one. Care to try again?");
			guessAgain = guessAgain.toLowerCase();
			randomColor();
			guessChecker();
			tryCount++;
			if (checksOut === false) {
				console.log("User guess is invalid.");
				alert("Hey, that's not even one of colors I listed! You're not taking this seriously.");
			} else if (guessAgain === color) {
				win = true;
				console.log("User guessed " + guessAgain + ". It's a match!");
				alert("Look at you, you clever human. You got it!")
			} else {
				console.log("User guessed " + guessAgain + ", but computer chose " + color + ". Not a match.");
				alert("Sorry, still not the one. That's try # " + tryCount + " .")
			};
		};
		// a correct guess gets the user out of the while loop, or a 10th wrong guess ends the game
		if (tryCount < 10) {
			alert("That was pretty good, but I don't know if you could do it again. Try again to prove me wrong.");
			document.getElementById("play").value="Play again";
		} else {
			alert("Don't worry, I won't tell the other humans about your terrible guessing skills. You could always redeem yourself with a rematch...");
			document.getElementById("play").value="Redeem yourself";
		};
	};

	// determine index results
	if (convergence === true) {
		document.getElementById("results").innerHTML = "User WON! Computer admitted to stealing user's favorite color, " + color.toUpperCase() + ".";
	} else if (firstTry === true) {
		document.getElementById("results").innerHTML = "User WON! " + color.toUpperCase() + " it was. User got it in one try!";
	} else if (win === true) {
		document.getElementById("results").innerHTML = "User WON! It took some guessing, but user finally got it with " + color.toUpperCase() + ".";
	} else {
		document.getElementById("results").innerHTML = "User LOST. 10 guesses, and user couldn't get it.";
	}
};