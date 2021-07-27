// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(function () {
    $('button[data-toggle="modal"]').click(function (event) {
        var url = $(this).data('url');
        $.get(url).done(function (resultado) {
            var destino = $("#modal-container-large");
            destino.modal('hide');
            destino.find(".modal-content").html(resultado);
            destino.on("hidden.bs.modal", function () {
                $(this).find('.modal-content').empty();
                $(this).removeData('bs.modal');
            })
            destino.modal('show');
            destino.modal('handleUpdate');
        });
    });
});

$('.input-texto').each(function () {
    var req = $(this).attr('data-val-required');
    if (undefined != req) {
        var label = $('label[for="' + $(this).attr('id') + '"]');
        var text = label.text();
        if (text.length > 0) {
            label.append('<span style="color:black"> *</span>');
        }
    }
});

$(".newsletter-btn").on("click", function () {
    newsletterbtn();
});
function newsletterbtn() {
    var email = $("#input-email").val();
    if (email) {
        $("#newsletter-div").load("/Newsletter/Cadastro?emailCadastro=" + email);
    }
}
function exibemodal(exibir) {
    var modal = $("#modalloading");
    if (exibir) {
        $(modal).modal({
            backdrop: 'static',
            keyboard: false
        });
    }
    else {
        $(modal).modal("hide");
    }
}
function chamamodal() {
    $(function () {
        var placeholderElement = $('#modal-placeholder');

        $('button[data-toggle="ajax-modal"]').click(function (event) {
            var url = $(this).data('url');
            $.get(url).done(function (data) {
                placeholderElement.html(data);
                placeholderElement.find('.modal').modal('show');
            });
        });

        placeholderElement.on('click', '[data-save="modal"]', function (event) {
            event.preventDefault();

            var form = $(this).parents('.modal').find('form');
            var actionUrl = form.attr('action');
            var dataToSend = form.serialize();

            $.post(actionUrl, dataToSend).done(function (data) {
                var newBody = $('.modal-body', data);
                placeholderElement.find('.modal-body').replaceWith(newBody);

                var isValid = newBody.find('[name="IsValid"]').val() == 'True';
                if (isValid) {
                    $("#mensagemdadosalteradossucesso").removeClass("d-none");
                    placeholderElement.find('.modal').modal('hide');
                }
            });
        });
    });
}
chamamodal();
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    console.log(d);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";" + location.pathname;
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var addEventosaida = function (obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
};

