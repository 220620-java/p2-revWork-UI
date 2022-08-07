function showCreateProfilePage() {
    showContent(pageList.createProfile);
}

function cancelProfileEdit() {
    showContent(pageList.viewAllProfiles);
}

function buildStringifiedProfileObject() {
    let editPage = $("#profileViewAndEditContent");
    let profileData = editPage.data("mydata");

    let profileObject = JSON.parse(profileData);


    let jwtToken = getCookie('jwt');

    let freelancerid = getIdFromJwt(jwtToken);

    if ( freelancerid == -1 ) {
        console.log("invalid jwt");
        return;
    }

    let profilename = profileObject["name"];
    
    // Use the updated value NOT the current one:
    let skills = $("#freelancerEditProfileSkillsText").val();
    let collegename = profileObject["college"];
    let id = profileObject["id"];

    let obj = {"id":id, "name":profilename,"email":skills,
               "college":collegename,
               "freelancerid":{"id":freelancerid}};

    return JSON.stringify(obj);
    //console.log(myJSON);
}

function updateFreelancerProfile() {
    let jwtToken = getCookie('jwt');
    let myJSON = buildStringifiedProfileObject()

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;

    let url = restURL + '/freelancer/edit_profile';
    xhttp.open('PUT', url );
    let bearerToken = "Bearer " + jwtToken;
    xhttp.setRequestHeader("Authorization", bearerToken);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send(myJSON);

    function receiveData() {

        if ( 200 <= xhttp.status && xhttp.status < 300 ) { 

            console.log('update status:' + xhttp.status);

            if (  xhttp.status == 410 ) { 
                showContent(pageList.profileDeleted);
            } else {
                console.log("delete failed");
            }
        }
    } 
}

function deleteFreelancerProfile() {

    let jwtToken = getCookie('jwt');
    let myJSON = buildStringifiedProfileObject()

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = receiveData;

    let url = restURL + '/freelancer/delete_profile';
    xhttp.open('DELETE', url );
    let bearerToken = "Bearer " + jwtToken;
    xhttp.setRequestHeader("Authorization", bearerToken);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send(myJSON);

    function receiveData() {

        if (xhttp.readyState === 4) { 
            // This call returns 410 Gone when the item is deleted
            if (  xhttp.status == 410 ) { 
                showContent(pageList.profileDeleted);
            } else {
                console.log("delete failed");
            }
        }
    } 
}


function profiledListViewDetails(event) {
    let jelem = $( event.target );
    let profileString = jelem.data("mydata");

    let editPage = $("#profileViewAndEditContent");
    editPage.data("mydata",profileString);


    let profileObject = JSON.parse(profileString);

    $("#freelancerEditProfileNameField").text(profileObject["name"]);
    $("#freelancerEditProfileSkillsText").val(profileObject["email"]);
    $("#freelancerEditProfileCollegeField").text(profileObject["college"]);

    showContent(pageList.editProfile);


    
    //console.log("stored data:" + jelem.data("mydata"));

    // let reconstructedJob = JSON.parse(jelem.data("mydata"));
    
    // let applyContainer = $("#jobApplicationContainer");
    // applyContainer.data("mydata",jelem.data("mydata"));
}


function LoadProfilesIntoPage(contentHtml, profiles) {


    console.log("data loaded was:" + profiles);
    console.log("template:" + contentHtml);

    let profilesObject = JSON.parse(profiles);

    let i = 0;

    for ( let profile of profilesObject ) {
        $("#profilesListContent").append(contentHtml);

        let addedNode = $( "#profilesListContent").children().last();

        //let addedNode = $( "#profilesListContent:nth-last-child(2)");

        i = (i + 1) % 2;

        if ( i ) {
            $(addedNode).addClass("profileListOdd");
        }
        else {
            $(addedNode).addClass("profileListEven");
        }

        profiledListViewDetails
        let button = addedNode.find(".profileListDetailsButton");



        addedNode.find(".profileListProfileName").text(profile["name"]);
        button.on("click",profiledListViewDetails);
        button.data("mydata",JSON.stringify(profile));
    }

    showContent(pageList.viewAllProfiles);
}


