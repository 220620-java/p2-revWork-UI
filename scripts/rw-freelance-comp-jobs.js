
function viewJobs() {
    console.log('view jobs clicked');

    showContent(pageList.jobContent);

    $("#freelancerJobContent").empty();


    // 4 steps to making an AJAX call
    // STEP 1: Create an XML Http Request object
    let xhttp = new XMLHttpRequest();

    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;

    // STEP 3: Open the request
    xhttp.open('GET', 'http://127.0.0.1:8080/job' );
    xhttp.setRequestHeader("Content-Type", "application/json");
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
            // Emptying out the div before inserting new data.
            //let dataSection = document.getElementById('data');
            //dataSection.innerHTML = '';

            if (xhttp.status === 200) { // check if it was successful
                let response = xhttp.responseText;
                console.log(response); // before we use JSON.parse (still a string)
                response = JSON.parse(response);

                let len = response.length;
                let mst = "There are " + len + " jobs available";

                console.log(mst); // after we use JSON.parse (now it's an object)

            } else {
                // Ready state is DONE but status code is not "OK"
                console.log("Ajax failed in getjobs"); 
            }
        } else {
            // Ready state is not DONE
            /*
                Can have some sort of "loading" action
            */
        }
        }




    for (let i = 0; i < 3; ++i) {

        $.get("../templates/jobtemplate.html", function (data) {
        $("#freelancerJobContent").append(data);

        // $( "#mainContent .jobListDetailButton:last-child" ).click(function () {
        //         let msg = "detail ";
        //         msg += i;
        //         msg += " clicked";
        //         console.log(msg);
        //         //viewJobs();
        //       });

        $( "#freelancerJobContent").children().last().find(".jobListDetailButton").click(function () {
                    let msg = "detail ";
                    msg += i;
                    msg += " clicked";
                    console.log(msg);
                    //viewJobs();


                    showContent(pageList.jobDetailsContent);
                });

        });

    }
    }
  