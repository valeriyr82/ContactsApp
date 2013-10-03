angular.module("contactApp").directive('dragDropUpload', ['GlobalUtil', function(GlobalUtil) {
	// Helper function that formats the file sizes
	function formatFileSize(bytes) {
		if (typeof bytes !== 'number') {
			return '';
		}

		if (bytes >= 1000000000) {
			return (bytes / 1000000000).toFixed(2) + ' GB';
		}

		if (bytes >= 1000000) {
			return (bytes / 1000000).toFixed(2) + ' MB';
		}

		return (bytes / 1000).toFixed(2) + ' KB';
	}

	return {
		restrict: 'A',
		scope: {
            userId: '='
		},
		link: function(scope, elem, attr, ctrl) {
			var dragForm = "<form id='file-upload' method='post' action='" + attr.submitUrl + scope.userId +"' enctype='multipart/form-data'> \
				<div id='drop'> \
					Drop Here<br> \
					<a>Browse</a> \
					<input type='file' name='file' multiple /> \
				</div> \
			</form>";

			$(elem).html(dragForm).promise().done(function() {
                $(this).find("#file-upload #drop a").on('click', function() {
                    $(this).parent().find('input').click();
                });
                $(this).find("#file-upload").fileupload({
                    // This element will accept file drag/drop uploading
                    dropZone: $(this).find("#file-upload #drop"),
                    add: function(e, data) {
                        data.submit();
                    },
                    done: function(e, data) {
                        GlobalUtil.setImageName(data.result.photo);
                    }
                });
            });

			// Prevent the default action when a file is dropped on the window
			$(document).on('dragover', function (e) {
				e.preventDefault();
				$('#drop').addClass('active');
			});

			$(document).on('drop dragleave', function (e) {
				e.preventDefault();
				$('#drop').removeClass('active');
			});
		}
	}
}]);
