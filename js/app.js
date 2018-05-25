// variables
const form = document.getElementById("request-quote");
const html = new HTMLUI();

// eventListeners

eventListeners();

function eventListeners() {
  // on page load
  document.addEventListener("DOMContentLoaded", () => {
    html.displayYears();
  });

  //   when the form is submitted
  form.addEventListener("submit", function(e) {
    //   prevent the page from loading
    e.preventDefault();

    //   reading the values from the form
    const make = document.getElementById("make").value;
    const year = document.getElementById("year").value;

    // check if the radio button is checked
    const level = document.querySelector('input[name="level"]:checked').value;

    //     if any of the form field is empty then return an error
    if (make === "" || year === "" || level === "") {
      // using the global html variable
      html.displayError("All the fields are mandatory");
    } else {
      //     make the quotation here
      const insurance = new Insurance(make, year, level);
      const price = insurance.calculateQuotation(insurance);
    }
  });
}

// objects

// object related to the quotation insurance
function Insurance(make, year, level) {
  this.make = make;
  this.year = year;
  this.level = level;
}

// creating a method to the insurance object using the prototype
Insurance.prototype.calculateQuotation = function(insurance) {
  let price;
  const base = 2000;

  // get the make
  const make = insurance.make;

  // The values are just some random numbers

  switch (make) {
    case "1":
      price = base * 1.15;
      break;
    case "2":
      price = base * 1.05;
      break;
    case "3":
      price = base * 1.35;
      break;
  }

  //   get the year
  const year = insurance.year;
  //   differnec between the current year and the selected year
  const difference = this.getYearDifference(year);

  //   each year the inssurance  price is going to get 3% cheaper
  price = price - difference * 3 * price / 100;
  console.log(price);
};

// creating a difference between the years
Insurance.prototype.getYearDifference = function(year) {
  return new Date().getFullYear() - year;
};

// object related to the html
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
};

// displaying the error message
HTMLUI.prototype.displayError = function(message) {
  const div = document.createElement("div");
  // adding a class to the div
  div.classList = "error";

  // inserting the error message
  div.innerHTML = `
            <p>${message}</p>
      `;
  // inserting the message above the form fields
  form.insertBefore(div, document.querySelector(".form-group"));

  //   timeout for the error message
  setTimeout(() => {
    document.querySelector(".error").remove();
  }, 3000);
};
