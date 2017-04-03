/*
 * BioControlSampleUpdater
 * Stuart Bradley
 * 2017-04-02
 *
 * Uses an Ajax call to find sample info from BioControl.
 */
function BioControlSampleUpdater() {

    self.construct = function () {
        var form = $('form');
        form.on('change', 'input[id$="BCSampleID"]', function (e) {
            self.modify(e.target);
        });
    };

    self.modify = function (input_field) {
        if ($(input_field).val().length > 5) {
            $.ajax({
                url: '/bio_control/sample',
                type: 'POST',
                dataType: 'json',
                data: {sample_number: $(input_field).val()},
                success: function (response) {
                    if (response.code == 100 && response.success) {
                        alert(response.sample_number);
                    }
                }
            });
        }
    };

    self.construct();
}