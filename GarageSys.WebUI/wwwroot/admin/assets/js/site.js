$(document).ready(function () {

    

    $('.select-list').select2();
    $.each($('.select-list'), function () {
        $(this).attr('data-val-required', 'الرجاء اختيار عنصر');
    })

    // main menu activation

    var openedMenu = localStorage.getItem("menu-open");
    var activeMenu = localStorage.getItem("menu-active");
    $(openedMenu).addClass("show");

    $('#' + activeMenu).attr('aria-expanded', 'true');
    $('#' + activeMenu).attr('data-active', 'true');


    $('.main-menu').click(function () {
        $.each($('#sidebar .main-menu'), function () {
            $(this).attr('aria-expanded', 'false');
            $(this).attr('data-active', false);
        });

        var item = $(this).attr('href');
        var active = $(this).attr('id');

        if ($(item).hasClass("show")) {
            $(this).attr('aria-expanded', 'false');
            $(this).attr('data-active', false);
        } else {
            localStorage.setItem("menu-open", item);
            localStorage.setItem("menu-active", active);
            $(this).attr('aria-expanded', 'true');
            $(this).attr('data-active', true);
        }
    });

    // end main menu activation


    $('.sub-menu').click(function () {


        var item = $(this).attr('href');
        var active = $(this).attr('id');

        if ($(item).hasClass("show")) {

            $('#' + active).attr('aria-expanded', 'false');

        } else {
            localStorage.setItem("sub-menu-open", item);
            localStorage.setItem("sub-menu-active", active);

            $('#' + active).attr('aria-expanded', 'true');
        }

    });

    var submenuOpen = localStorage.getItem("sub-menu-open");
    var submenuActive = localStorage.getItem("sub-menu-active");
    $(submenuOpen).addClass("show");
    $('#' + submenuActive).attr('aria-expanded', 'true');


    // hijri date init
    $('.date-input').each(function () {
        var Date = $(this).val();
        var target = $(this).data('for');

        var m = moment(Date, 'YYYY-MM-DD').format('iYYYY/iMM/iDD');
        $('#' + target).val(m);
    })

    // make sidebar scroll on page load
    $(".submenu li a").each(function () {
        //console.log($(this).attr('data-active'));
        if ($(this).attr('data-active') === 'true') {
            $(this).attr('id', 'current');
            //$('.submenu').scrollTop($(this).position().top);
            //$('.submenu').scrollTop(500);
            //$('.submenu').scrollIntoView(true);
            //$('.submenu').scrollTo(this);
        }
    });

    //var container = $('.submenu');
    //var scrollTo = $("#current");
    //// Calculating new position
    //// of scrollbar
    //var position = scrollTo.offset().top
    //    - container.offset().top
    //    + container.scrollTop();

    //// Animating scrolling effect
    //container.animate({
    //    scrollTop: position
    //});

    //$('#current').scrollTop(0);

    //let top = localStorage.getItem("sidebar-scroll");
    //if (top !== null) {
    //    sidebar.scrollTop = parseInt(top, 10);
    //}

    //window.addEventListener("beforeunload", () => {
    //    localStorage.setItem("sidebar-scroll", sidebar.scrollTop);
    //});

});



// hijri date converter
$('.hijri-date-input').focusout(function () {
    var hijriDate = $(this).val();
    var target = $(this).data('for');

    var m = moment(hijriDate, 'iYYYY/iMM/iDD').format('YYYY-MM-DD');
    $('#' + target).val(m);
});

$('.date-input').change(function () {
    var Date = $(this).val();
    var target = $(this).data('for');

    var m = moment(Date, 'YYYY-MM-DD').format('iYYYY/iMM/iDD');
    $('#' + target).val(m);

});

// end of hijri date converter


// employee info

function displayEmployeeInfo(params, names) {
    $('#display-info').slideUp();
    $('#display-info').html('');
    var output = "";

    for (let i = 0; i < params.length; i++) {
        output += `<div class="col-sm-2 mb-2">
                        <label class="col-form-label">`+ names[i] + `</label>
                    </div>
                    <div class="col-sm-4 mb-2">
                        <input class="form-control" value="`+ params[i] + `" readonly />
                    </div>`;
    }
    $('#display-info').html(output);
    $('#display-info').slideDown();
}



function getEmployee(endpoint, id) {
    return Promise.resolve($.ajax({
        url: endpoint + id,
        method: "GET",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + "UhQjb7mOVavNv96RiitZirwt1");
        },
    }));
}
// Start Gais Section

