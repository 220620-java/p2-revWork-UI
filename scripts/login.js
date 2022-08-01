function login(){
    console.log('hello from login');

    let userNameElem = document.getElementById("userNameElem");
    let passwordElem = document.getElementById("password");

    console.log('username: ' + userNameElem.value);
    console.log('password: ' + passwordElem.value);

    let obj = {"username":userNameElem.value,"password":passwordElem.value};

    const myJSON = JSON.stringify(obj);
    console.log(myJSON);

   // 4 steps to making an AJAX call
    // STEP 1: Create an XML Http Request object
    let xhttp = new XMLHttpRequest();

    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;
    //xhttp.addEventListener('readystatechange', receiveData);

    // STEP 3: Open the request
    xhttp.open('POST', 'http://127.0.0.1:8080/login' );
    xhttp.setRequestHeader("Content-Type", "application/json");
    // STEP 4: Send the request
    //xhttp.send();
    xhttp.send(myJSON);
    // xhttp.send(JSON.stringify(myObj));
    // xhttp.send('{"username":"", "password":""}');

    // This needs to be an inner function so that it has closure to xhttp.
    function receiveData() {
        /*
            Different ready states of an XMLHttpRequest object
            0: UNSENT
            1: OPENED
            2: HEADERS RECEIVED
            3: LOADING
            4: DONE
        */
        if (xhttp.readyState === 4) { // once we get a response
            // Emptying out the div before inserting new data.
            //let dataSection = document.getElementById('data');
            //dataSection.innerHTML = '';

            if (xhttp.status === 200) { // check if it was successful
                // Ready state is DONE, HTTP status code is "OK"
                // responseText property is the response body as a string
                let response = xhttp.responseText;
                console.log(response); // before we use JSON.parse (still a string)
                //response = JSON.parse(response);
                console.log(response); // after we use JSON.parse (now it's an object)
                populateData(response);

                window.location.replace('success.html');
            } else {
                // Ready state is DONE but status code is not "OK"
                dataSection.innerHTML = 'It Got Away!';
            }
        } else {
            // Ready state is not DONE
            /*
                Can have some sort of "loading" action
            */
        }
    }
}