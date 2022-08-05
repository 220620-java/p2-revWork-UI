

function employerJobApplicationBack(event) {
  showContent(employerPageList.viewJobApplications);
}


function employerJobApplicationAccept(event) {
  console.log("job accepted");
}

function employerViewApplicationDetail(event) {
  showContent(employerPageList.viewJobApplicationDetails);
}


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



function viewEmployerJobApplications(event) {
  console.log("view application");

  let jelem = $( event.target );
  //console.log("stored data:" + jelem.data("mydata"));


  //let reconstructedApps = JSON.parse(jelem.data("mydata"));

  let appsString = jelem.data("mydata");

  getAppTemplateAndThenLoadApps(appsString);

}

 


function configureJobNode(node, jobObject) {
    $(node).find(".jobListFirstPar").text(jobObject["title"]);
}


function getjobTemplateAndThenLoadJobs(response) {


  function loadJobsIntoPage(componentHtml) {

    console.log(componentHtml);

    for ( job of response ) {
      $("#employerJobListDiv").append(componentHtml);

      let addedNode = $( "#employerJobListDiv").children().last();
      configureJobNode(addedNode,job);

      let obj1 = {"name":"app1"};
      let obj2 = {"name":"app2"};
      let obj3 = {"name":"app3"};
    
      let appSet = [obj1,obj2,obj3];
      let appsString = JSON.stringify(appSet);

      let button = addedNode.find(".empjobListViewApplicationsButton");
      button.data("mydata",appsString);

      button.click(viewEmployerJobApplications);


    }

    
  }

  loadPageAsync('../templates/emp-job-brief.html', loadJobsIntoPage);
}


function viewEmployerJobs() {

  let obj1 = {"title":"job1"};
  let obj2 = {"title":"job2"};
  let obj3 = {"title":"job3"};

  let response = [obj1,obj2,obj3];


  getjobTemplateAndThenLoadJobs(response);
}