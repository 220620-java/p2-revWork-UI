function setRegisterErrorMessage(msg) {
    $("#registerDialogErrorMessage").text(msg);
}

function resetRegisterDialog() {
    $("#registerDialogRoleDropdown").val("1");
    $("#RegisterDialogFullNname").val("");
    $("#registerDialogEmail").val("");
    $("#registerDialogUsername").val("");
    $("#registerDialogPassword").val("");
    $("#registerDialogDropdown").val("1");
    $("#registerDialogBio").val("");

    setLoginErrorMessage("");

    $('#registerDialogRegisterButton').prop('disabled', true);
}

function validateRegisterDialog() {
    // Ensure that all text fiels are not null. If that is the case, enable the
    // register button.  Otherwise disable the button.
    let username = $("#registerDialogUsername").val();
    let password = $("#registerDialogPassword").val();
    let fullname = $("#RegisterDialogFullNname").val();
    let email = $("#registerDialogEmail").val();

    let button = $('#registerDialogRegisterButton');

    if ( username != "" && password != "" && fullname != "" && email != "") {
        button.prop('disabled', false);
    }
    else {
        button.prop('disabled', true);
    }
}

function registerNewAccount(){
    console.log('hello from login');

    let username = $("#registerDialogUsername").val();
    let password = $("#registerDialogPassword").val();
    let fullname = $("#RegisterDialogFullNname").val();
    let email = $("#registerDialogEmail").val();

    let expLevel = $("#registerDialogDropdown").find(":selected").text();
    let about = $("#registerDialogBio").val();

    let loginRole = $('#registerDialogRoleDropdown').find(":selected").text().toLowerCase();

    let freelancerRegister = true;
    if ( loginRole == "employer" ) {
        freelancerRegister = false;
    }


    console.log('username: ' + username);
    console.log('password: ' + password);
    console.log('fullname: ' + fullname);
    console.log('email: ' + email);
    console.log('loginRole: ' + loginRole);

    let obj = {"username":username,"password":password,"name":fullname,"email":email};

    if ( freelancerRegister ) {
        let obj2 = {"about":about,"experiencelevel":expLevel};
        $.extend(obj, obj2);
    }

    const myJSON = JSON.stringify(obj);
    console.log(myJSON);

    // 4 steps to making an AJAX call
    // STEP 1: Create an XML Http Request object
    let xhttp = new XMLHttpRequest();

    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;
    //xhttp.addEventListener('readystatechange', receiveData);

    // STEP 3: Open the request
    let url = restURL;

    if ( freelancerRegister ) {
        url += '/freelancer/register';
    }
    else {
        url += '/employer/register';
    }

    
    xhttp.open('POST', url );
    xhttp.setRequestHeader("Content-Type", "application/json");
    // STEP 4: Send the request
    xhttp.send(myJSON);

    // This needs to be an inner function so that it has closure to xhttp.
    function receiveData() {

        if (xhttp.readyState === 4) { 


            if (200 <= xhttp.status && xhttp.status < 300) { // check if it was successful
                // Ready state is DONE, HTTP status code is "OK"
                // responseText property is the response body as a string
                // let response = xhttp.responseText;
                // console.log("response:" + response); // before we use JSON.parse (still a string)

                // const myArray = response.split(":"); 
                // console.log(myArray[1]);

                // let jwtToken = myArray[1];

                // setCookie('jwt',jwtToken,365);

                // if( freelancerRegister ) {
                //     window.location.replace('freelancer.html');
                // }
                // else {
                //     window.location.replace('employer.html');
                // }

                loginWithUsernameAndPassword(username,password,loginRole);


            } else {

                console.log("registation failed. status:" + xhttp.status);

                setRegisterErrorMessage("The username is already taken. Please try again.")
            }
        } else {

        }
    } 
}