/*
 * FormCollections
 * Stuart Bradley
 * 2017-03-19
 *
 * JS for nesting of forms within forms.
 * Appends add and remove buttons dynamically,
 * as well as allowing for multilevel nesting
 * by defining the structure in
 * self.renamePrototype.
 */

function FormCollections(collection_classes) {

    // Button prototypes.
    self.prototype_buttons = {};
    self.prototype_buttons['files'] = '<button type="button" class="btn btn-statuses btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Status </button>';
    self.prototype_buttons['statuses'] = '<button type="button" class="btn btn-files btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add File </button>';
    self.prototype_buttons['omics_experiment_types'] = '<button type="button" class="btn btn-omics_experiment_types btn-success btn-recursive"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Experiment Type </button>';
    self.prototype_buttons['omics_experiment_sub_types'] = '<button type="button" class="btn btn-omics_experiment_sub_types btn-success btn-recursive"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Experiment Sub-Type </button>';
    self.prototype_buttons['samples'] = '<button type="button" class="btn btn-samples btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Sample </button>';

    // Nesting relations for recursive button addition.
    self.relations = {};
    self.relations['omics_experiment_types'] = 'omics_experiment_sub_types';
    self.relations['omics_experiment_sub_types'] = 'samples';

    // Ul classes for nested relations.
    self.ul_classes = {};
    self.ul_classes['omics_experiment_sub_types'] = '<ul style="list-style-type: none;" class="col-omics_experiment_sub_types"></ul>';
    self.ul_classes['samples'] = '<ul style="list-style-type: none;" class="col-samples"></ul>';

    /*
     * Generates buttons for already present entities.
     */
    self.construct_form_collections = function () {
        $.each(collection_classes, function (i, val) {
            var group = $('.col-' + val);
            // Add delete links to every LI group on the page.
            group.each(function () {
                $(this).children().each(function () {
                    // Check if tag is LI AND is NOT empty.
                    // There are unitialized LI tags that don't need buttons.
                    if ($(this).prop('tagName') == "LI" && $(this).children().length > 0) {
                        self.addDeleteLink($(this));
                    }
                });
            });

            // Add addNew events to every Add button the page.
            $(".btn-" + val).each(function () {
                var parent_ul = $(this).prev('ul');
                $(this).data('index', parent_ul.children().length);
                var div_name = val;
                $(this).on("click", function (e) {
                    e.preventDefault();
                    self.addNew(this, parent_ul, val);
                });
            });

        });
    };

    /**
     * onClick event handler -- adds a new input.
     */
    self.addNew = function (button, parent_ul, div_name) {
        // Get the data-prototype from div on form.
        var prototype = $('#proto-' + div_name).data('prototype');
        // Replace '__name__' in the prototype's HTML to
        // instead be a number based on how many items we have
        var newForm = self.renamePrototype(button, prototype, div_name);
        // If the newForm is nested, add the nested form to it as well.
        if (self.relations.hasOwnProperty(div_name)) {
            // Get child name and nested surrounding code.
            var nested_name = self.relations[div_name];
            var nested_ul = $(self.ul_classes[nested_name]);
            // Set index.
            nested_ul.data('index', parent_ul.data('index'));
            newForm.append(nested_ul);
            var new_button = $(self.prototype_buttons[nested_name]);
            $(new_button).data('index', 0);
            new_button.on("click", function (e) {
                // Recursive call.
                self.addNew(new_button, nested_ul, nested_name);
                e.preventDefault();
            });

        }

        // add a delete link to the new form
        newForm.append(new_button);
        self.addDeleteLink(newForm);

        parent_ul.append(newForm);

        return $(newForm);
    };

    /*
     * Adds a bootstrap delete button which removes the li element.
     */
    self.addDeleteLink = function (row) {
        var removeForm;
        // Correctly handle button vs form-control spacing.
        if ($(row).children().last().prop('tagName') == 'DIV') {
            removeForm = $('<br><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</button><br>');
        } else {
            removeForm = $('<br><br><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</button><br>');
        }
        row.append(removeForm);
        removeForm.on('click', function (e) {
            // prevent the link from creating a "#" on the URL
            e.preventDefault();

            // remove the li for the tag form
            row.remove();
        });
    };

    /*
     * Renames prototypes with correct indexing.
     *
     * If the structure changes in the form the id commands will
     * have to change.
     */
    self.renamePrototype = function (button, prototype, div_name) {
        var find, newForm, re, curr_index, id;
        newForm = prototype;

        /*
         * Statues, files, and omics_experiment_types
         * are single level forms - and can be indexed by the
         * data attribute on their single add buttons.
         */
        if (div_name == "statuses") {
            find = '__' + 'status' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);
            return $(newForm);
        } else if (div_name == "files") {
            find = '__' + 'file' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);
            return $(newForm);
        } else if (div_name == "omics_experiment_types") {
            find = '__' + 'exptype' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);
            return $(newForm);
            /*
             * omics_experiment_sub_types is a child of
             * omics_experiment_types - sub_types gets it's index of it's
             * specific add button, and it's parents index
             * by getting the index of the parent selector.
             */
        } else if (div_name == "omics_experiment_sub_types") {
            find = '__' + 'expsubtype' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);

            id = $(button).parent().find('div').children('select').attr('id');
            find = '__' + 'exptype' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = /(\d+)_omicsExperimentTypeString/.exec(id)[1];
            newForm = newForm.replace(re, curr_index);
            /*
             * samples does a similar thing as above, just with two
             * levels of selector ids to find.
             */
        } else {
            find = '__' + 'samples' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);

            try {
                id = $(button).parent().find('div').children('select').attr('id');
                find = '__' + 'expsubtype' + '_prot__';
                re = new RegExp(find, 'g');
                curr_index = /omicsExperimentSubTypes_(\d+)/.exec(id)[1];
                newForm = newForm.replace(re, curr_index);

                find = '__' + 'exptype' + '_prot__';
                re = new RegExp(find, 'g');
                curr_index = /omicsExperimentTypes_(\d+)/.exec(id)[1];
                newForm = newForm.replace(re, curr_index);
            } catch (err) {
            }

        }
        return $(newForm);
    };

    self.construct_form_collections();

}