function execute_ajax(o,a,e,n,i,s){var t="request_type=api";""!=a&&void 0!==a&&(t=t+"&"+a),$.ajax({type:"POST",url:o,data:t,dataType:"JSON",cache:!1,beforeSend:function(){if(i !='no'){$("#loading_img").show();$("#loading_img").css("display", "block");void 0!==i&&""!=i?$("#loading_tool_name").html(s):$("#loading_tool_name").html("Loading . . .")}}}).done(function(o,a,i){$("#loading_img").hide(),void 0!==e&&""!=e?void 0!==n&&""!=n?e(o,n):e(o):display_message(o.data,o.responce_type)}).fail(function(o,a,e){console.log(e)}).always(function(){stopPageLoading()})}function startPageLoading(o){o&&o.animate?($(".page-spinner-bar").remove(),$("body").append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>')):($(".page-loading").remove(),$("body").append('<div class="page-loading"><img src="'+this.getGlobalImgPath()+'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>'+(o&&o.message?o.message:"Loading...")+"</span></div>"))}function stopPageLoading(){$(".page-loading, .page-spinner-bar").remove()}function beforeSend(){$("#loading_img").show(),$("#loading_tool_name").html("Uploading File . . .")}function display_message(o,a){""!=a&&void 0!==a&&(a="success"),bootbox.alert(o)}function display_alert(o){bootbox.alert(o)}function display_confirm_box(o,a,e){bootbox.confirm("Are you sure?",function(o){void 0!==a&&""!=a&&(void 0!==e&&""!=e?a(o,e):a(o))})}function display_error(o,a){var e="<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Error! </strong>"+o+"</div>";$("#"+a).html(e),$("html, body").animate({scrollTop:$("#"+a).offset().top},200)}function showAlert(o){$("#myAlert").addClass("in"),o&&window.setTimeout(function(){$("#myAlert").fadeOut("slow",function(){$("#myAlert").removeClass("in")})},3e3)}

function execute_ajax_file(ajax_url, ajax_data, callback, callback_parameter,is_txt_show,txt_loading){
    $.ajax({
        type: "POST",
        url: ajax_url,
        data: ajax_data,
        contentType: false,
        processData: false,
        cache: false,
        dataType:"JSON",
        beforeSend: function(){
            $('#loading_img').show();
            $("#loading_img").css("display", "block");
            if(is_txt_show !== undefined && is_txt_show != ''){
                $('#loading_tool_name').html(txt_loading);
            }else{
                $('#loading_tool_name').html("Loading . . .");
            }
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal);
            percent.html(percentVal);
        }
    }).done(function(response, status, xhrObj) {
        $('#loading_img').hide();
            if(callback !== undefined && callback != ''){
                    if(callback_parameter !== undefined && callback_parameter != '') callback(response, callback_parameter);
                    else callback(response);
            }
            else display_message(response.data, response.response_type);
    }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown);
    }).always(function(){
            stopPageLoading();
    });
}