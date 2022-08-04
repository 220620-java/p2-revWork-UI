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
    }

    function loadLogoutDialog() {
      loadPageAsync("../templates/freelancer-logout-dialog.html",logoutDialogCallback);
    };


    // Load the edit profile template into the page.

    function loadProfileEditCallback(data) {
        $("#profileViewAndEditContent").html(data);
  
        $("#profileEditBackButton").click(function(){
          showContent(pageList.viewAllProfiles);
        });
      
    }

    loadPageAsync("../templates/freelancer-profile-edit.html",loadProfileEditCallback);


    // Load the create profile template into the page.

    function loadCreateProfileCallback(data) {
      $("#createProfileContent").html(data);

      $("#profileCancelButton").click(function(){
        showContent(pageList.noContent);
      });
    }

    loadPageAsync("../templates/create-profile.html",loadCreateProfileCallback);




    function loadJobDetailsCallback(data) {
      $("#jobDetailsContent").html(data);

      $("#jobDetailsBackButton").click(function(){
        showContent(pageList.jobContent);
      });
    }

    loadPageAsync("../templates/job-details.html",loadJobDetailsCallback);

    // function loadLogoutDialog() {

    //     $.get("../templates/freelancer-logout-dialog.html", function (data) {
    //         let dialogDiv = document.createElement('div');
    //         dialogDiv.innerHTML = data;

    //         $("#dialogContainer").append(dialogDiv);

    //         $("#freelancerLogoutDialog").dialog({
    //             autoOpen: false 
    //         });

    //         $("#logoutButton").click(showLogoutDialog);
    
    //     });

    // }
    


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