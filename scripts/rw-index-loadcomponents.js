$(function () {

    // Load the Login dialog.
    loadPageAsync('../templates/login-dialog.html',loadLoginDialogCallback);

    function loadLoginDialogCallback(componentHtml) {
        // Step 1) create a place the html into a node in the DOM. There is a
        // hidden container set up to keep it from appering on the page.
        let dialogDiv = $.parseHTML(componentHtml);
        $("#dialogContainer").append(dialogDiv);

        // Step 2) have jquery ui convert the new node to a dialog widget.
        $("#dialog-3").dialog({
            autoOpen: false, 
            modal : true
        });

        // Step 3) set up event handlers for the buttons (on the page
        // and in the dialog).
        $("#loginButton").click(function () {
            resetLoginDialog();
            $("#dialog-3").dialog("open");
        });

        $("#loginDialogUsernameText").on("input",validateLoginDialog);
        $("#loginDialogPasswordText").on("input",validateLoginDialog);

        $("#loginCancelButton").click(function () {
            $("#dialog-3").dialog("close");
            setLoginErrorMessage("");
        });

        $("#dialogLoginButton").click(function () {
            //$("#dialog-3").dialog("close");
            login();
        });

    }


    // Load the signup dialog.
    loadPageAsync('../templates/register-dialog.html',loadRegisterDialogCallback);

    function loadRegisterDialogCallback(componentHtml) {
        let dialogDiv = $.parseHTML(componentHtml);
        $("#dialogContainer").append(dialogDiv);

        $("#dialog-4").dialog({
            autoOpen: false ,
            modal : true
        });

        $("#signUpButton").click(function () {
            if ($('#dialog-4').dialog('isOpen')) {
                $("#dialog-4").dialog("close");
            }
            else {
                $("#dialog-4").dialog("open");
            }
        });
    };
});
