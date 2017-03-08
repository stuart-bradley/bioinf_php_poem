function ExpSubTypeSelectionUpdater(selection_relations) {
    self.construct = function () {
        // Monitors experiment_type selects for change.
        $('ul.col-omics_experiment_types').on('change', 'select#omics_experiment_omicsExperimentTypes___exptype_prot___omicsExperimentTypeString', function () {
            var parent_val = $(this).find("option:selected").text();
            // Finds experiment_sub_type select children.
            var child_selectors = $(this).parent().parent().find('select#omics_experiment_omicsExperimentTypes___exptype_prot___omicsExperimentSubTypes___expsubtype_prot___omicsExperimentSubTypeString');
            $.each(child_selectors, function (i, val) {
                var child_selector = val;
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
            });
        });
    };

    self.construct();
}