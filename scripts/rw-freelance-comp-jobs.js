
function addProfilesToJobApplicationPage(response) {





    //console.log('we have profiles:' + response);

    let profilesObject = JSON.parse(response);

    if ( profilesObject.length == 0 ) {
        $('#freelancerJobApplicationButtonSet').hide();
        $('#freelancerJobApplicationErrorMessage').show();
    }

    let profileSelect = $('#freelancerJobApplicationProfileSelect');

    for ( let profile of profilesObject ) {

        profileSelect.append($('<option>', {
            value: profile["id"],
            text: profile["name"]
        }));
    }


}


function freelancerResetJobApplication() {

    let detailsPage = $("#freelancerJobDetailsPage");
    let jobString = detailsPage.data("mydata");
    let job=JSON.parse(jobString);

    $("#freelancerJobApplicationJobTitle").text(job["name"]);
    $("#freelancerJobApplicationRequiredSkills").text(job["skills"]);
    $("#freelancerJobApplicationJobDescription").text(job["description"]);
    $("#freelancerJobApplicationJobPay").text(job["payrate"]);

    let profileSelect = $('#freelancerJobApplicationProfileSelect');

    profileSelect.empty();



    //<option disabled selected value="1">Select a profile for this application</option>

    profileSelect.append($('<option>', {
        value: 0,
        selected:true,
        disabled : true,
        text: 'Select a profile for this application'
    }));


    getAllFreelancerProfiles(addProfilesToJobApplicationPage);


    

    $("#freelancerJobApplicationCoverLetter").val("");


    

    $('#freelancerJobApplicationApplyButton').prop('disabled', true);
    //getAllFreelancerProfiles(addProfilesToJobApplicationPage);

    $('#freelancerJobApplicationButtonSet').show();
    $('#freelancerJobApplicationErrorMessage').hide();


}


function freelancerValidateJobApplication() {

    let coverLetter = $("#freelancerJobApplicationCoverLetter").val();
    let profileToUse = $("#freelancerJobApplicationProfileSelect").val();

    if ( coverLetter != "" && profileToUse != null) {
        $('#freelancerJobApplicationApplyButton').prop('disabled', false);
    }
    else {
        $('#freelancerJobApplicationApplyButton').prop('disabled', true);
    }

    //let optionText = $("#freelancerJobApplicationProfileSelect option:selected").text();


    //console.log("validating job application" + coverLetter + profileToUse+optionText);
}

function freelancerSubmitJobApplication() {
    console.log("submitting job application");

    let detailsPage = $("#freelancerJobDetailsPage");
    let jobString = detailsPage.data("mydata");
    let job=JSON.parse(jobString);

    //$("#freelancerJobApplicationJobTitle").text(job["name"]);
    let optionText = $("#freelancerJobApplicationProfileSelect option:selected").text();
    let profileToUse = $("#freelancerJobApplicationProfileSelect").val();
    let coverLetter = $("#freelancerJobApplicationCoverLetter").val();

    // console.log("portfolioid:" +  profileToUse);
    // console.log("name:" +  optionText);

    // console.log("job id:" +  job["id"]);

    let applicaiontJson = 
    {

        "jobid":{
            "id":job["id"]
        },
        "portfolioid":{
            "id":profileToUse
        },
        "coverletter":coverLetter,
        "name":optionText
    };

    let myJSON = JSON.stringify(applicaiontJson);
    let jwtToken = getCookie('jwt');

   // 4 steps to making an AJAX call
    // STEP 1: Create an XML Http Request object
    let xhttp = new XMLHttpRequest();

    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;
    //xhttp.addEventListener('readystatechange', receiveData);

    // STEP 3: Open the request
    let url = restURL;
    url += '/freelancer/submit_app';
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
                console.log("profile created");

                showContent(pageList.jonApplicationSubmitted);

            } else {
                console.log("profile creation failed");
            }
        } else {

        }
    } 

}


function freelancerJobDetailApplyButtion(event) {
    freelancerResetJobApplication();
    showContent(pageList.jobApplication);
}


function configurejobDetail(nodeObject, jobObject) {
    nodeObject.find("#jobDetailsFirstPar").text(jobObject['name']);
    
}

// function configureJobDiv(nodeObject, jobObject) {
//     nodeObject.find(".jobListFirstPar").text(jobObject['name']);

// }

function showJobDetailPage(event) {
    // let msg = "detail ";
    // msg += job['name'];
    // msg += " clicked";
    // console.log(msg);
    // //viewJobs();





    // let jelem = $( event.target );
    // console.log("stored data:" + jelem.data("mydata"));

    // let reconstructedJob = JSON.parse(jelem.data("mydata"));
    
    // let applyContainer = $("#jobApplicationContainer");
    // applyContainer.data("mydata",jelem.data("mydata"));





    // configurejobDetail(detailNode,reconstructedJob);

    let jelem = $( event.target );
    let pageData = jelem.data("mydata");
    let job = JSON.parse(pageData);

    let detailsPage = $("#freelancerJobDetailsPage");
    detailsPage.data("mydata",pageData);

    $("#freelancerJobDetailsJobTitle").text(job["name"]);
    $("#freelancerJobDetailsRequiredSkills").text(job["skills"]);
    $("#freelancerJobDetailsJobDescription").text(job["description"]);
    $("#freelancerJobDetailsJobPay").text(job["payrate"]);

    showContent(pageList.jobDetailsContent);
}


function loadJobsIntoPage(response) {

    response = JSON.parse(response);

    let len = response.length;
    let mst = "There are " + len + " jobs available";

    loadPageAsync("../templates/jobtemplate.html", lodeJobTemplateCallback);

    let i = 1;
    function lodeJobTemplateCallback(data) {
        $("#employerJobListDiv").empty();

        for ( job of response ) {



          for(let key in job) {
            console.log('adding' + key + ' -> ' + job[key]);
          }

          $("#freelancerJobContent").append(data);

          let addedNode = $( "#freelancerJobContent").children().last();


          i = (i + 1) % 2;

          if ( i ) {
              $(addedNode).addClass("profileListOdd");
          }
          else {
              $(addedNode).addClass("profileListEven");
          }

          addedNode.find(".freelancerJobListJobName").text(job["name"]);
          addedNode.find(".freelancerJobListJobSkills").text(job["skills"]);
          let detailButton = addedNode.find(".freelancerJobListDetailsButton");

          detailButton.data('mydata',JSON.stringify(job));
          detailButton.click(showJobDetailPage);
        }

        showContent(pageList.jobContent);
    }
    



    console.log(mst); // after we use JSON.parse (now it's an object)

    

}



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

    let url = restURL;
    url += '/job';

    xhttp.open('GET', url );
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
 
                loadJobsIntoPage(response);

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





    }
  