function loadPageAsync(page,callBackFunction) {
    $.get(page, callBackFunction);
}

function showContent(content) {

    $( '#mainContent' ).children().each(function( i ){
        console.log($(this).attr("id"));

        if ( $(this).attr("id") == content ){
            $(this).show();
        }
        else {
            $(this).hide();
        }

    });
}