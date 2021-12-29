function validateForm(ev) {
    ev.preventDefault();

    var x = document.getElementById('contact-form').elements;

    for (var i = 0; i < x.length; i++) {
        if (x[i].getAttribute('type') !== 'submit') {
            var dataName = x[i].getAttribute('data-name');
            var isEmpty = checkIfEmpty(x[i].value);
            if (isEmpty && x[i].getAttribute('required')) {
                console.log(dataName + " is required but empty.");
                return false;
            } else if (x[i].id === "fname" || x[i].id === "surname") {
                if (!checkNameFormat(x[i].value)) {
                    console.log(dataName + " is not in the correct format.");
                    return false;
                }
                
            } else if (x[i].getAttribute('type') === 'tel') {
                if (!isEmpty && !(checkIfNumber(x[i].value))) {
                    console.log(dataName + " is not a valid number.");
                    return false;
                }
            } else if (!isEmpty && x[i].getAttribute('type') === 'email') {
                if (!checkIfValidEmail(x[i].value)) {
                    console.log(dataName + " is not a valid email.");
                    return false;
                }
            }
        }
    }

    // print inputted details to the console
    for (var i = 0; i < x.length; i++) {
        if (x[i].getAttribute('type') !== 'submit') {
            var dataName = x[i].getAttribute('data-name');
            console.log(dataName + " is: " + x[i].value);
        }
    }

    // clear form
    document.forms[0].reset();

    // display pop-up message
    var popUp = document.getElementById('pop-up');
    popUp.style.display = "block";
    var modal = document.getElementsByClassName('modal');
    modal[0].scrollIntoView();
    
}

function checkIfEmpty(str) {
    // check if given str is empty by removing trailing spaces
    var replaced = str.replace (/^\s+|\s+$/g, '');
    if (replaced === '') {
        return true;
    } else {
        return false;
    }
}

function checkIfNumber(str) {
    // check if given str only contains numbers
    const check = str.match(/[0-9]/g);
    if (check === null || check.length !== str.length) {
        return false;
    } else {
        return true;
    }
}

function checkIfValidEmail(email) {
    // check if email begins with letter or number
    // followed by letters, numbers, '_', '.', '-', '@'
    // and ends with '.' followed by 2 or 3 letters
    // one or more times
    return /^[a-zA-Z0-9]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function checkNameFormat(name) {
    return /[a-zA-Z]*[a-zA-Z ]+/.test(name);
}

function closePopUp() {
    const popUp = document.getElementById('pop-up');
    popUp.style.display = "none";
}

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', validateForm);
    document.getElementById('close-pop-up').addEventListener('click', closePopUp);
};