function AjaxGetRequest(endpoint, request = {}, datatype = "json") {
    return Promise.resolve($.ajax({
        url: endpoint,
        //beforeSend: function (xhr) {
        //    xhr.setRequestHeader("Authorization", "Bearer " + "UhQjb7mOVavNv96RiitZirwt1");
        //},
        method: "GET",
        data: request,
        dataType: datatype,
    }));
}
function AjaxPostRequest(endpoint, action, data, callback) {
    $.ajax({
        url: endpoint,
        method: action,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("TokenKey"));
        },
        async: false,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            callback(response);

        },
        error: function (error) {
            console.log("erroror " + error);
            var errors = "";
            var ss = error;
            if (error.responseJSON) {
                for (let i = 0; i < error.responseJSON.length; i++) {

                    errors += `<p>- ${error.responseJSON[i]}<p>`;
                }
                var makrup = `<div> ${errors}</div>`;
            } else {
                errors = error.responseText;
            }
            swalMsg("Error", makrup, type = "error")
        }
    });
}



function addSuccess(response) {
    swalMsg("success", "Vehical Added Successfully", 'success');
}
function redirectToUrl(response) {
    if (response) {
        let url = window.location.href + "/booking/Details/" + response;
        window.location.replace(url);
    }
}
function editSuccess(response) {
    swalMsg(translation.success_text, translation.edit_success_text, 'success');
}
function swalMsg(title, text, type = "") {
    Swal.fire({
        title: title,
        html: text,
        type: type,
        showConfirmButton: true,

    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        window.location.reload();
    })
}


function SerachTextIMenu() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dashboard");
    li = ul.getElementsByTagName("li");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        subul = li[i].getElementsByClassName("sub-submenu");
        for (j = 0; j < subul.length; j++) {
            subli = subul[j].getElementsByTagName("li")
            a = subli[j].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                subul[j].style.display = "";
            } else {
                subul[j].style.display = "none";
            }

        }
    }
}

$(function () {
    $(".la-print").each(function () {
        $(this).parent("a").attr("target", "_blank")
    });
})
// serlize formData to json
function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
// End Gais Section


// end of employee info


// adding methods for date
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.formatDate = function () {
    var date = new Date(this.valueOf());

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    // today = yyyy + '/' + mm + '/' + dd;
    date = `${yyyy}-${mm}-${dd}`;
    return date;
}

// end methods for date


// for select list in sidebar when scroll


// dropzone
$(function () {

    $('#dropzone').on('dragover', function () {
        $(this).addClass('hover');
    });

    $('#dropzone').on('dragleave', function () {
        $(this).removeClass('hover');
    });

    $('#dropzone input').on('change', function (e) {
        var file = this.files[0];

        $('#dropzone').removeClass('hover');

        if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
            return alert('File type not allowed.');
        }

        $('#dropzone').addClass('dropped');
        $('#dropzone img').remove();

        if (file) {
            var inner = "";
            for (var i = 0; i < this.files.length; i++) {
                if ((/^image\/(gif|png|jpeg)$/i).test(this.files[i].type)) {
                    var reader = new FileReader(this.files[i]);

                    reader.readAsDataURL(this.files[i]);

                    reader.onload = function (e) {
                        var data = e.target.result,
                            $img = $('<img />').attr('src', data).fadeIn();

                        $('#dropzone div').append($img);
                    };
                } else {
                    inner += this.files[i].name.split('.').pop();
                    if (i + 1 < this.files.length) {
                        inner += " -- ";
                    }

                }
            }
            $('#dropzone div').html(inner);
        }
        else {

            $('#dropzone').removeClass('dropped');
            $('#dropzone div').html("Upload File");
        }


    });
});


// initilaize data table
function initTable(tableId, pageLength = 10) {
    $('#min, #max').keyup(function () { table.draw(); });

    // Add text input to the footer
    $('#' + tableId + ' tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" class="form-control" placeholder="search" ' + title + '" />');
    });
    // Generate Datatable
    var table = $('#' + tableId).DataTable({
        dom: '<"row"<"col-md-6"B><"col-md-6"f> ><""rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>>',
        buttons: {
            buttons: [
                //{ extend: 'copy', className: 'btn btn-primary' },
                //{ extend: 'csv', className: 'btn btn-primary' },
                //{ extend: 'excel', className: 'btn btn-primary' },
                //{ extend: 'pdf', className: 'btn btn-primary' },
                { extend: 'print', className: 'btn btn-primary' }
            ]
        },
        "language": {
            "paginate": {
                "previous": "<i class='las la-angle-left'></i>",
                "next": "<i class='las la-angle-right'></i>"
            }
        },
        "lengthMenu": [5, 10, 15, 20],
        "pageLength": pageLength,

    });
    // Search
    table.columns().every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });
}

// delete button
function initswal(selector, endpoint, btnclass) {

    $('#' + selector).on("click", "." + btnclass, function () {
        var id = this.id;

        swal({
            title: 'هل انت متأكد؟',
            text: "",
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'الغاء',
            confirmButtonText: 'تأكيد',
            padding: '2em'
        })
            .then((result) => {
                if (result.value) {
                    AjaxPostRequest(endpoint + id, 'POST', '', addSuccess);
                }

            })
    });

}