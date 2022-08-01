
function checkFreelancerCredentials() {
    if (!hasCookie('jwt')) {
        window.location.replace('success.html');
        return;
    }

    let jwt = getCookie('jwt');

    console.log(parseJwt(jwt) );
}



