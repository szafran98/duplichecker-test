// $(function(){
// $("input[name=url]")[0].oninvalid = function () {
// this.setCustomValidity("Please enter valid URL with http:// or https://.");
// };
// });
function clear_fields(keep) {
	if (keep == 'bykeyword') {
		$("#url").val("");
		$("#imgFile").val("");
	}
	if (keep == 'url') {
		$("#bykeyword").val("");
		$("#imgFile").val("");
	}
}
function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
function _ondrop(e) {
	e.preventDefault();
	if (e.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		//for (var i = 0; i < e.dataTransfer.items.length; i++) {
		if (e.dataTransfer.items.length > 1) {
			alert("Only Single file allow.");
			$('.drag-zone').css("background", "#ffffff");
			return false;
		} else {
			for (var i = 0; i < 1; i++) {
				// If dropped items aren't files, reject them
				if (e.dataTransfer.items[i].kind === 'file') {
					var file = e.dataTransfer.items[i].getAsFile();
					var ext = file.name.split('.').pop();
					fileType = file.type;
					var validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/bmp", "image/tiff"];
					if ($.inArray(fileType, validImageTypes) < 0) {
						// invalid file type code goes here.
						alert("Images type allow only");
						$('.drag-zone').css("background", "#ffffff");
						return false;
					}
					if (parseInt(file.size) > 20 * 1024 * 1024) {
						alert("File Size greater than 20mb.");
						$('.drag-zone').css("background", "#ffffff");
						return false;
					}
					get_size = bytesToSize(file.size);
					$('.show_file_size').css("display", "inline-block");
					$('.show_file_size').text("File size:" + get_size);
					var ajax_url = ris_screenshot_clip;
					var formData = new FormData();
					formData.append('ajax_file', file);
					formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
					var ajax_data = formData;
					var parameter_data = '';
					execute_ajax_file(ajax_url, ajax_data, rbh_import_pdf, parameter_data, "yes", "Uploading Image");
				}
			}//for loop
		}
	}
}
function _ondragenter(e) {
	e.preventDefault();
	$('.drag-zone').css("background", "#ffffff");
}
function _ondragleave(e) {
	e.preventDefault();
	$('.drag-zone').css("background", "#ffffff");
}
function _ondragover(e) {
	e.preventDefault();
	$('.drag-zone').css("background", "#dde5eaaa");
}
window.onload = function () {
	document.getElementById("paste_area").addEventListener("paste", handlePaste);
};
function handlePaste(e) {
	$("#url").val("");
	$("#bykeyword").val("");
	var item = e.clipboardData.items[0];
	if (item.type.indexOf("image") != -1) {
		var files = item.getAsFile();
		var ajax_url = ris_screenshot_clip;
		var formData = new FormData();
		formData.append('ajax_file', files);
		formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
		var ajax_data = formData;
		var parameter_data = '';
		execute_ajax_file(ajax_url, ajax_data, rbh_import_pdf, parameter_data, "yes", "Uploading Screen Shot");
	}
}
function rbh_import_pdf(response, parameter_data) {
	if (response.responce_type == 'success') {
		var img_path = response.data.image_path;
		$("#url").val(img_path);
		$('#img_prev_box').attr('src', img_path);
		$('.main-prev-box').css("display", "flex");
		$('.hide_after_paste').css("display", "none");
		setTimeout(function () {
			var pos = $(".tool_heading").offset();
			pos = pos.top - 10;
			$('body,html').animate({ scrollTop: pos }, 'slow');
		}, 200);
	} else {
		$('.drag-zone').css("background", "#ffffff");
		$('.hide_after_paste').css("display", "inline-block");
		$('.main-prev-box').css("display", "none");
		$('.show_file_size').css("display", "none");
		alert(response.data);
	}
}
$("#imgFile").change(function () {
	var file = this.files[0];
	var name = this.files[0].name;
	var ext = name.split('.').pop();
	fileType = file["type"];;
	//console.log(fileType);
	var validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/bmp", "image/tiff"];
	if ($.inArray(fileType, validImageTypes) < 0) {
		$("#url").val("");
		$("#imgFile").val("");
		$("#bykeyword").val("");
		alert("Images type allow only");
		return false;
	}
	var file_size = this.files[0].size;
	if (file_size > 20 * 1024 * 1024) {
		alert('File size to Large max limit 20MB');
		$('#pl_text').text('Upload');
		$("#imgFile").val('');
		return false;
	} else {
		get_size = bytesToSize(file.size);

		$('#pl_text').text(this.files[0].name);
		$("#url").val("");
		var files = this.files[0];
		var reader = new FileReader();
		reader.addEventListener("load", function () {
			var dis_pic = $('#img_prev_box').attr('src', reader.result);
			if (dis_pic) {
				$('.main-prev-box').css("display", "flex");
				$('.show_file_size').css("display", "inline-block");
				$('.show_file_size').text("File size:" + get_size);
				$('.hide_after_paste').css("display", "none");
				$('.shine').addClass("addshine");
				$('.shine').addClass("probanner-part1");
				$('.probanner-part').removeClass("probanner-part1");
$('#lenso_submit').show();$('#simple_link').hide();



				var pos = $("#img_prev_box").offset();
				pos = pos.top;
				$('body,html').animate({ scrollTop: pos }, 'slow');
			} else {
                            $('#lenso_submit').hide();$('#simple_link').show();
				$('.hide_after_paste').css("display", "flex");
				$('.main-prev-box').css("display", "none");
				$('.show_file_size').css("display", "none");

			}
		}, false);
		reader.readAsDataURL(files);
	}
});
$(document).on('click', '.cross_img', function () {
    $('#lenso_submit').hide();$('#simple_link').show();
	$('.hide_after_paste').css("display", "block");
	$('.main-prev-box').css("display", "none");
	$('.show_file_size').css("display", "none");

	$('.drag-zone').css("background", "#ffffff");
	$("#pl_text").text("Upload");
	$("#imgFile").val('');
	$("#url").val("");
	$("#bykeyword").val("");
});