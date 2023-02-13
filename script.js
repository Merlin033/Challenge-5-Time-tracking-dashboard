let timeTracking;

// Array of icons to be used on cards
const logoArray = [
  './images/icon-work.svg" alt="icon of schoolbag',
  './images/icon-play.svg" alt="icon of controller',
  './images/icon-study.svg" alt="icon of book',
  './images/icon-exercise.svg" alt="icon of signalman',
  './images/icon-social.svg" alt="icon of speech bubble',
  './images/icon-self-care.svg" alt="icon of heart with the medial cross',
];

// Array of colors for cards background
const colorArray = [
  "hsl(15, 100%, 70%)",
  "hsl(195, 74%, 62%)",
  "hsl(348, 100%, 68%)",
  "hsl(145, 58%, 55%)",
  "hsl(264, 64%, 52%)",
  "hsl(43, 84%, 65%)",
];

// Array to store the colors assigned randomly
let assignedColors = [];

// Function to generate random color
const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 361);
  const saturation = Math.floor(Math.random() * 101);
  const lightness = Math.floor(Math.random() * 101);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Function to add random color to assigned colors array
const addRandomColor = () => {
  assignedColors.push(generateRandomColor());
  return generateRandomColor;
};

// Fetch data from json file
async function populate() {
  const requestURL = "./data.json";
  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = () => {
    timeTracking = request.response;
    updateCards();
  };
}

// Call the fetch function
populate();

// Select the container where cards will be added
const cardsContainer = document.querySelector(".cards-container");

// Variable to keep track of the current time frame
let currentTimeframe = "daily";

// Get all buttons
const buttons = document.querySelectorAll(".btn");

// Function to update button class when clicked
const updateButtons = () => {
  buttons.forEach((button) => {
    if (button.dataset.timeframes === currentTimeframe) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
};

// Add click event to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    currentTimeframe = button.dataset.timeframes;
    updateCards();
    updateButtons();
  });
});

// Call updateButtons function to set the default time frame
updateButtons();

// The function `updateCards` updates the cards in the UI with the latest data.
const updateCards = () => {
  let cardsHtml = "";
  let colorIndex = 0;

  // Iterate through each activity in the `timeTracking` array.
  timeTracking.forEach((activity) => {
    let color;
    let logo;

    // If the colorIndex is less than the length of the `colorArray`, set `color` and `logo` to the color and logo at that index.
    if (colorIndex < colorArray.length) {
      color = colorArray[colorIndex];
      logo = logoArray[colorIndex];
    } else if (assignedColors.length === 0) {
      // If the length of `assignedColors` is 0, add a random color to it and set `color` to the color at the colorIndex minus 6.
      addRandomColor();
      color = assignedColors[colorIndex - 6];
    } else {
      // Otherwise, add a random color to `assignedColors` and set `color` to the color at the colorIndex minus 6.
      addRandomColor();
      color = assignedColors[colorIndex - 6];
    }

    // Add the new card to the `cardsHtml` string.
    cardsHtml += `
      <div class="card" id="${activity.title.toLowerCase()}" style="background-color: ${color};background-image: url(${logo});">
        <div class="card-inner">
          
            <h3 class="card-title">${activity.title}</h3>
            <details class="option">
              <summary><img src="./images/icon-ellipsis.svg" alt="icon of ellipsis"/></summary>
              
            </details>
          
          
            <h2 class="card-current">
               ${activity.timeframes[currentTimeframe].current}hrs
            </h2>
            <p class="card-previous">
              Last Week - ${activity.timeframes[currentTimeframe].previous} hrs
            </p>
          
        </div>
      </div>
    `;

    // Increment the colorIndex.
    colorIndex++;
  });

  // Update the HTML of the `cardsContainer` with the new `cardsHtml` string.
  cardsContainer.innerHTML = cardsHtml;
};

// Get the "addCardBtn" element and add a click event listener to it.
const addCardBtn = document.querySelector("#addCardBtn");
addCardBtn.addEventListener("click", (event) => {
  // Prevent the default behavior of the event.
  event.preventDefault();

  // Get the value of the "newCardTitle" input field.
  const title = document.querySelector("#newCardTitle").value;

  // Add the new activity to the `timeTracking` array.
  timeTracking.push({
    title,
    timeframes: {
      daily: {
        current: 0,
        previous: 0,
      },
      weekly: {
        current: 0,
        previous: 0,
      },
      monthly: {
        current: 0,
        previous: 0,
      },
    },
  });
  console.log(timeTracking);
  // Call the updateCards function to update the UI
  updateCards();

  // Clear the input field
  document.querySelector("#newCardTitle").value = "";
});
