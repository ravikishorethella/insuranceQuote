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
      // clearing the previous results
      const prevResult = document.querySelector("#result div");
      if (prevResult !== null) {
        prevResult.remove();
      }

      //     make the quotation here
      const insurance = new Insurance(make, year, level);
      const price = insurance.calculateQuotation(insurance);

      // printing the result from HTMLUI
      html.showResults(price, insurance);
      // console.log(price);
    }
  });
}
