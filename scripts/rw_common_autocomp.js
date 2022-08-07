let autoCompQueryActive = false;

function universityAutoComp() {

    console.log("university auto comp in progress");

    if (autoCompQueryActive) {
        return;
    }

    const textbox = document.getElementById('freelancerCreateProfileCollegeText');
    const queryString = textbox.value;

    if (queryString.length <= 3) {
        return;
    }

    autoCompQueryActive = true;

    // 4 steps to making an AJAX call
    // STEP 1: Create an XML Http Request object
    let xhttp = new XMLHttpRequest();

    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;

    let url = universityApiURL;
    url += 'search?name=';
    url += encodeURIComponent(queryString);
    url += '&alpha_two_code=US';


    console.log(url);


    // STEP 3: Open the request
    xhttp.open('GET', url);

    // STEP 4: Send the request
    xhttp.send();

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

            autoCompQueryActive = false;

            if (xhttp.status === 200) { // check if it was successful
                // Ready state is DONE, HTTP status code is "OK"
                // responseText property is the response body as a string
                let response = xhttp.responseText;
                response = JSON.parse(response);

                let outArray = [];

                for (let obj of response) {
                    outArray.push(obj.name);

                }

                //outArray = ['a','b','c'];

                $("#freelancerCreateProfileCollegeText").autocomplete({
                    source: outArray
                }, {});

            } else {
                // Ready state is DONE but status code is not "OK"
            }
        } else {
            // Ready state is not DONE
            /*
                Can have some sort of "loading" action
            */
        }
    }


}

