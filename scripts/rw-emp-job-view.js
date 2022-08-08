



function getAppTemplateAndThenLoadApps(response) {

  $("employerJobApplicationListContainter").empty();
  showContent(employerPageList.viewJobApplications);

  let AppsArray = JSON.parse(response);


  function loadAppsIntoPage(componentHtml) {

    console.log(componentHtml);

    for ( app of AppsArray ) {
      $("#employerJobApplicationListContainter").append(componentHtml);
      let addedNode = $( "#employerJobApplicationListContainter").children().last();

 

      let button = addedNode.find(".empjobListViewApplicationsButton");

      let appString = JSON.stringify(app);
      button.data("mydata",appString);

      button.click(employerViewApplicationDetail);



    }

    
  }

  loadPageAsync('../templates/emp-job-application.html', loadAppsIntoPage);
}


// 


function employerJobApplicationBack(event) {
  showContent(employerPageList.viewJobApplications);
}

function employerJobApplicationAccept(event) {

  let page = $("#employerApplicationDetailDiv");

  console.log("job accepted");

  

  let appString = page.data("mydata");
  let app = JSON.parse(appString);

  let job = app["jobid"];
  let jobString = JSON.stringify(job);

  //console.log(jobString);

  deleteJobHelper(jobString, function(){  
    showContent(employerPageList.applicationAccepted);
  });

}

function employerViewApplicationDetail(event) {


  showContent(employerPageList.viewJobApplicationDetails);

  let jelem = $( event.target );
  let pageData = jelem.data("mydata");
  let app = JSON.parse(pageData);

  let page = $("#employerApplicationDetailDiv");

  page.data("mydata",pageData);


  console.log(pageData);

  // {
  //   "jobid": {
  //     "id": 1,
  //     "employerid": {
  //       "id": 1,
  //       "name": "a",
  //       "email": "b",
  //       "username": "c",
  //       "password": "d"
  //     },
  //     "name": "job",
  //     "skills": "req skills",
  //     "description": "desc",
  //     "payrate": "12.2",
  //     "istaken": null
  //   },
  //   "portfolioid": {
  //     "id": 1,
  //     "name": "nother name",
  //     "email": "c@example.com",
  //     "skills": "c@example.com",
  //     "college": "small college",
  //     "freelancerid": {
  //       "id": 1,
  //       "name": "Peter Sellers",
  //       "about": "Famous Actor",
  //       "experiencelevel": "high",
  //       "email": "petersellers@example.com",
  //       "username": "un",
  //       "password": "123456"
  //     }
  //   },
  //   "coverletter": "sl",
  //   "name": "sl",
  //   "id": 6
  // }

  let job = app["jobid"];
  let port = app["portfolioid"];
  let freel = port["freelancerid"];

  page.find(".freelancerJobApplicationJobTitle").text(job["name"]);
  page.find(".freelancerJobApplicationJobDescription").text(job["description"]);
  page.find(".freelancerJobApplicationRequiredSkills").text(job["skills"]);
  page.find(".freelancerJobApplicationJobPay").text(job["payrate"]);

  page.find(".employerJobAppDetailFreelancerName").text(freel["name"]);
  page.find(".employerJobAppDetailFreelancerAbout").text(freel["about"]);
  page.find(".employerJobAppDetailExperienceLevel").text(freel["experiencelevel"]);
  page.find(".employerJobAppDetailProfileName").text(port["name"]);
  page.find(".employerJobAppDetailSkills").text(port["email"]);
  page.find(".employerJobAppDetailCoverLetter").text(app["coverletter"]);
}


employerJobAppDetailProfileName


function loadJobApplicationsIntoPage(contentHtml,applist) {

  console.log()

  $("#employerJobApplicationListDiv").empty();
  showContent(employerPageList.viewJobApplications);

  let apps = JSON.parse(applist);

  console.log(apps.length + "total apps");

  console.log(applist);

  let i = 0;

  for ( let app of apps ) {
      $("#employerJobApplicationListDiv").append(contentHtml);

      let addedNode = $( "#employerJobApplicationListDiv").children().last();

      //let addedNode = $( "#profilesListContent:nth-last-child(2)");

      i = (i + 1) % 2;

      if ( i ) {
          $(addedNode).addClass("profileListOdd");
      }
      else {
          $(addedNode).addClass("profileListEven");
      }

      let button = addedNode.find(".freelancerJobListDetailsButton");

      let port = app["portfolioid"];
      let freel = port["freelancerid"];

      addedNode.find(".freelancerJobListJobName").text(freel["name"]);
      addedNode.find(".freelancerJobListJobSkills").text(port["email"]);
      button.on("click",employerViewApplicationDetail);
      button.data("mydata",JSON.stringify(app));
  }
}


