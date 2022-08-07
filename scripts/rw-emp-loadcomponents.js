$(function () {

  // load the logout dialog
  function loadLogoutDialogCallback(conpHtml) {

    // First load the dialog template into the page DOM.
    let dialogDiv = $.parseHTML(conpHtml);
    $("#dialogContainer").append(dialogDiv);

    // Next have jquery ui turn the the loaded content into a dialog.
    $("#employerLogoutDialog").dialog({
        autoOpen: false 
    });
  }

  loadPageAsync('../templates/emp-logout-dialog.html',loadLogoutDialogCallback);

  // Load the header
  function showLogoutDialog() {
    if ($('#employerLogoutDialog').dialog('isOpen')) {
      $("#employerLogoutDialog").dialog("close");
    }
    else {
      $("#employerLogoutDialog").dialog("open");
      // We're using the dialog more as a popup than as a dialog, so
      // hide the titlebar.
      $(".ui-dialog-titlebar").hide();

      $("#employerLogoutDialog").dialog("widget").position({
        my: "right top",
        at: "right bottom",
        of: "#logoutButton"
      });


    }
  }

  function loadHeaderCallback(conpHtml) {
    $("#employerPageheader").html(conpHtml);

    $("#logoutButton").click(showLogoutDialog);
    $("#employerHeaderLogoutButton").click(logout);
    
  }

  loadPageAsync('../templates/emp-header.html', loadHeaderCallback);

  // Load the nav bar.
  function loadNavBarCallback(componentHtml) {
    $("#employerPageNavigation").html(componentHtml);

    $("#empNavCreateJob").click(function () {
      clearCreateJobForm();
      showContent(employerPageList.createJob);
    });

    $("#empNavViewAllOpenJobs").click(function () {
      viewEmployerJobs();
      showContent(employerPageList.viewJobs);
    });
    // $("#freeNavViewAcceptedJobs").click(function () {
    // }

  }

  loadPageAsync('../templates/emp-nav.html', loadNavBarCallback);

  // Load the default content.
  function loadDefaultContentCallback(componentHtml) {
    $("#employerDefaultContent").html(componentHtml);
  }

  loadPageAsync('../templates/emp-default-content.html', loadDefaultContentCallback);

  // Load the create job template.
  function loadCreateJobCallback(componentHtml) {
    $("#employerCreateJobDiv").html(componentHtml);

    $("#employerCreateJobDiv").on("input",validateAddJobForm);

 
    

    $("#employerCreateJobButton").click(submitNewJob);

    $("#employerCreateJobCancelButton").click(function () {
      showContent(employerPageList.default);
    });

  }

  loadPageAsync('../templates/emp-create-job.html', loadCreateJobCallback);


  // Load the Job Application list template
  function loadJobApplicationListCallback(componentHtml) {
    $("#employerJobApplicationListDiv").html(componentHtml);
  }

  loadPageAsync('../templates/emp-job-applicationslist.html', loadJobApplicationListCallback);


  // Load the Job Application Details Page
  function loadJobApplicationDetailsCallback(componentHtml) {
    $("#employerApplicationDetailDiv").html(componentHtml);

    $("#empJobAppAcceptButton").click(employerJobApplicationAccept);

    $("#empJobAppBackButton").click(employerJobApplicationBack);
  }

  loadPageAsync('../templates/emp-job-applicationdetails.html', loadJobApplicationDetailsCallback);


      //<div class="initiallHidden" id="employerJobApplicationListDiv"></div>
      //<div class="initiallHidden" id="employerApplicationDetailDiv"></div>

});