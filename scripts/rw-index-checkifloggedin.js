// IIFE used to avoid poluting global namespace
(function() {
    // Check if the user already has a valid jwt token. If so, forward them
    // to the appropiate page based on the roles listed in the tokens claims.

    if ( !hasCookie('jwt') ) {
        return;
    }

    let jwtToken = getCookie('jwt');
    let jwtObject= parseJwt(jwtToken);

    if ( !('roles' in jwtObject) ){
        return;
    }

    let rolesArray = jwtObject["roles"];

    if ( !Array.isArray(rolesArray) ){
        return;
    }

    if ( rolesArray.includes('freelancer') ){
        window.location.replace('freelancer.html');
        return;
    }
    else if ( rolesArray.includes('employer') ) {
        window.location.replace('employer.html');
        return;
    }
})();