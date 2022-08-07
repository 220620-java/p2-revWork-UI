
function clearCreateJobForm() {
    $("#employerCreateJobTitleText").val("");
    $("#employerCreateJobRequiredSkills").val("");
    $("#employerCreateJobDescriptionText").val("");
    $("#employerCreatePayrateText").val("");

    $('#employerCreateJobButton').prop('disabled', true);
}


function validateAddJobForm(){
    console.log("valiating add job form");

    let jobTitle = $("#employerCreateJobTitleText").val();
    let regSkills = $("#employerCreateJobRequiredSkills").val();
    let jobDescription = $("#employerCreateJobDescriptionText").val();
    let payRate = $("#employerCreatePayrateText").val();

    let button = $('#employerCreateJobButton');

    if ( jobTitle != "" && regSkills != "" && jobDescription != "" && payRate != "") {
        button.prop('disabled', false);
    }
    else {
        button.prop('disabled', true);
    }
}


function submitNewJob(){
    console.log("submitting new job");

    let jobTitle = $("#employerCreateJobTitleText").val();
    let regSkills = $("#employerCreateJobRequiredSkills").val();
    let jobDescription = $("#employerCreateJobDescriptionText").val();
    let payRate = $("#employerCreatePayrateText").val();

    // @JsonProperty("name")
    // private String name = null;
  
    // @JsonProperty("skills")
    // private String skills = null;
  
    // @JsonProperty("description")
    // private String description = null;
  
    // @JsonProperty("payrate")
    // private String payrate = null;

    //private Employer employerid = null;

    // employerid looks like:
    // @JsonProperty("id")
    // private Integer id = null;
  
    // @JsonProperty("name")
    // private String name = null;
  
    // @JsonProperty("email")
    // private String email = null;
  
    // @JsonProperty("username")
    // private String username = null;
  
    // @JsonProperty("password")
    // private String password = null;


    let jwtToken = getCookie('jwt');

    let jwtClaims = parseJwt(jwtToken);

    let id = -1;

    if ('id' in jwtClaims) {
        id = jwtClaims['id'];

        console.log('id of emplyer is: ' + id);
    }
    else {
        console.log('Unable to get id from the jwt');
        return;
    }



    





    let obj = {"name":jobTitle,"skills":regSkills,"description":jobDescription,"payrate":payRate, "employerid":{"id":id}};

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
    url += '/employer/add_job';
    xhttp.open('POST', url );
    xhttp.setRequestHeader("Content-Type", "application/json");
    let bearerToken = "Bearer " + jwtToken;
    xhttp.setRequestHeader("Authorization", bearerToken);

    
    // STEP 4: Send the request
    //xhttp.send();
    xhttp.send(myJSON);
    // xhttp.send(JSON.stringify(myObj));
    // xhttp.send('{"username":"", "password":""}');

    // This needs to be an inner function so that it has closure to xhttp.
    function receiveData() {

        if (xhttp.readyState === 4) { 


            console.log("status is:" + xhttp.status );


            if ( 200 <= xhttp.status && xhttp.status < 300 ) { // check if it was successful
                // Ready state is DONE, HTTP status code is "OK"
                // responseText property is the response body as a string
                console.log("job created");

                showContent(employerPageList.jobCreated);

            } else {
                console.log("job creation failed");
            }
        } else {

        }
    } 
}


