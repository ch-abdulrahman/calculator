let display = document.querySelector(".display");
let ans = document.querySelector(".ans");
let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let Value = e.target.value; //to get button value
    if (display.innerHTML == "0") display.innerHTML = ""; //to remove '0' at begining
    if (display.innerHTML == "Error") display.innerHTML = ""; //to remove 'Error' at begining

    switch (Value) {
      case "Clear":
        display.innerHTML = "0";
        ans.innerText = "";
        break;

      case "Backspace":
        display.innerHTML = display.innerHTML.slice(0, -1); //to remove last character
        ans.innerText = `= ${calculate(display.innerHTML)}`; //to calculate answer , calculate function is declared below
        if (display.innerHTML == "") {
          display.innerHTML = 0; // if no digit on display, 0 will display automatically
          ans.innerText = "";
        }
        break;

      case "=":
        display.innerHTML = calculate(display.innerHTML); //to calculate answer
        ans.innerText = "";
        break;

      case "÷": case "×": case "-": case "+":
        var lastChar = display.innerHTML.slice(-1); //to get last character
        // if user press any operation then the first operation will be replaced automaticaly
        if (lastChar == "÷" || lastChar == "×" || lastChar == "-" || lastChar == "+") {
          display.innerHTML = display.innerHTML.slice(0, -1);
          display.innerHTML += Value;
        } else {
          display.innerHTML += Value;
        }
        break;

      case "(": case ")": case ".":
        var lastChar = display.innerHTML.slice(-1); //to get last character
        if (lastChar == "(" || lastChar == ")") {
          display.innerHTML += ""; // one bracket can be put at one time
        }
        if (lastChar == ".") {
          display.innerHTML += ""; // user will not input multiple dots
        } else {
          if ((display.innerHTML == 0 || lastChar == "(" || lastChar == ")" || lastChar == "÷" || lastChar == "×" || lastChar == "-" || lastChar == "+") && Value == ".") {
            display.innerHTML += "0."; // to add 0 before .
          } else {
            display.innerHTML += Value; // otherwise add bracket to display
          }
        }
        ans.innerText = `= ${calculate(display.innerHTML)}`; //to calculate answer
        break;

      default:
        display.innerHTML += Value;
        ans.innerText = `= ${calculate(display.innerHTML)}`;
        if (display.innerHTML == 0 && Value == 0) ans.innerText = "";  //if Value in display is 0 and user press 0 button, then ans will not display = 0
    }

    let text_Length = display.innerHTML.length;
    if (text_Length >= 0) {
      display.style = `font-size: 52px; line-height: 52px;`;
    }
    if (text_Length > 9) {
      display.style = `font-size: 42px; line-height: 42px;`;
    }
    if (text_Length > 11) {
      display.style = `font-size: 36px; line-height: 36px;`;
    }
    // if (text_Length % 13 == 0) {
    //   display.innerHTML += "<br>"
    // }
    document.querySelector(".screen").scrollTo(1000, 1000)

  }); //arrow function end
}); //addEventListener function end

//@@@@@@@@ Calculate Function @@@@@@@@//

function calculate(displayValue) {
  try {
    let clearValue = "";
    for (let str of displayValue) { // to replace ÷ and × , use for of loop
      if (str == "÷") str = "/";
      if (str == "×") str = "*";
      clearValue += str;
    }
    let ans = eval(clearValue);
    if (!Number.isInteger(ans)) { //true if ans not a number i.e (3.142857142857143)
      let intPart = parseInt(ans); //returns integer i.e (3)
      let floatPart = ans - intPart; //returns float part i.e (0.142857142857143)
      let floatLength = floatPart.toString().length - 2; // returns length of float part and ww minus 2 for 0 and . string
      if (floatLength > 8) {
        ans = ans.toFixed(8);
      }
    }
    return ans;
  } catch {
    return "Error";
  }
}

//@@@@@@@@@@@@@@@ Theme @@@@@@@@@@@@@@@//

let checkbox = document.querySelector("#checkbox");
let theme_button = document.querySelector(".theme-btn");
let switch_holder = document.querySelector(".switch-holder");
let switch_toggle = document.querySelector(".switch-toggle");
let logo = document.querySelector(".logo");

// when user clicks on theme button and double click on logo a pop up switch will appear

theme_button.onclick = () => {
  switch_holder.classList.toggle("active");
  switch_timeout = setTimeout(() => {
    switch_holder.classList.remove("active");
  }, 3500);
};

logo.ondblclick = () => {
  switch_holder.classList.toggle("active");
  switch_timeout = setTimeout(() => {
    switch_holder.classList.remove("active");
  }, 3500);
};

switch_holder.onmouseenter = () => {
  clearTimeout(switch_timeout);
};
switch_holder.onmouseleave = () => {
  switch_timeout = setTimeout(() => {
    switch_holder.classList.remove("active");
  }, 1000);
};

switch_holder.onclick = () => {
  if (checkbox.checked) {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
    let getCurrentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("selected-theme", getCurrentTheme);
  }
}

// to get previous theme used by user
if (localStorage.getItem("selected-theme") == "dark") {
  document.body.classList.toggle("light-theme");
  document.body.classList.toggle("dark-theme");
  checkbox.checked = true;
}