function getApplicationTemplateAndThenLoadApps(applist) {

  loadPageAsync('../templates/emp-job-application.html', loadJobApplicationTemplateCallback);

  function loadJobApplicationTemplateCallback(contentHtml) {
    loadJobApplicationsIntoPage(contentHtml,applist);
  }
}





function viewEmployerJobApplications(event) {
  console.log("view applications");

  let jwtToken = getCookie('jwt');

  let detailsPage = $("#employerJobDetailsDiv");
  let jobString = detailsPage.data("mydata");


  console.log(jobString);

  // 4 steps to making an AJAX call
  // STEP 1: Create an XML Http Request object
  let xhttp = new XMLHttpRequest();

  // STEP 2: Set a callback function for the readystatechange event
  xhttp.onreadystatechange = receiveData;
  //xhttp.addEventListener('readystatechange', receiveData);

  // STEP 3: Open the request
  let url = restURL;
  url += '/employer/get_applicants';
  xhttp.open('POST', url );
  let bearerToken = "Bearer " + jwtToken;
  xhttp.setRequestHeader("Authorization", bearerToken);
  xhttp.setRequestHeader("Content-Type", "application/json");
  
  // STEP 4: Send the request
  xhttp.send(jobString);

  // This needs to be an inner function so that it has closure to xhttp.
  function receiveData() {

      if (xhttp.readyState === 4) { 

          // This endpoint returns 410 when the item is deleted
          if ( 200 <= xhttp.status && xhttp.status < 300 ) { 
              let response = xhttp.responseText;
              console.log("applications retrieved");
              console.log(response);

              getApplicationTemplateAndThenLoadApps(response);

              //loadEmployerJobsIntoPage(componentHtml,response);
              //showContent(employerPageList.jobDeleted);

          } else {
              console.log("profile deleteion failed. status: " + xhttp.status );
          }
      } 
  } 



}

 
function deleteJobHelper(jobString, callback) {

  let jwtToken = getCookie('jwt');

  
  

  // 4 steps to making an AJAX call
  // STEP 1: Create an XML Http Request object
  let xhttp = new XMLHttpRequest();

  // STEP 2: Set a callback function for the readystatechange event
  xhttp.onreadystatechange = receiveData;
  //xhttp.addEventListener('readystatechange', receiveData);

  // STEP 3: Open the request
  let url = restURL;
  url += '/employer/delete_job';
  xhttp.open('DELETE', url );
  let bearerToken = "Bearer " + jwtToken;
  xhttp.setRequestHeader("Authorization", bearerToken);
  xhttp.setRequestHeader("Content-Type", "application/json");
  
  // STEP 4: Send the request
  xhttp.send(jobString);

  // This needs to be an inner function so that it has closure to xhttp.
  function receiveData() {

      if (xhttp.readyState === 4) { 

          // This endpoint returns 410 when the item is deleted
          if ( xhttp.status == 410 ) { 

            callback();


          } else {
              console.log("profile deleteion failed. status: " + xhttp.status );
          }
      } 
  } 
} 


function employerDeleteJob() {
  console.log("delete job");
  let detailsPage = $("#employerJobDetailsDiv");
  let jobString = detailsPage.data("mydata");

  deleteJobHelper(jobString,function(){

              //let response = xhttp.responseText;
              console.log("jobs retrieved");
              //loadEmployerJobsIntoPage(componentHtml,response);
              showContent(employerPageList.jobDeleted);
  });



}

function employerEditJob() {
  console.log("edit job");
}







// function configureJobNode(node, jobObject) {
//     $(node).find(".jobListFirstPar").text(jobObject["title"]);
// }

