Z.define('login/reg', {
	initialize: function(opts) {
		this.opts = opts;
		this.$wrap = $('.wrap');
		this.doReg();
		this.doTerms();
		if(typeof ga !== 'undefined') {
			ga('set', 'page', '/reg');
			ga('send', 'pageview');
		}
		this.bindEvt();
		
		var config = {
			 gt: '01655f4c5d0d0f9b22e4f492d1322ec0',
		}
		this.captchaObj = new Geetest(config);
		this.captchaObj.appendTo("#captcha-box");
		this.captchaObj.getValidate();
	},
	bindEvt: function() {
		var $regWrap = $('.reg_content');
		var $regContent = $regWrap.find('.content_info');

		$regWrap.on('click', 'h2', function() {
			$regWrap.find('h2').removeClass('active_h');
			$(this).addClass('active_h');
			var _type = $(this).data('type');

			for(var i = 0 ; i < $regContent.length; i++) {
				if($($regContent[i]).hasClass(_type)) {
					$($regContent[i]).show();	
				} else {
					$($regContent[i]).hide();	
				}
			}
		});
	},
	doReg: function() {
		var self = this;
		var $nickname = $('input[name=nickname]');
		var $mobile = $('input[name=mobile]');
		var $password = $('input[name=password]');
		var $repwd = $('input[name=repwd]');
		var $mobile_code = $('input[name=mobile_code]');
		
		//email
		var $emailname = $('input[name=emailname]');
		var $email = $('input[name=email]');
		var $emailpwd = $('input[name=emailpwd]');
		var $emailrepwd = $('input[name=emailrepwd]');

		//判断结果
		var result= function(ele,type,msg) {
			var $this = ele;
			$this.removeClass('active');
			$this.siblings('.info_error').hide();
			$this.siblings('.info_success').hide();
			if(type == 'success') {
				$this.siblings('.info_success').css('display','inline-block');
			}
			if(type == 'error') {
				$this.addClass('active');
				$this.siblings('.info_error').show().text(msg);
				return;
			}
		}

		//判断
		var judge = function(type) {
			switch(type) {
				case 'nickname':
					var _nickname = $.trim($nickname.val());
					if(_nickname != '') {
						if(_nickname.length > 20) {
							result($nickname,'error', '不超过20字符');
						}else {
							result($nickname,'success');
						}
					}else {
							result($nickname,'error', '请输入昵称');
					}
					break;
				case 'mobile':
					var _mobile = $.trim($mobile.val());
					if(_mobile != '') {
					var pattern = /^[1][3578][0-9]{9}$/;
						if (!pattern.test(_mobile)) {
							result($mobile,'error', '请输入正确手机号');
						}else {
							result($mobile,'success');
						}
					}else {
						result($mobile,'error', '请输入手机号');
					}
					break;
				case 'mobile_code':
					var _mobile_code = $.trim($mobile_code.val());
					if(_mobile_code == '') {
						result($mobile_code,'error', '请输入验证码');
					}
					break;
				case 'password':
					var _password = $.trim($password.val());
					if(_password != '') {
						var pattern = /^[a-zA-Z0-9]{6,20}$/; 
						if (!pattern.test(_password)) {
							result($password,'error', '格式错误');
						}else {
							result($password,'success');
						}
					}else {
						result($password,'error', '请输入密码');
					}
					break;
				case 'repwd':
					var _password = $.trim($password.val());
					var _repwd = $repwd.val();
					if(_password != '') {
						var pattern = /^[a-zA-Z0-9]{6,20}$/; 
						if (!pattern.test(_password)) {
							result($repwd,'error', '格式错误');
						}else if (_password != _repwd) {
							result($repwd,'error', '密码不一致');
						}else {
							result($repwd,'success');
						}
					}
					break;
				case 'emailname':
					var _nickname = $emailname.val();
					if(_nickname != '') {
						if(_nickname.length > 20) {
							result($emailname,'error', '不超过20字符');
						}else {
							result($emailname,'success');
						}
					}else {
							result($emailname,'error', '请输入昵称');
					}
					break;
				case 'email':
					var _email = $.trim($email.val());
					if(_email != '') {
						var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
						if (!pattern.test(_email)) {
							result($email,'error', '请输入正确邮箱');
						}else {
							result($email,'success');
						}
					}else {
						result($email,'error', '请输入邮箱');
					}
					break;
				case 'emailpwd':
					var _password = $.trim($emailpwd.val());
					if(_password != '') {
						var pattern = /^[a-zA-Z0-9]{6,20}$/; 
						if (!pattern.test(_password)) {
							result($emailpwd,'error', '格式错误');
						}else {
							result($emailpwd,'success');
						}
					}else {
						result($emailpwd,'error', '请输入密码');
					}
					break;
				case 'emailrepwd':
					var _password = $.trim($emailpwd.val());
					var _repwd = $emailrepwd.val();
					if(_password != '') {
						var pattern = /^[a-zA-Z0-9]{6,20}$/; 
						if (!pattern.test(_password)) {
							result($emailrepwd,'error', '格式错误');
						}else if (_password != _repwd) {
							result($emailrepwd,'error', '密码不一致');
						}else {
							result($emailrepwd,'success');
						}
					}
					break;
			}
		}

		var $judge= this.$wrap.find('.reg_judge');
		//判断状态
		$judge.on('focus', function() {
			result($(this));
		});
		$judge.on('blur', function() {
			var $this = $(this);
			var type = $this.attr('name');
			judge(type);
		});

		//获取手机验证码
		var getCodeTime = 60;
		var $getCode = this.$wrap.find('.get_code');
		$getCode.on('click', btnCode);
		var codeTimer = null;
		function btnCode(){
			var pattern = /^[1][3578][0-9]{9}$/;
			var _mobile = $mobile.val();
			
			if (pattern.test(_mobile)) {
				var i = getCodeTime;
				$getCode.off('click');
				codeTimer = setInterval(function(){
					i--;
					$getCode.html('已发送(' + i + ')');
					if( i == 0 ){
						clearInterval(codeTimer);
						$getCode.html('获取验证码').on('click', btnCode);
					}
				}, 1000);
				$.post('/login/sendMobileCode', {mobile: _mobile,YII_CSRF_TOKEN: self.opts.YII_CSRF_TOKEN}, function(json) {
				
				}, 'json');
			}else{
				$mobile.addClass('active');
				$mobile.siblings('.info_error').show().text('请输入正确手机号');
				return false;
			}
		};

		var $regBtn = this.$wrap.find('.reg_btn');
		$regBtn.on('click', function() {
			var $this = $(this);
			if($this.text() == '提交中..') {
				return false;
			}

			var requestData = {};

			if(F.parseURL().params.type != 'email') {   //默认进来手机注册
				//手机注册	
				judge('nickname');
				judge('mobile');
				judge('password');
				judge('repwd');
				judge('mobile_code');
				
				requestData = {
					nickname: $.trim($nickname.val()),
					mobile: $.trim($mobile.val()),
					mobile_code: $.trim($mobile_code.val()),
					password: $.trim($password.val()),
					repwd: $.trim($repwd.val()),
					redirect: self.opts.redirect,
					verify: $('input[name=verification]').val(),
					YII_CSRF_TOKEN: self.opts.YII_CSRF_TOKEN,
					type: 'phone'
				}
				requestData.geetest_challenge = $.trim($("input[name=geetest_challenge]").val());
				requestData.geetest_validate = $.trim($("input[name=geetest_validate]").val());
				requestData.geetest_seccode = $.trim($("input[name=geetest_seccode]").val());
			} else {
				//邮箱注册	
				judge('emailname');
				judge('email');
				judge('emailpwd');
				judge('emailrepwd');
				
				requestData = {
					nickname: $.trim($emailname.val()),
					email: $.trim($email.val()),
					password: $.trim($emailpwd.val()),
					repwd: $.trim($emailrepwd.val()),
					redirect: self.opts.redirect,
					verify: $('input[name=verification]').val(),
					YII_CSRF_TOKEN: self.opts.YII_CSRF_TOKEN,
					type: 'email'
				}
				requestData.geetest_challenge = $.trim($("input[name=geetest_challenge]").val());
				requestData.geetest_validate = $.trim($("input[name=geetest_validate]").val());
				requestData.geetest_seccode = $.trim($("input[name=geetest_seccode]").val());
			}
			var $infoError = $('.info_error');
			if($infoError.is(':visible')) {
				return;
			}

			if (!$('.select_box').hasClass('active')) {
				alert('请确认注册条款');
			} else {
				$this.text('提交中..');
				$.post('/login/newRegist', requestData, function(json) {

					$this.text('注册');

					if (json.status == 200) {
						if(requestData.type == 'phone') {	
							F.ga('button','click','reg_Total');
							StatReg('pc', json.message.category, '2.0', json.message.uid, json.message.resource);
							window.location.href = json.message.url;
						} else {
							var _uid = json.message.uid;
							var _username = json.message.username;
							var _time = json.message.time;
							window.location.href = WWW_HOST + 'login/emailval?uid='+ _uid + '&email=' + requestData.email + '&redirect='+ requestData.redirect;
						}
					} else {
						alert(json.message);
						if(json.message == '手机验证失败，请重新尝试') {
							$mobile_code.val('').focus();
							return;
						}
						/*	
						$('#img_code').attr('src',WWW_HOST + 'login/viewCode?a=1&t=' + (+new Date()));
						$('#img_code').siblings('input[name="verification"]').val('');
						*/	
					}

				}, 'json');
			}

		});
	},
	doTerms: function() {
		var $regTerms = this.$wrap.find('.reg_terms')
		var $mask = $('#mask');
		$regTerms.on('click', function() {
			var $this = $(this);
			var $selectBox = $this.find('.select_box');
			if($selectBox.hasClass('active')) {
				$mask.show();
			}
		})
		$('.content_close').on('click', function() {
			$mask.hide();
		})

	}
})
