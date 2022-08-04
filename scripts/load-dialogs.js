$(function () {
    // async. load the dialog template
    $.get("../templates/login-dialog.html", function (data) {
        // Once the file is available, we need to

        // Step 1) create a place the html into a node in the DOM. There is a
        // hidden container set up to keep it from appering on the page.
        let dialogDiv = document.createElement('div');
        dialogDiv.innerHTML = data;

        $("#dialogContainer").append(dialogDiv);

        // Step 2) have jquery ui convert the new node to a dialog widget.
        $("#dialog-3").dialog({
            autoOpen: false 
        });

        // Step 3) set up event handlers for the buttons (on the page
        // and in the dialog).
        $("#loginButton").click(function () {
            $("#dialog-3").dialog("open");
        });

        $("#loginCancelButton").click(function () {
            $("#dialog-3").dialog("close");
        });

        $("#dialogLoginButton").click(function () {
            $("#dialog-3").dialog("close");
            login();
        });
    });
});

$(function () {
    $.get("../templates/register-dialog.html", function (data) {

        let dialogDiv = document.createElement('div');
        dialogDiv.innerHTML = data;

        $("#dialogContainer").append(dialogDiv);

        $("#dialog-4").dialog({
            autoOpen: false ,
            width: 200,
            height: 200
        });

        $("#signUpButton").click(function () {
            if ($('#dialog-4').dialog('isOpen')) {
                $("#dialog-4").dialog("close");
            }
            else {
                $("#dialog-4").dialog("open");
            }
        });
    });

});
