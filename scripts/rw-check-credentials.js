
function checkJwtTokenRolesBootToMain() {
    window.location.replace('index.html');
}

function checkJwtTokenRoles(requiredRole) {
    // In this stage, we'll only check:
    // 1) there is a jwt cookie available.
    // 2) the jwt has a "freelancer" role in its claims.
    // The crypto segment is left unanlyzed here but will be checked on the
    // server for any secured endpoints.
    
    if ( !hasCookie('jwt') ) {
        checkJwtTokenRolesBootToMain();
        return;
    }

    let jwtToken = getCookie('jwt');

    let jwtObject= parseJwt(jwtToken);
    //console.log(jwtJSON);
    //let jwtObject = JSON.parse(jwtJSON);

    if ( !('roles' in jwtObject) ){
        console.log("no roles in jwt");
        checkJwtTokenRolesBootToMain();
        return;
    }
    else {
        console.log("extracting roles");
    }

    let rolesArray = jwtObject["roles"];

    if ( !Array.isArray(rolesArray) ){
        console.log("roles is not an array");
        checkJwtTokenRolesBootToMain();
        return;
    }
    else {
        console.log("examining roles");
    }

    if ( !rolesArray.includes(requiredRole) ){
        console.log("this account is not a is missing a requred role: " + requiredRole);
        checkJwtTokenRolesBootToMain();
        return;
    }
    else {
        console.log("user has a valid jwt with a " + requiredRole + " role.");
    }


    
}
