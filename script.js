// Call and get json data
async function populate() {
  const requestURL = "./data.json";
  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = () => {
    const timeTracking = request.response;
    showHours(timeTracking);
    showActivity(timeTracking);
  };
}
populate();

showActivity = (obj) => {
  const activity = document.querySelector("h2");
  activity.textContent = obj.current;
};
