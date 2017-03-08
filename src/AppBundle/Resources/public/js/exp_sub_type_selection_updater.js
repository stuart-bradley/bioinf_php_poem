function ExpSubTypeSelectionUpdater(selection_relations) {
    self.construct = function () {
        // Monitors experiment_type selects for change.
        $('ul.col-omics_experiment_types').on('change', 'select[id$="omicsExperimentTypeString"]', function (e) {
            self.modify(e.target);
        });
    };

    self.modify = function(selector) {
        var frame = $('ul.col-omics_experiment_types');
        var parent_val = $("option:selected", selector).text();
        // Finds experiment_sub_type select children.
        var child_selectors = $(frame).find("select[id$='omicsExperimentSubTypeString']");
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
    };

    self.construct();
}