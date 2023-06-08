/**
 * detail explanation mentioned with code written down below for better understanding
 */
const canvas = document.getElementById("myCanvas");
const arrowWay = canvas.getContext("2d");
const hitMsg=document.querySelector('.msg');
// Generate random color
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color +=letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
var intialColor=getRandomColor();
arrowWay.fillStyle = getRandomColor();
// Draw a circle on the left side of the canvas with a random color
function displayCircle() {
  let circleX = 100; 
  let circleY = canvas.height / 2;
  let radius = 60; 

  arrowWay.fillStyle = getRandomColor();
  // Starting a new path and draw the circle
    arrowWay.beginPath();
  arrowWay.arc(circleX, circleY, radius, 0, Math.PI * 2);
  arrowWay.fill();
}
// Draw the arrow on the right side of the canvas
function displayArrow(arrowX, arrowY) {
  let arrowWidth = 40; 
  let arrowHeight = 20;

  // Set the fill style to black
  arrowWay.fillStyle = "black";

  // Start a new path and draw the arrow
  arrowWay.beginPath();
  arrowWay.moveTo(arrowX, arrowY - arrowHeight / 2);
  arrowWay.lineTo(arrowX - arrowWidth, arrowY);
  arrowWay.lineTo(arrowX, arrowY + arrowHeight / 2);
  arrowWay.fill();
}

// Move the arrow towards the circle
function moveArrow(arrowX, arrowY, circleX, circleY) {
    hitMsg.style.visibility="hidden"
  let directionX = (circleX - arrowX) / 100; // Change in X-coordinate per frame
  let directionY = (circleY - arrowY) / 100; // Change in Y-coordinate per frame
  // Clear the canvas for canceling the re-renders of arrow
  arrowWay.clearRect(0, 0, canvas.width, canvas.height);

  // Move the arrow towards the circle
  arrowX += directionX;
  arrowY += directionY;

  // Check if the arrow has hit the circle
  if (Math.abs(arrowX - circleX) <= 100 && Math.abs(arrowY - circleY) <= 100) {
    // Set a new random color for the circle
    arrowWay.fillStyle = getRandomColor();
    displayCircle(); // Redraw the circle with the new color
    displayArrow(arrowX, arrowY); //render the arrow where it is right now
    hitMsg.style.visibility="visible"
    hitMsg.textContent="click reset ,for default positioning of arrow"
  } else {
    // Redraw the circle and the arrow
    displayCircle();
    displayArrow(arrowX, arrowY);

    // Continue moving the arrow
    requestAnimationFrame(function () {
      moveArrow(arrowX, arrowY, circleX, circleY);
    });
  }
}

// Function to handle the Hit button
function hit() {
  // Get the starting position of the arrow
  let arrowX = canvas.width - 100;
  let arrowY = canvas.height / 2;

  // Get the position of the circle
  let circleX = 100; 
  let circleY = canvas.height / 2; 

  // Start moving the arrow towards the circle
  moveArrow(arrowX, arrowY, circleX, circleY);
}

// Function to handle the Reset button click event
function reset() {
  // Clear the canvas
  arrowWay.clearRect(0, 0, canvas.width, canvas.height);
  hitMsg.style.visibility="hidden"
  // Draw the initial circle
  displayCircle();
  // Draw the arrow in its default position
  let arrowX = canvas.width - 100; 
  let arrowY = canvas.height / 2;
  displayArrow(arrowX, arrowY);
}

// Call the displayCircle function to draw the circle initially
displayCircle();
let arrowX = canvas.width - 100; 
  let arrowY = canvas.height / 2;
  //Call the displayArrow function to draw the arrow initially in default position
  displayArrow(arrowX, arrowY);