function employerViewJobDetails(event) {
  let jelem = $( event.target );
  let pageData = jelem.data("mydata");
  let job = JSON.parse(pageData);

  let detailsPage = $("#employerJobDetailsDiv");
  detailsPage.data("mydata",pageData);

  $("#freelancerJobDetailsJobTitle").text(job["name"]);
  $("#freelancerJobDetailsRequiredSkills").text(job["skills"]);
  $("#freelancerJobDetailsJobDescription").text(job["description"]);
  $("#freelancerJobDetailsJobPay").text(job["payrate"]);

  showContent(employerPageList.viewJobDetails);
}



function loadEmployerJobsIntoPage(contentHtml,joblist) {

  let jobs = JSON.parse(joblist);

  console.log(jobs.length + "total jobs");

  let i = 0;

  for ( let job of jobs ) {
      $("#employerJobListDiv").append(contentHtml);

      let addedNode = $( "#employerJobListDiv").children().last();

      //let addedNode = $( "#profilesListContent:nth-last-child(2)");

      i = (i + 1) % 2;

      if ( i ) {
          $(addedNode).addClass("profileListOdd");
      }
      else {
          $(addedNode).addClass("profileListEven");
      }

      let button = addedNode.find(".freelancerJobListDetailsButton");

      addedNode.find(".freelancerJobListJobName").text(job["name"]);
      addedNode.find(".freelancerJobListJobSkills").text(job["skills"]);
      button.on("click",employerViewJobDetails);
      button.data("mydata",JSON.stringify(job));
  }



  // console.log(componentHtml);

  // for ( job of response ) {
  //   $("#employerJobListDiv").append(componentHtml);

  //   let addedNode = $( "#employerJobListDiv").children().last();
  //   configureJobNode(addedNode,job);

  //   let obj1 = {"name":"app1"};
  //   let obj2 = {"name":"app2"};
  //   let obj3 = {"name":"app3"};
  
  //   let appSet = [obj1,obj2,obj3];
  //   let appsString = JSON.stringify(appSet);

  //   let button = addedNode.find(".empjobListViewApplicationsButton");
  //   button.data("mydata",appsString);

  //   button.click(viewEmployerJobApplications);


  // }
}



function getjobTemplateAndThenLoadJobs(response) {

  console.log("getting jobs")

  loadPageAsync('../templates/emp-job-brief.html', getEmployerJobnList);

  function getEmployerJobnList(componentHtml) {


    console.log('view jobs clicked');

    

    $("#employerJobListDiv").empty();
    showContent(employerPageList.viewJobs);


    let jwtToken = getCookie('jwt');

    let id = getIdFromJwt(jwtToken);

    if ( id == -1 ) {
        console.log("invalid jwt");
        return;
    }

    // 4 steps to making an AJAX call
    // STEP 1: Create an XML Http Request object
    let xhttp = new XMLHttpRequest();

    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;
    //xhttp.addEventListener('readystatechange', receiveData);

    // STEP 3: Open the request
    let url = restURL;
    url += '/employer/';
    url += id;
    url += '/get_jobs';
    xhttp.open('GET', url );
    let bearerToken = "Bearer " + jwtToken;
    xhttp.setRequestHeader("Authorization", bearerToken);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    // STEP 4: Send the request
    xhttp.send();

    // This needs to be an inner function so that it has closure to xhttp.
    function receiveData() {

        if (xhttp.readyState === 4) { 


            console.log("status is:" + xhttp.status );



            if ( 200 <= xhttp.status && xhttp.status < 300 ) { // check if it was successful
                // Ready state is DONE, HTTP status code is "OK"
                // responseText property is the response body as a string

                let response = xhttp.responseText;
                console.log("jobs retrieved");
                loadEmployerJobsIntoPage(componentHtml,response);
                

            } else {
                console.log("profile retieval failed");
            }
        } 
    } 
  }
}


function viewEmployerJobs() {

  let obj1 = {"title":"job1"};
  let obj2 = {"title":"job2"};
  let obj3 = {"title":"job3"};

  let response = [obj1,obj2,obj3];

  $("#employerJobListDiv").empty();

  getjobTemplateAndThenLoadJobs(response);
}