function viewListofAllProfiles() {


    console.log("in viewListofAllProfiles function");

    let contentPageHtml = '';


    $("#profilesListContent").empty();



    loadPageAsync("../templates/freelancer-profile-brief.html",getProfileTemplateCallback);



    function getProfileTemplateCallback(data) {
        console.log("in getProfileTemplateCallback function");

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
        url += '/freelancer/';
        url += id;
        url += '/profiles';
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
                    console.log("profile retrieved");

                    LoadProfilesIntoPage(data, response);

                } else {
                    console.log("profile retieval failed");
                }
            } else {

            }
        } 



    }



}




function clearCreateProfileForm() {

    $("#freelancerCreateProfileNameText").val("");
    $("#freelancerCreateProfileSkillsText").val("");
    $("#freelancerCreateProfileCollegeText").val("");

    let button = $('#freelancerCreateProfileCreateButton');
    button.prop('disabled', true);
}


function validateAddProfileForm(){

    //console.log("validationg profile form");

    let profilename = $("#freelancerCreateProfileNameText").val();
    let skills = $("#freelancerCreateProfileSkillsText").val();
    let collegename = $("#freelancerCreateProfileCollegeText").val();



    let button = $('#freelancerCreateProfileCreateButton');

    if ( profilename != "" && skills != "" && collegename != "" ) {
        button.prop('disabled', false);
    }
    else {
        button.prop('disabled', true);
    }
}


function submitNewProfile(){

    let profilename = $("#freelancerCreateProfileNameText").val();
    let skills = $("#freelancerCreateProfileSkillsText").val();
    let collegename = $("#freelancerCreateProfileCollegeText").val();

    // @JsonProperty("name")
    // private String name = null;
  
    // @JsonProperty("email")
    // private String email = null;
  
    // @JsonProperty("skills")
    // private String skills = null;
  
    // @JsonProperty("college")
    // private String college = null;

    // @JsonProperty("freelancerid")
    // private Freelancer freelancerid = null;
  
    let jwtToken = getCookie('jwt');

    let id = getIdFromJwt(jwtToken);

    if ( id == -1 ) {
        console.log("invalid jwt");
        return;
    }


    let obj = {"name":profilename,"email":skills,
               "college":collegename,
               "freelancerid":{"id":id}};
    

    const myJSON = JSON.stringify(obj);
    console.log(myJSON);

    // 4 steps to making an AJAX call
    // STEP 1: Create an XML Http Request object
    let xhttp = new XMLHttpRequest();

    // STEP 2: Set a callback function for the readystatechange event
    xhttp.onreadystatechange = receiveData;
    //xhttp.addEventListener('readystatechange', receiveData);

    // STEP 3: Open the request
    let url = restURL;
    url += '/freelancer/create_profile';
    xhttp.open('POST', url );
    xhttp.setRequestHeader("Content-Type", "application/json");
    let bearerToken = "Bearer " + jwtToken;
    xhttp.setRequestHeader("Authorization", bearerToken);

    
    // STEP 4: Send the request
    //xhttp.send();
    xhttp.send(myJSON);
    // xhttp.send(JSON.stringify(myObj));
    // xhttp.send('{"username":"", "password":""}');

    // This needs to be an inner function so that it has closure to xhttp.
    function receiveData() {

        if (xhttp.readyState === 4) { 


            console.log("status is:" + xhttp.status );


            if ( 200 <= xhttp.status && xhttp.status < 300 ) { // check if it was successful
                // Ready state is DONE, HTTP status code is "OK"
                // responseText property is the response body as a string
                console.log("profile created");

                showContent(pageList.profileCreated);

            } else {
                console.log("profile creation failed");
            }
        } else {

        }
    } 
}






