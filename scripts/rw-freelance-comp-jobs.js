






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
  