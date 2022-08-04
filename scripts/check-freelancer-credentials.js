
function checkFreelancerCredentials() {
    if (!hasCookie('jwt')) {
        window.location.replace('index.html');
        return;
    }

    let jwt = getCookie('jwt');

    console.log(parseJwt(jwt) );
}



