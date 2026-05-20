let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerHTML;

        if (buttonText == '=') {
            try {
                // LIMIT LOGIC: Check if the user entered 'x'
                if (string.includes('x')) {
                    // 1. Substitute x with a very large number (1 trillion)
                    const largeValue = 1e12; 
                    // Use a Regular Expression to replace all 'x' characters
                    let limitExpression = string.replace(/x/g, `(${largeValue})`);
                    
                    let result = eval(limitExpression);

                    // 2. Interpret the result like a math student would
                    if (Math.abs(result) < 1e-6) {
                        string = "0"; // Approaching zero (e.g., 1/x)
                    } else if (!isFinite(result)) {
                        string = "∞"; // Infinite growth
                    } else {
                        // Rounding to 6 decimal places to find the Horizontal Asymptote
                        string = Number(result.toFixed(6)).toString();
                    }
                } else {
                    // Standard calculation for normal numbers
                    string = eval(string);
                }
                
                input.value = string;
            } catch {
                input.value = "Error";
                string = "";
            }
        } 
        else if (buttonText == 'AC') {
            string = "";
            input.value = string;
        } 
        else if (buttonText == 'DEL') {
            string = string.toString().substring(0, string.length - 1);
            input.value = string;
        } 
        else {
            // Handle display symbols vs math operators
            if (buttonText === '×') {
                string += '*';
            } else if (buttonText === '÷') {
                string += '/';
            } else {
                string += buttonText;
            }
            input.value = string;
        }
    });
});