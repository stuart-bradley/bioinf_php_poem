/**
 * Created by wackm on 28-Mar-17.
 *
 * Copied from https://gist.github.com/daverogers/5375778
 */
$(document).ready(function () {
    // get current URL path and assign 'active' class.
    // Updated so that it matches first block (can now be used in forms with different url ends (e.g. /new).
    var pathname = window.location.pathname.split("/")[1];
    $('.nav > li > a[href*="' + pathname + '"]').parent().addClass('active');
});

function redirectConfirm() {

    var chunked_pathname = window.location.pathname.split("/");
    var pathname = chunked_pathname[chunked_pathname.length - 1];
    if (pathname == "edit" || pathname == "new") {
        return confirm('Are you sure you want to leave this page? You will lose all new data.')
    }
    return true;
}