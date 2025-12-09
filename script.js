/*Put JS in separate file at 3rd milestone*/

function gradeQuiz() {

/*Initializing a score variable and result array to keep track of correct answers*/
    let score = 0;
    let resultArray = [];

/*Storing correct answers for each question in a constant object */
    const answers = {
        q1: "progressive",
        q2: "HTTPS",
        q3: "Web App Manifest",
        q4: "Any device with a modern browser",
        q5: ["Installable", "Works offline", "Easily shareable via URL"],
        q6: ["Caches important files", "Enables push notifications"],
        q7: "Do not work offline",
        q8: ["App name", "Icons", "Theme color"]
    };

/* Getting the user's answers by the id set above*/
    let q1Answer = document.getElementById("q1").value;

/*Trimming whitespace and converting to lowercase to compare accurately*/
    q1Answer = q1Answer.trim().toLowerCase();

/*Comparing the input to the exact answer stored in the answers object*/
    if (q1Answer === answers.q1) {

/*Adding 1 to the score for a correct answer*/
        score = score + 1;

/*Storing the correct message for the answer in the result array for when results are displayed
Also using HTML span elements with classes for CSS styling the correct text*/
        resultArray[0] = "<p><strong>Q1:</strong> <span class='correct'>Correct</span></p>";

    } else {
/*Store the incorrect message and show correct answer
Also using HTML span elements with classes for CSS styling the incorrect text*/
        resultArray[0] = "<p><strong>Q1:</strong> <span class='incorrect'>Incorrect</span> — Correct answer: Progressive</p>";
    }

/*Creating an array of the multiple choice questions*/
    let mcQuestions = [2, 3, 4, 7];

/*Loop through each question number in the array using forEach method*/
    mcQuestions.forEach(function(questionNumber) {

        let questionName = "q" + questionNumber;

/* Find the selected radio button using querySelector, name values, and checked pseudo-class */
        let userChoice = document.querySelector("input[name='" + questionName + "']:checked");

/*Creating a variable to hold the correct answer from the answers object*/
        let correctAnswer = answers[questionName];

/*Check if user made a selection then execute the following*/
        if (userChoice !== null) {

            if (userChoice.value === correctAnswer) {
                score = score + 1;

/* Store the correct message for this question, subtracting 1 to match array index*/
                resultArray[questionNumber - 1] =
                    "<p><strong>Q" + questionNumber + ":</strong> <span class='correct'>Correct</span></p>";
            } else {

/* If the user's choice doesn't match the correct answer, store the incorrect message along with the correct answer*/
                resultArray[questionNumber - 1] =
                    "<p><strong>Q" + questionNumber + ":</strong> <span class='incorrect'>Incorrect</span> — Correct answer: "
                    + correctAnswer + "</p>";
            }   

        } else {
/* If no answer was selected, store that info along with the correct answer*/
            resultArray[questionNumber - 1] =
                "<p><strong>Q" + questionNumber + ":</strong> <span class='incorrect'>Incorrect</span> — Correct answer: "
                + correctAnswer + "</p>";
        }

    });

/*Creating a function to handle multi-select checkbox questions*/
function checkMultiSelect(questionNumber) {

    let questionName = "q" + questionNumber;

/*Creating a Nodelist to hold all selected checkboxes for this question */
    let selectedBoxes = document.querySelectorAll("input[name='" + questionName + "']:checked");

/*Putting user-selected answers into an array */
    let userAnswers = [];
/*Loop through each selected checkbox and add its value to the userAnswers array using push method*/
    selectedBoxes.forEach(function(box) {
        userAnswers.push(box.value);
    });

/*Getting the correct answers for this question from the answers object*/
    let correctAnswers = answers[questionName];

 /*First check if the number of user-selected answers matches the number of correct answers*/
    let sameAmount = (userAnswers.length === correctAnswers.length);

/*Then check if each user-selected answer is in the correct answers array using a for loop*/
    let allMatch = true;
    for (let i = 0; i < userAnswers.length; i++) {
        if (!correctAnswers.includes(userAnswers[i])) {
            allMatch = false;
        }
    }
/*Determine if the overall answer is correct based on both checks*/
    let isCorrect = sameAmount && allMatch;

/*If correct, add 1 to the score*/
    if (isCorrect) {
        score = score + 1;
    }

/*Store the result correct result message*/
    if (isCorrect) {
        resultArray[questionNumber - 1] =
            "<p><strong>Q" + questionNumber +
            ":</strong> <span class='correct'>Correct</span></p>";
    } else {
/*Store the result incorrect result message*/
        resultArray[questionNumber - 1] =
            "<p><strong>Q" + questionNumber +
            ":</strong> <span class='incorrect'>Incorrect</span> — Correct answers: "
/* Using .join to turn the array into a comma-separated string*/
            + correctAnswers.join(", ") + "</p>";
    }
}

/*Calling the checkMultiSelect function for questions 5, 6, and 8*/
checkMultiSelect(5);
checkMultiSelect(6);
checkMultiSelect(8);

/* Declaring a variable for total number of questions */
let totalQuestions = 8;

/*Calculating the percentage score to include in the final results
And using math.round to round to the nearest whole number*/
let percentage = Math.round((score / totalQuestions) * 100);

/*Determining if the user passed or failed based on a 70% passing score*/
let passFail;
if (percentage >= 70) {
    passFail = "<span class='correct'>PASS</span>";
} else {
    passFail = "<span class='incorrect'>FAIL</span>";
}

/*Building the final results message using concatenation and HTML formatting*/
let finalMessage = "";
finalMessage += "<h3>Your Score: " + score + "/" + totalQuestions;
finalMessage += " (" + percentage + "%) — " + passFail + "</h3>";
/*Using join method to combine all result messages into a single string*/
finalMessage += resultArray.join("");

/*Placing the final message into the results div*/
document.getElementById("results").innerHTML = finalMessage;

}

/*Creating a function to clear the form and results*/
function resetQuiz() {

/*Using the quiz id and form reset method to clear all inputs*/
    document.getElementById("quizForm").reset();

/*Clearing the results div by setting it to an empty string*/
    document.getElementById("results").innerHTML = "";
}
