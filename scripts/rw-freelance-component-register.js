
const pageList = {
    noContent: 'noFreelancerContent',
    jobContent: 'freelancerJobContent',
    jobDetailsContent : 'jobDetailsContent',
    jobApplication:'applyForJobContent',

    viewAllProfiles: 'profilesListContent',
    editProfile : 'profileViewAndEditContent',
    profileCreated : 'profileCreatedContent',
    profileDeleted : 'profileDeletedContent',
    


    createProfile:'createProfileContent',

    
  };



function registerComponents() {
    $("#navViewJobs").click(function () {
        viewJobs();
      });
      $("#freeNavCreateProfile").click(function () {
        clearCreateProfileForm();
        showCreateProfilePage();
      });
      $("#freeNavListAllProfileLink").click(function () {

        console.log("in click handler for profiles");
        viewListofAllProfiles();
      });
}