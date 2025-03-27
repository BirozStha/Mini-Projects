let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let resultShown = false; // New flag to track if the last action was "="
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click',(e) => {
        if(e.target.innerHTML == '='){
            // Prevent evaluation if string is empty or result is already shown
            if (string === "" || resultShown) return; 
            
            try {
                string = string.replace(/%/g, '/100');
                string = new Function('return ' + string)(); // Safe evaluation
                input.value = string;
                resultShown = true; // Mark that result is shown
            } catch {
                input.value = "Error"; // Handle invalid expressions
                string = "";
            }
        }
        else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
            resultShown = false; // Reset flag
        }
        else if(e.target.innerHTML == "DEL"){
            // Convert number result back to a string
            string = string.toString();

            if (resultShown) return;

            string = string.substring(0,string.length - 1);
            input.value = string;
            resultShown = false; // Reset flag when deleting 
        }
        else{
             // If result was just shown and user types a number, reset
             if (resultShown && !isNaN(e.target.innerHTML)) {
                string = e.target.innerHTML;
            } else {
                string += e.target.innerHTML;
            }
            input.value = string;
            resultShown = false; // Reset flag
        }
    })
})