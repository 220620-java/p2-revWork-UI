
const pageList = {
    noContent: 'noFreelancerContent',
    jobContent: 'freelancerJobContent',
    jobDetailsContent : 'jobDetailsContent',
    createProfile:'createProfileContent'
  };

function showContent(content) {

    $( '#mainContent' ).children().each(function( i ){
        console.log($(this).attr("id"));

        if ( $(this).attr("id") == content ){
            $(this).show();
        }
        else {
            $(this).hide();
        }

    });
}

function registerComponents() {
    $("#navViewJobs").click(function () {
        viewJobs();
      });
      $("#freeNavCreateProfile").click(function () {
        createProfile();
      });
      
}