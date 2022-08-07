$(function () {

  // The nesting needed in these loads can get a little deep, so I'll 
  // pull some functions out to improve the readability.
  function showLogoutDialog() {
    if ($('#freelancerLogoutDialog').dialog('isOpen')) {
      $("#freelancerLogoutDialog").dialog("close");
    }
    else {
      $(".ui-dialog-titlebar").hide();

      $("#freelancerLogoutDialog").dialog("open");

      $("#freelancerLogoutDialog").dialog("widget").position({
        my: "right top",
        at: "right bottom",
        of: "#logoutButton"
      });
    }
  }

  // Load the logout dialog into the page.
  // Since this is done async, we need first write the function that
  // will place the html content in the page when it is available.

  function logoutDialogCallback(data) {
    let dialogDiv = document.createElement('div');
    dialogDiv.innerHTML = data;

    $("#dialogContainer").append(dialogDiv);

    $("#freelancerLogoutDialog").dialog({
        autoOpen: false 
    });

    $("#logoutButton").click(showLogoutDialog);
    $("#logoutDialogLogoutButton").click(logout);
  }

  function loadLogoutDialog() {
    loadPageAsync("../templates/freelancer-logout-dialog.html",logoutDialogCallback);
  };


  // Load the edit profile template into the page.
  loadPageAsync("../templates/freelancer-profile-edit.html",loadProfileEditCallback);

  function loadProfileEditCallback(data) {
    $("#profileViewAndEditContent").html(data);

    $("#profileEditBackButton").click(function(){
      showContent(pageList.viewAllProfiles);
    });

    $("#freelancerEditProfileCancelButton").click(cancelProfileEdit);
    $("#freelancerEditProfileUpdateButton").click(updateFreelancerProfile);
    $("#freelancerEditProfileDeleteButton").click(deleteFreelancerProfile);
  }


  // Load the create profile template into the page.

  function loadCreateProfileCallback(data) {
    $("#createProfileContent").html(data);

    $("#profileCancelButton").click(function(){
      showContent(pageList.noContent);
    });

    $("#createProfileContent").on("input",validateAddProfileForm);
    $("#freelancerCreateProfileCreateButton").click(submitNewProfile);
    $("#freelancerCreateProfileCollegeText").on("input",universityAutoComp);
    
    

    // $("#employerCreateJobDiv").on("input",validateAddJobForm);

 
    

    // $("#employerCreateJobButton").click(submitNewJob);

    // $("#employerCreateJobCancelButton").click(function () {
    //   showContent(employerPageList.default);
    // });


  }

  loadPageAsync("../templates/create-profile.html",loadCreateProfileCallback);


  // load the job application templage into the page.
  loadPageAsync("../templates/jobapplication.html",loadJobApplicationCallback);

  function loadJobApplicationCallback(data) {
    $("#applyForJobContent").html(data);

    $("#applyForJobContent").on("input",freelancerValidateJobApplication);

    $("#freelancerJobApplicationBackButton").click(function(){
      showContent(pageList.jobContent);
    });

    $("#freelancerJobApplicationApplyButton").click(freelancerSubmitJobApplication);


  }

  // Load the job details stuff.

  // function loadJobApplicationDataIntoForm(){
  //   let applyContainer = $("#jobApplicationContainer");
  //   let jobData = applyContainer.data("mydata");

  //   let jobObject = JSON.parse(jobData);

  //   // <p>Employer Name: <span id="jobApplicationEmplyerName"></span></p>
  //   // <p>Job Title: <span id="jobApplicationJobTitle"></span></p>
  //   // <p>Required skills: <span id="jobApplicationRequiredSkills"></span></p>
  //   // <p>Description: <span id="jobApplicationJobDescription"></span></p>
  //   // <p>Pay Rate: <span id="jobApplicationPayRate"></span></p>

  //   //{"id":null,"name":"a","email":"b","username":"c","password":"d"},
  //   //"name":"job","skills":"req skills","description":"desc","payrate":"12.2","istaken":null}

  //   $("#jobApplicationEmplyerName").text(jobObject["employerid"]["name"]);
  //   $("#jobApplicationJobTitle").text(jobObject["name"]);
  //   $("#jobApplicationRequiredSkills").text(jobObject["skills"]);
  //   $("#jobApplicationJobDescription").text(jobObject["description"]);
  //   $("#jobApplicationPayRate").text(jobObject["payrate"]);

  //   console.log(jobData);
  // }


  // Load the Job Details Page
  loadPageAsync("../templates/job-details.html",loadJobDetailsCallback);

  function loadJobDetailsCallback(data) {
    $("#jobDetailsContent").html(data);

    $("#freelancerJobDetailsBackButton").click(function(){
      showContent(pageList.jobContent);
    });

    $("#freelancerJobDetailsApplyButton").click(function(){
      freelancerJobDetailApplyButtion();
      //loadJobApplicationDataIntoForm();

    });
  }




    $.get("../templates/freelancer-header.html", function (data) {
      $("#freelancerPageheader").html(data);
      loadLogoutDialog();



      $.get("../templates/freelancer-nav.html", function (data) {
        $("#freelancerPageNavigation").html(data);
        registerComponents();

    });


  });

  //   $("#navigation").load("nav.html", function () {

  //     $(".navViewJobs").click(function () {
  //       //console.log("link clicked");
  //       viewJobs();
  //     });
  //   });
  // });

  // $(function () {
  //   $("#header").load("header.html", function () {

  //     $("#logoutButton").click(function () {


  //       if ($('#dialog-4').dialog('isOpen')) {
  //         $("#dialog-4").dialog("close");
  //       }
  //       else {
  //         $(".ui-dialog-titlebar").hide();

  //         $("#dialog-4").dialog("open");

  //         $("#dialog-4").dialog("widget").position({
  //           my: "right top",
  //           at: "right bottom",
  //           of: "#logoutButton"
  //         });
  //       }
  //     });


  //   });









  });