function createProfile() {
    showContent(pageList.createProfile);

}

function viewListofAllProfiles() {


    console.log("in viewListofAllProfiles function");

    let contentPageHtml = '';


    $("#profilesListContent").empty();

    function getProfileTemplateCallback(data) {
        console.log("in getProfileTemplateCallback function");

        contentPageHtml = data;

        console.log("data loaded was:" + data);


        for (let i = 0; i < 3; ++i) {

            $("#profilesListContent").append(data);
    
 
    
            $( "#profilesListContent").children().last().find(".profileListEditButton").click(function () {
                        let msg = "profile ";
                        msg += i;
                        msg += " clicked";
                        console.log(msg);
                        //viewJobs();
    
    
                        showContent(pageList.editProfile);
                    });
    
            };
    
        showContent(pageList.viewAllProfiles);


    }

    loadPageAsync("../templates/freelancer-profile-brief.html",getProfileTemplateCallback);
}