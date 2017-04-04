/*
 * BioControlSampleUpdater
 * Stuart Bradley
 * 2017-04-02
 *
 * Uses an Ajax call to find sample info from BioControl.
 */
function BioControlSampleUpdater() {

    var BCRunID_field;
    var BCExperiment_field;
    var datetime_fields;
    var sampledBy_field;

    self.construct = function () {
        var form = $('form');
        form.on('change', 'input[id$="BCSampleID"]', function (e) {
            self.modify(e.target);
        });
    };

    self.modify = function (input_field) {

        BCRunID_field = $(input_field).closest(".form-group").next().next().find("input[id$='BCRunID']");
        BCExperiment_field = $(input_field).closest(".form-group").next().next().next().find("input[id$='BCExperimentID']");
        datetime_fields = $(input_field).closest(".form-group").next().next().next().next().find("div[id$='sampledDateTime']");
        sampledBy_field = $(input_field).closest(".form-group").next().next().next().next().next().find("select[id$='sampledBy']");

        if ($(input_field).val().length > 0) {
            $.ajax({
                url: '/bio_control/sample',
                type: 'POST',
                dataType: 'json',
                data: {sample_number: $(input_field).val()},
                beforeSend: function () {
                    $('.progress').show()
                },
                success: function (response) {
                    if (response.code == 100 && response.success) {
                        $(input_field).parent().attr("class", "form-group has-success");

                        $(BCRunID_field).val(response.sample_data['id']);
                        $(BCExperiment_field).val(response.sample_data['id']);
                        self.setDateTime(datetime_fields, response.sample_data['last_login']);
                        $(sampledBy_field).val(response.sample_data['id']);
                    } else {
                        self.resetFields(input_field);
                    }
                },
                error: function () {
                    $('.progress').hide();
                    self.resetFields(input_field)
                },
                complete: function () {
                    $('.progress').hide()
                }
            });
        }
    };

    self.setDateTime = function (datetime_fields, dateTimeString) {
        var dateTime = new Date(dateTimeString);

        $(datetime_fields).find("select[id$='date_month']").val(dateTime.getMonth() + 1);
        $(datetime_fields).find("select[id$='date_day']").val(dateTime.getDate());
        $(datetime_fields).find("select[id$='date_year']").val(dateTime.getFullYear());

        $(datetime_fields).find("select[id$='time_hour']").val(dateTime.getHours());
        $(datetime_fields).find("select[id$='time_minute']").val(dateTime.getMinutes());
    };

    self.resetFields = function (input_field) {
        $(input_field).parent().attr("class", "form-group has-error");
        $(BCRunID_field).val("");
        $(BCExperiment_field).val("");
        self.setDateTime(datetime_fields, new Date());
        $(sampledBy_field).removeAttr('selected').find('option:first').attr('selected', 'selected');
    };

    self.construct();
}