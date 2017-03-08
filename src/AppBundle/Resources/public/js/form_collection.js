function FormCollections(collection_classes) {

    // Button prototypes.
    self.prototype_buttons = {};
    self.prototype_buttons['statuses'] = '<button type="button" class="btn btn-statuses btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Status </button>'
    self.prototype_buttons['omics_experiment_types'] = '<button type="button" class="btn btn-omics_experiment_types btn-success btn-recursive"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Experiment Type </button>'
    self.prototype_buttons['omics_experiment_sub_types'] = '<button type="button" class="btn btn-omics_experiment_sub_types btn-success btn-recursive"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Experiment Sub-Type </button>'
    self.prototype_buttons['samples'] = '<button type="button" class="btn btn-samples btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Sample </button>'

    // Nesting relations for recursive button addition.
    self.relations = {};
    self.relations['omics_experiment_types'] = 'omics_experiment_sub_types';
    self.relations['omics_experiment_sub_types'] = 'samples';

    // Ul classes for nested relations.
    self.ul_classes = {};
    self.ul_classes['omics_experiment_sub_types'] = '<ul style="list-style-type: none;" class="col-omics_experiment_sub_types"></ul>';
    self.ul_classes['samples'] = '<ul style="list-style-type: none;" class="col-samples"></ul>';

    self.prototype_names = {};
    self.prototype_names['statuses'] = 'status';
    self.prototype_names['omics_experiment_types'] = 'exptype';
    self.prototype_names['omics_experiment_sub_types'] = 'expsubtype';
    self.prototype_names['samples'] = 'samples';


    self.construct = function () {
        $.each(collection_classes, function (i, val) {
            var group = $('.col-' + val);
            // Add delete links to every LI group on the page.
            group.each(function () {
                $(this).children().each(function () {
                    // Check if tag is LI AND is NOT empty.
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
     * onClick event handler -- adds a new input
     */
    self.addNew = function (button, parent_ul, div_name) {
        // Get the data-prototype.
        var prototype = $('#proto-' + div_name).data('prototype');
        // Replace '__name__' in the prototype's HTML to
        // instead be a number based on how many items we have
        var newForm = self.renamePrototype(button, prototype, div_name);
        // If the newForm is nested, add the nested form to it as well.
        if (self.relations.hasOwnProperty(div_name)) {
            var nested_name = self.relations[div_name];
            var nested_ul = $(self.ul_classes[nested_name]);
            // Index is multiplied by 10 to add an addition significant
            // figure to represent level of nesting.
            nested_ul.data('index', parent_ul.data('index'));
            newForm.append(nested_ul);
            var new_button = $(self.prototype_buttons[nested_name]);
            $(new_button).data('index',0);
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

    self.addDeleteLink = function (row) {
        // Correctly handle button vs form-control spacing.
        if ($(row).children().last().prop('tagName') == 'DIV') {
            var removeFormA = $('<br><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</button><br>');
        } else {
            var removeFormA = $('<br><br><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</button><br>');
        }
        row.append(removeFormA);
        removeFormA.on('click', function (e) {
            // prevent the link from creating a "#" on the URL
            e.preventDefault();

            // remove the li for the tag form
            row.remove();
        });
    };

    self.renamePrototype = function (button, prototype, div_name) {
        var find, newForm, re, curr_index, id;
        newForm = prototype;

        if (div_name == "statuses") {
            find = '__' + 'status' + '_prot__';
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
        } else {
            find = '__' + 'samples' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = $(button).data('index');
            newForm = newForm.replace(re, curr_index);
            $(button).data('index', $(button).data('index') + 1);

            id = $(button).parent().find('div').children('select').attr('id');
            find = '__' + 'expsubtype' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = /omicsExperimentSubTypes_(\d+)/.exec(id)[1];
            newForm = newForm.replace(re, curr_index);

            find = '__' + 'exptype' + '_prot__';
            re = new RegExp(find, 'g');
            curr_index = /omicsExperimentTypes_(\d+)/.exec(id)[1];
            newForm = newForm.replace(re, curr_index);
        }
        return $(newForm);
    };

    self.construct();

}