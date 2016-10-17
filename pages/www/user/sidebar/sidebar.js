Z.define('sidebar/sidebar',{
	initialize: function(opts) {
		this.opts = opts;
		this.repic();
		this.repictrue();
	},
	
	repic: function(){
		var self = this;	
		//头像图片截取效果
		var repicJcrop = function() {
			$('#repic').Jcrop({
				aspectRatio: 1,
				onSelect:updateCoords,
				boxWidth:250,
				boxHeight:250,
				minSize:[180,180],
				setSelect: [ 0, 0, 180, 180],
			});
		}

		var picX = picY = picW = picH = 0;
		var updateCoords = function(c) {
			picX = c.x;
			picY = c.y;
			picW = c.w;
			picH = c.h;
		}

		//保存个人头像修改
		var postProfilePic = function() {
			var obj = this;
			if ($(obj).val() == '保存中...') {
				return false;
			} else {
				var pid = parseInt($('input[name=pid]').val());
				if (pid == 0 || pid == null) {
					alert('请上传头像再保存.');
				} else {
					$(obj).val('保存中...');

					$.post('/user/rePic', {x: picX, y: picY, w: picW, h: picH, pid: pid, YII_CSRF_TOKEN: self.opts.YII_CSRF_TOKEN }, function(json) {
						if (json.status == 200) {
							window.location.reload();		
						} else {
							alert(json.message);
						}

						$(obj).val('保存');
					}, 'json')
				}
			}
		}

		var cancleProfilePic = function() {
			$('input[name=pid]').val(0);
			$('.img_wrap').animate({ "height": "0px" }, "slow", function(){
				$('.uploadify').removeClass('active');		
			});
		}

			$('#repic_send').bind('click', postProfilePic);
			$('#repic_cancle').bind('click', cancleProfilePic);
			
			/** 头像上传  */
			$("#fileupload").uploadify({
				swf: static_host + "flash/uploadify.swf",
				uploader: www_host + "user/upload",
				buttonText: '上传图片',
				buttonClass: 'btn btn-primary',

				'onUploadSuccess' : function(file, json, response) {
					json = eval('('+ json +')');
					if (json.pid != null && json.pid != 0) {
						var img = '<img src="'+ json.purl +'" id="repic"/>';
						var imgHeight=0, imgWidth=0;
						$('#picImg').html(img);
						$('input[name=pid]').val(json.pid);
						//$('.img_wrap').show();
						$('<img/>').attr('src', json.purl).load(function(){imgHeight = this.height});
						$('.user_progressbar').animate({ "width": "+=20%" }, "slow", function(){
							$('.uploadify').addClass('active');
							$('.img_wrap').animate({ "height": "390px" }, 400 , function(){
								$('.user_progressbar').css('width', '0px');
							});
						});
						repicJcrop();
					} else {
						//避免'onUploadStart'里面动画在这之后执行
						setTimeout(function() {
							$('.user_progressbar').css('width', '0px');
							alert(json.message);
						}, 1000);
					}
				},
				'onUploadStart': function (file) {
					$('.user_progressbar').css('width', '0px');
					$('.user_progressbar').animate({ "width": "80%" }, 1000 );
				},

				'onUploadError' : function(file, errorCode, errorMsg, errorString) {
					$('.user_progressbar').css('width', '0px');
					if (errorMsg == 413) {
						errorString = '上传图片太大';
					} else {
						errorString = '上传失败';
					}
					alert(errorString);
				}
			});


			$('#fileupload-queue').remove();
	},

	repictrue: function(){
		var $container = $('.repic_mask');
		var repicDialog = new Dialog({
			content: $container.find(".mask_repic").show(),
		});

		var $repicDialogWrap = repicDialog.$wrap;

		var repicWidth = 540;
		var repicHeight = 466;
		var repicLeft = repicWidth/2;
		var repicTop = repicHeight/2+ 1;

		$repicDialogWrap.find('.dialog_inner').css({'width': repicWidth,'height': repicHeight,'margin-left': -repicLeft , 'margin-top': -repicTop});

		$repicDialogWrap.on('click', '.pop_close', function() {
			repicDialog.hide();
		});
		$repicDialogWrap.find('.dialog_inner').css({'width':'540px', 'height': 'auto', 'margin-left':'-280px'})
		$('.user_pic .user_cover').on('click', function() {
			$('.user_progressbar').css('width', '0');
			repicDialog.show();
		})	
	}
})
	
