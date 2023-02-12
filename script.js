let timeTracking;
const logoArray = [
  './images/icon-work.svg" alt="icon of schoolbag',
  './images/icon-play.svg" alt="icon of controller',
  './images/icon-study.svg" alt="icon of book',
  './images/icon-exercise.svg" alt="icon of signalman',
  './images/icon-social.svg" alt="icon of speech bubble',
  './images/icon-self-care.svg" alt="icon of heart with the medial cross',
];
// Create a color array for card's background
const colorArray = [
  "hsl(15, 100%, 70%)",
  "hsl(195, 74%, 62%)",
  "hsl(348, 100%, 68%)",
  "hsl(145, 58%, 55%)",
  "hsl(264, 64%, 52%)",
  "hsl(43, 84%, 65%)",
];
let assignedColors = [];
const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 361);
  const saturation = Math.floor(Math.random() * 101);
  const lightness = Math.floor(Math.random() * 101);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
const addRandomColor = () => {
  assignedColors.push(generateRandomColor());
  return generateRandomColor;
};

// Call and get json data

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
populate();
const cardsContainer = document.querySelector(".cards-container");

let currentTimeframe = "daily";

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    currentTimeframe = button.dataset.timeframes;

    updateCards();
  });
});

const updateCards = () => {
  let cardsHtml = "";
  let colorIndex = 0;

  timeTracking.forEach((activity) => {
    let color;
    let logo;

    if (colorIndex < colorArray.length) {
      color = colorArray[colorIndex];
      logo = logoArray[colorIndex];
    } else if (assignedColors.length === 0) {
      addRandomColor();
      color = assignedColors[colorIndex - 6];
    } else {
      addRandomColor();

      color = assignedColors[colorIndex - 6];
    }

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

    colorIndex++;
  });
  cardsContainer.innerHTML = cardsHtml;
};

const addCardBtn = document.querySelector("#addCardBtn");
addCardBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#newCardTitle").value;

  // Add the new card to your data here
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
