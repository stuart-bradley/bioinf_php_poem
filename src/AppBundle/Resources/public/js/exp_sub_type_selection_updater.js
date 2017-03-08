function ExpSubTypeSelectionUpdater(selection_relations) {
    self.construct = function () {
        // Monitors experiment_type selects for change.
        $('ul.col-omics_experiment_types').on('change', 'select[id$="omicsExperimentTypeString"]', function (e) {
            self.modify(e.target);
        });

        // Observes new sub_type additions and updates them accordingly.
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var nodes = mutation.addedNodes[0];
                var sub_type_select = $(nodes).find("select[id$='omicsExperimentSubTypeString']");
                if ($(sub_type_select).length) {
                    var sub_type_select_id = $(sub_type_select).attr('id').match(/^omics_experiment_omicsExperimentTypes_(\d+)/)[1];
                    var type_select = $('select#omics_experiment_omicsExperimentTypes_' + sub_type_select_id + '_omicsExperimentTypeString');
                    var parent_val = $("option:selected", type_select).text();
                    self.update_child(sub_type_select, parent_val);
                }

            });
        });

        var observerConfig = {
            subtree: true,
            childList: true
        };

        observer.observe($('ul.col-omics_experiment_types')[0], observerConfig);
    };

    self.modify = function(selector) {
        var frame = $('ul.col-omics_experiment_types');
        var parent_val = $("option:selected", selector).text();
        // Finds experiment_sub_type select children.
        var child_selectors = $(frame).find("select[id$='omicsExperimentSubTypeString']");
        $.each(child_selectors, function (i, val) {
            self.update_child(val, parent_val);
        });
    };

    self.update_child = function(child_selector, parent_val) {
        // Hides ALL options.
        $(child_selector).children('option').hide();
        // Shows relevant options.
        $.each(selection_relations[parent_val], function (i, val) {
            $(child_selector).children('option').filter(function () {
                return $(this).html() == val;
            }).show();
        });
        // Gets first non-hidden option.
        var first_non_hidden_option = $(child_selector).children('option').filter(function () {
            return $(this).css('display') != 'none';
        }).first()[0];
        // If it exists set it as selected, else set blank.
        if (typeof(first_non_hidden_option) != 'undefined') {
            $(child_selector).val(first_non_hidden_option.value);
        } else {
            $(child_selector).val('');
        }
    };

    self.construct();
}