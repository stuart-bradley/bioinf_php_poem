var $collectionHolder;

// setup an "add a tag" link
var $addStatusLink = $('<a href="#" class="add_status_link">Add a status</a>');
var $newStatusLinkLi = $('<li></li>').append($addStatusLink);

jQuery(document).ready(function() {
    // Get the ul that holds the collection of statuses
    $collectionHolder = $('ul.statuses');

    // add the "add a status" anchor and li to the statuses ul
    $collectionHolder.append($newStatusLinkLi);

    // count the current form inputs we have (e.g. 2), use that as the new
    // index when inserting a new item (e.g. 2)
    $collectionHolder.data('index', $collectionHolder.find(':input').length);

    $addStatusLink.on('click', function(e) {
        // prevent the link from creating a "#" on the URL
        e.preventDefault();

        // add a new tag form (see next code block)
        addStatusForm($collectionHolder, $newStatusLinkLi);
    });
});

function addStatusForm($collectionHolder, $newStatusLinkLi) {
    // Get the data-prototype explained earlier
    var prototype = $collectionHolder.data('prototype');

    // get the new index
    var index = $collectionHolder.data('index');

    // Replace '__name__' in the prototype's HTML to
    // instead be a number based on how many items we have
    var newForm = prototype.replace(/__name__/g, index);

    // increase the index with one for the next item
    $collectionHolder.data('index', index + 1);

    // Display the form in the page in an li, before the "Add a statuses" link li
    var $newFormLi = $('<li></li>').append(newForm);
    $newStatusLinkLi.before($newFormLi);
}