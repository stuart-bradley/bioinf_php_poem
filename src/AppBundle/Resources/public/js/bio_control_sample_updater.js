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

    self.construct_sample_fields = function () {
        var form = $('form');
        $('input[id$="BCSampleID"]').each(function (index, value) {
            if ($(value).val().length > 0) {
                self.blur_selects_toggle(value, true);
            }
        });
        form.on('change', 'input[id$="BCSampleID"]', function (e) {
            self.modify_sample_fields(e.target);
        });
    };

    self.modify_sample_fields = function (input_field) {

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

                        self.blur_selects_toggle(input_field, true);

                        $(BCRunID_field).val(response.sample_data['RunID']);
                        $(BCExperiment_field).val(response.sample_data['ExpID']);
                        self.setDateTime(datetime_fields, response.sample_data['Dat']);
                        if (response.new_user) {
                            self.add_new_user(sampledBy_field, response.sample_data['PerNam'], response.user_id)
                        }
                        $(sampledBy_field).val(response.user_id);
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
        self.blur_selects_toggle(input_field, false);
        $(BCRunID_field).val("");
        $(BCExperiment_field).val("");
        self.setDateTime(datetime_fields, new Date());
        $(sampledBy_field).removeAttr('selected').find('option:first').attr('selected', 'selected');
    };

    self.add_new_user = function (input_field, cn, user_id) {
        $(input_field).append($('<option>', {
            value: user_id,
            text: cn
        }));
    };

    self.blur_selects_toggle = function (input_field, toggle) {
        var BCRunID = $(input_field).closest(".form-group").next().next().find("input[id$='BCRunID']");
        var BCExperiment = $(input_field).closest(".form-group").next().next().next().find("input[id$='BCExperimentID']");
        var datetime = $(input_field).closest(".form-group").next().next().next().next().find("div[id$='sampledDateTime']");
        var sampledBy = $(input_field).closest(".form-group").next().next().next().next().next().find("select[id$='sampledBy']");

        self.blur_field(BCRunID, toggle);
        self.blur_field(BCExperiment, toggle);
        self.blur_field(sampledBy, toggle);
        self.blur_field($(datetime).find("select[id$='date_month']"), toggle);
        self.blur_field($(datetime).find("select[id$='date_day']"), toggle);
        self.blur_field($(datetime).find("select[id$='date_year']"), toggle);
        self.blur_field($(datetime).find("select[id$='time_hour']"), toggle);
        self.blur_field($(datetime).find("select[id$='time_minute']"), toggle);
    };

    self.blur_field = function (field, toggle) {
        if (toggle) {
            $(field).css('background-color', '#eee');
            $(field).css('pointer-events', 'none');

            $(field).focus(function () {
                $(this).blur();
            });
        } else {
            $(field).css('background-color', '#fff');
            $(field).css('pointer-events', 'auto');

            $(field).focus(function () {
                $(this).focus();
            });
        }

    };

    self.construct_sample_fields();
}