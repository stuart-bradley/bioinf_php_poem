/**
 * Created by wackm on 14-Dec-17.
 */

function SampleIdUpdater() {
    /**
     * Creates on change events for all Sample buttons (even ones added later).
     */
    self.construct_sample_watcher = function () {
        var omics_experiment_selector = $('ul.col-omics_experiment_types');

        self.update_total();

        // Watches BCSampleID Fields for changes
        $('form').on('change', 'input[id$="BCSampleID"]', function (e) {
            self.update_total();
        });

        // Observes new sub_type additions and updates them accordingly.
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                self.update_total();
            });
        });

        var observerConfig = {
            subtree: true,
            childList: true
        };

        observer.observe(omics_experiment_selector[0], observerConfig);
    };

    self.update_total = function() {
        var sample_total = 0;
        $("ul#sample_total_ul").empty();
        $('ul.col-samples').each(function() {
            $(this).children().each(function() {
                sample_total += 1;
                var BCSampleID = $(this).find("input[id$='BCSampleID']").first().val();
                $("ul#sample_total_ul").append('<li>'+BCSampleID+'</li>');
            })
        });
        $('#sample_total').text("Total: " + sample_total);
    };

    self.construct_sample_watcher();
}