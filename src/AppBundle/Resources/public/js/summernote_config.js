/**
 * Created by wackm on 19-Mar-17.
 */
$(document).ready(function () {
    ('.summernote').each(function () {
        $(this).summernote({
            // Pops image data if loaded.
            callbacks: {
                onImageUpload: function (data) {
                    data.pop();
                }
            },
            // Removes image and video uploading.
            toolbar: [
                ['style', ['style']],
                ['style_text', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['fontname', 'fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['insert_table', ['table']],
                ['link', ['link']],
                ['misc', ['fullscreen', 'codeview', 'help']]
            ]
        });
    });
});