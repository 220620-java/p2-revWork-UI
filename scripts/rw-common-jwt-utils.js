function parseJwt(token) {

    let payloadObject = null;

    try {
        let splitToken = token.split('.');

        if ( splitToken.length != 3 ){
            console.log('jwt token does not have 3 parts')
            return null;
        }

        var base64Url = splitToken[1];


        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        payloadObject = JSON.parse(jsonPayload);
    }
    catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }

    return payloadObject;
};
