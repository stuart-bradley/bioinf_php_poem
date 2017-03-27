/**
 * Created by wackm on 28-Mar-17.
 *
 * Copied from https://gist.github.com/daverogers/5375778
 */
$(document).ready(function () {
    // get current URL path and assign 'active' class
    var pathname = window.location.pathname;
    $('.nav > li > a[href="' + pathname + '"]').parent().addClass('active');
})