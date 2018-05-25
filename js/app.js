// variables

// eventListeners

eventListeners();

function eventListeners() {
  // on page load
  document.addEventListener("DOMContentLoaded", () => {
    const html = new HTMLUI();
    html.displayYears();
  });
}

// objects

function HTMLUI() {}

// adding a method to the object using the prototype
HTMLUI.prototype.displayYears = function() {
  // getting the current year
  const max = new Date().getFullYear(),
    min = max - 20;

  //   getting the selected years
  const selectedYears = document.getElementById("year");

  // using a for loop to get the years
  for (i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectedYears.appendChild(option);
  }

  console.log(selectedYears);
};
