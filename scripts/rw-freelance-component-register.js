
const pageList = {
    noContent: 'noFreelancerContent',
    jobContent: 'freelancerJobContent',
    jobDetailsContent : 'jobDetailsContent',

    viewAllProfiles: 'profilesListContent',
    editProfile : 'profileViewAndEditContent',

    createProfile:'createProfileContent',

    jobApplication:'applyForJobContent'
  };



function registerComponents() {
    $("#navViewJobs").click(function () {
        viewJobs();
      });
      $("#freeNavCreateProfile").click(function () {
        createProfile();
      });
      $("#freeNavListAllProfileLink").click(function () {

        console.log("in click handler for profiles");
        viewListofAllProfiles();
      });
}