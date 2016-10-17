Z.define('footer/footer', {
	initialize: function() {
		this.$wrap= $('.global_footer');
		this.bindEvent();
	},
	bindEvent: function(){ 
		var self = this;
		var $doc= $(document);

		var $sideBtn = $('.side_btn');
		var $toUp = $sideBtn.find('.to_up');

		$(window).scroll(function(){
			if( $doc.scrollTop() > $(window).height()/4 ){
				$sideBtn.css('bottom', '40px'); 
			}
			else{
				$sideBtn.css('bottom', '-90px');
			}
		});

		$toUp.click(function(){
			$('body,html').animate({scrollTop:0}, 300);	
		});

		//判断是否为手机详情页，显示用户反馈按钮
		var $contectBtn = $sideBtn.find('.contect_btn');
		var $contentWriter = $('.content_writer');
		var $bgWriter = $('.bg_writer');

		if( window.mobile_id ) $contectBtn.show();
		//手机详情页——用户反馈对话框
		var $userReply = $('.user_reply');
		var replyDialog = new Dialog({
			content: $userReply.show(),
			close: function(){
				$bgWriter.hide();
			}
		});
		var $replyDialogWrap = replyDialog.$wrap;
		$replyDialogWrap.on('click', '.pop_close', function() {
			replyDialog.hide();
		});
		$replyDialogWrap.find('.dialog_inner').css({
			'width':'460px', 
			'height': '220px',
			'margin-top':'-110px', 
			'margin-left':'-230px'
		}).addClass('contect_dialog');

		var $bgContent = $userReply.find('.bg_content');
		$contectBtn.on('click', function(){
			if( islogin ){
				replyDialog.show();
				$bgWriter.show();
			} else {
				window.location.href = WWW_HOST + '/login/index?redirect=' + encodeURIComponent(window.location.href);
			}
		});
		//提交反馈按钮
		var btnTrigger = false;//防止多次点击
		var $textarea = $bgContent.find('textarea');
		$textarea.on('focus', function(){
			$(this).html('');
		});
		$bgContent.on('click', '.contect_btn', function(){
			if( !btnTrigger ){
				var $this = $(this);
				$(this).html('提交中');
				if( $textarea.val() == '请输入您的反馈内容...' || !$textarea.val() ) {
					alert('请填写内容');
					return false;
				} else {
					btnTrigger = true;
					var _html = '<p>感谢您的建议和反馈！</p><p>我们会考虑您的建议，也欢迎您持续地监督我们~</p>';
					$replyDialogWrap.find('.dialog_inner').fadeOut(600);
					$contentWriter.html(_html).animate({'margin-top': '-100px'}, 600);
					$bgWriter.addClass('bg_writer_perspective');
					var _animation = 'writer 1s ease-in 0s 1 normal forwards';
					$.get('/data/suggest', {content: $textarea.val()}, function(json){
						if( json.status == 200 ){
							$contentWriter.css({
								'animation': _animation,
								'-webkit-animation': _animation,
								'-moz-animation': _animation, 
								'-o-animation': _animation
							});
							setTimeout(function(){
								location.reload();
							}, 1000);
						} else {
							alert(json.message);
						}
						btnTrigger = false;
					}, 'json');
					
					
				}
			}
		});

		var $wechatBtn = self.$wrap.find('.wechat_btn');
		var $wechatImg = self.$wrap.find('.wechat_img');
		$wechatBtn.on('mouseenter', function(){
			$wechatImg.stop().show();
		});
		$wechatBtn.on('mouseleave', function(){
			$wechatImg.stop().hide();
		});
	}
});
	
