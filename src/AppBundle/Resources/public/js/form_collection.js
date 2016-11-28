function FormCollections(collection_classes) {

    // Button prototypes.
    self.prototype_buttons = {};
    self.prototype_buttons['statuses'] = '<button type="button" class="btn btn-statuses btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Status </button>'
    self.prototype_buttons['omics_experiment_types'] = '<button type="button" class="btn btn-omics_experiment_types btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Experiment Type </button>'
    self.prototype_buttons['omics_experiment_sub_types'] = '<button type="button" class="btn btn-omics_experiment_sub_types btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Experiment Sub-Type </button>'
    self.prototype_buttons['samples'] = '<button type="button" class="btn btn-samples btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Sample </button>'

    // Nesting relations for recursive button addition.
    self.relations = {};
    self.relations['omics_experiment_types'] = 'omics_experiment_sub_types';
    self.relations['omics_experiment_sub_types'] = 'samples';

    // Ul classes for nested relations.
    self.ul_classes = {};
    self.ul_classes['omics_experiment_sub_types'] = '<ul style="list-style-type: none;" class="col-omics_experiment_sub_types"></ul>';
    self.ul_classes['samples'] = '<ul style="list-style-type: none;" class="col-samples"></ul>';


    self.construct = function () {
        $.each(collection_classes, function (i, val) {
            var group = $('.col-'+val);
            // Add delete links to every LI group on the page.
            group.each(function () {
              $(this).children().each(function() {
                  // Check if tag is LI AND is NOT empty.
                  if ($(this).prop('tagName') == "LI" && $(this).children().length > 0) {
                      self.addDeleteLink($(this));
                  }
              });
            });

            // Add addNew events to every Add button the page.
            $(".btn-"+ val).each(function () {
                // If the button is top level, they'll only be one UL so buttons
                // can be placed outside it and the UL can be hardcoded.
                if (val == "omics_experiment_types") {
                    var parent_ul = $("ul.col-omics_experiment_types").first();
                } else if (val == "statuses") {
                    var parent_ul = $("ul.col-statuses").first();
                    // Nested relations require automated search.
                } else {
                    // Handles Sequence Run case for samples being top-level.
                    if (collection_classes.length == 1) {
                        var parent_ul = $("ul.col-samples").first()
                    } else {
                        var parent_ul = $(this).closest('ul');
                    }
                }
                var div_name = val;
                $(this).on("click", function(e) {
                    e.preventDefault();
                    self.addNew(parent_ul, val);
                });
            });
            
        });
    };

    /**
     * onClick event handler -- adds a new input
     */
    self.addNew = function (parent_ul, div_name) {
        // Get the data-prototype.
        var prototype = $('#proto-'+div_name).data('prototype');
        // get the new index
        var index = parent_ul.data('index');

        // Replace '__name__' in the prototype's HTML to
        // instead be a number based on how many items we have
        var newForm = $(prototype.replace(/__name__/g, index));
        // increase the index with one for the next item
        parent_ul.data('index', index + 1);
        var new_button = $();

        // If the newForm is nested, add the nested form to it as well.
        if (self.relations.hasOwnProperty(div_name)) {
            var nested_name = self.relations[div_name];
            var nested_ul = $(self.ul_classes[nested_name]);
            // Index is multiplied by 10 to add an addition significant
            // figure to represent level of nesting.
            nested_ul.data('index', parent_ul.data('index') * 10);
            newForm.append(nested_ul);
            var new_button = $(self.prototype_buttons[nested_name]);
            new_button.on("click", function(e) {
                // Recursive call.
                self.addNew(nested_ul, nested_name)
                e.preventDefault();
            });

        }

        // add a delete link to the new form
        newForm.append(new_button);
        self.addDeleteLink(newForm);

        parent_ul.append(newForm);

        return $(newForm);
    };

    self.addDeleteLink = function (row) {
        // Correctly handle button vs form-control spacing.
        if ($(row).children().last().prop('tagName') == 'DIV') {
            var removeFormA = $('<br><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</button><br>');
        } else {
            var removeFormA = $('<br><br><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</button><br>');
        }
        row.append(removeFormA);
        removeFormA.on('click', function(e) {
            // prevent the link from creating a "#" on the URL
            e.preventDefault();

            // remove the li for the tag form
            row.remove();
        });
    };

    self.construct();
    
}