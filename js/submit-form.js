$(function () {
    'use strict';

    // Ambil semua formulir yang ingin kita terapkan gaya validasi kustom Bootstrap
    const forms = $('.needs-validation');

    // Loop melalui formulir dan mencegah pengiriman
    forms.on('submit', function (event) {
        const form = $(this);

        var actionInput = $(this).find("input[name='action']");

        if (!form[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            form.find('.submit_form').html('Sending...');
            form.find('.submit_question').html('Sending...');
            form.find('.submit_subscribe').html('Sending...');
            form.find('.submit_form').prop('disabled', true);
            form.find('.submit_question').prop('disabled', true);
            form.find('.submit_subscribe').prop('disabled', true);
            const toast = new bootstrap.Toast($('.success_msg')[0]);
            const errtoast = new bootstrap.Toast($('.error_msg')[0]);
            var formData = form.serialize();
            $.ajax({
                type: "POST",
                url: "php/form_process.php",
                data: formData,
                success: function (response) {
                    if (response === 'success') {
                        if (actionInput.length > 0) {
                            if (actionInput.val() === 'question') {
                                form.find('.submit_question').removeAttr('disabled');
                                form.find('.submit_question').html('SUBMIT NOW');
                                const toast_question = new bootstrap.Toast($('.success_msg_question')[0]);
                                toast_question.show();
                            } else if (actionInput.val() === 'subscribe') {
                                form.find('.submit_subscribe').html('SUBSCRIBE');
                                form.find('.submit_subscribe').removeAttr('disabled');
                                const toast_subs = new bootstrap.Toast($('.success_msg_subscribe')[0]);
                                toast_subs.show();
                            }

                        } else {
                            toast.show()
                            form.find('.submit_form').html('SUBMIT NOW');
                            form.find('.submit_form').removeAttr('disabled');
                        }

                    } else {
                        // errtoast.show()
                        console.log('errorrrrrr')
                        form.find('.submit_form').html('SUBMIT NOW');
                        form.find('.submit_question').html('SUBMIT NOW');
                    }
                }
            });
        }

        form.addClass('was-validated');
    });
});