function setLoginErrorMessage(msg) {
    $("#loginDialogErrorMessage").text(msg);
}

function resetLoginDialog() {
    $("#loginDialogUsernameText").val("");
    $("#loginDialogPasswordText").val("");
    setLoginErrorMessage("");

    $('#dialogLoginButton').prop('disabled', true);
}

function validateLoginDialog() {
    // The only validation we need it to ensure that both username and
    // password are not null. If that is the case, enable the login button.
    // Otherwise disable the button.

    console.log("validating login input");

    let username = $("#loginDialogUsernameText").val();
    let password = $("#loginDialogPasswordText").val();

    if ( username != "" && password != "" ) {
        $('#dialogLoginButton').prop('disabled', false);
    }
    else {
        $('#dialogLoginButton').prop('disabled', true);
    }
}


function loginWithUsernameAndPassword(username,password, loginRole) {
 

    console.log('username: ' + username);
    console.log('password: ' + password);
    console.log('loginRole: ' + loginRole);
    // console.log('login for freelancer: ' + loginForFreelancer);
    // console.log('login for employer: ' + loginForEmployer);
    //console.log('selected item: ' + loginRole);

    

    let obj = {"username":username,"password":password,"role":loginRole};

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
    url += '/login';

    console.log("logging into url" + url);


    xhttp.open('POST', url );
    xhttp.setRequestHeader("Content-Type", "application/json");
    // STEP 4: Send the request
    //xhttp.send();
    xhttp.send(myJSON);
    // xhttp.send(JSON.stringify(myObj));
    // xhttp.send('{"username":"", "password":""}');

    // This needs to be an inner function so that it has closure to xhttp.
    function receiveData() {

        if (xhttp.readyState === 4) { 


            if (xhttp.status === 200) { // check if it was successful
                // Ready state is DONE, HTTP status code is "OK"
                // responseText property is the response body as a string
                let response = xhttp.responseText;
                console.log(response); // before we use JSON.parse (still a string)

                const myArray = response.split(":"); 
                console.log(myArray[1]);

                let jwtToken = myArray[1];

                setCookie('jwt',jwtToken,365);

                if( $('#loginDialogFreelancerRadio').is(':checked')) {
                    window.location.replace('freelancer.html');
                }
                else {
                    window.location.replace('employer.html');
                }

                //response = JSON.parse(response);
                //console.log(response); // after we use JSON.parse (now it's an object)
                //populateData(response);

                //window.location.replace('success.html');
            } else {
                setLoginErrorMessage("The username or password is incorrect. Please try again.")
            }
        } else {

        }
    } 

}


function login(){
    console.log('hello from login');

    let username = $("#loginDialogUsernameText").val();
    let password = $("#loginDialogPasswordText").val();

    //let loginForFreelancer = $("#loginDialogFreelancerRadio").val();
    //let loginForEmployer = $("#loginDialogEmployerRadio").val();
    //let loginRole = $("input:radio[name ='loginTypeRadioGroup']:checked").val();

    let loginRole = $('#loginDialogDropdown').find(":selected").text().toLowerCase();

    loginWithUsernameAndPassword(username,password,loginRole);
}