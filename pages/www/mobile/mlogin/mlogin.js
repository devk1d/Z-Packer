
Z.define('login/mlogin', {
	initialize: function() {
		this.mlogin();
		this.regist();
		this.weiboReg();
		this.verify();
	},
	verify: function() {
		var $img_code = $('.mlogin_inner').find('#img_code');

		$img_code.on('click', function() {
			var type = $(this).data('type') == "reg"?1:0;

			this.src = WWW_HOST + 'login/viewCode?a='+ type +'&t=' + (+new Date());
			$(this).parent().siblings('input[name="verification"]').val('').focus();
		});
	},
	mlogin: function() {
		var phoneHeight=$(window).height()-44;
		if(phoneHeight<400) {
			phoneHeight = 400;

		}
		$('.mlogin_inner').css("height",phoneHeight);


		var $logAjax = null;
		var $logBtn = $('.inner_login');
		var $logError = $('.inner_error');

		$('input').on('focus', function() {
			$logError.hide();
		});

		$logBtn.on('click', function() {
			var pri_code = '';
			if( F.parseURL().params.pri_code != 'undefined') {
			    pri_code = F.parseURL().params.pri_code;
			}
			var $this = $(this);
			var username = $('input[name="username"]').val();
			var password = $('input[name="password"]').val();
			var verify = $('input[name="verify"]').val();
			var from = $('input[name="from"]').length >0 ? $('input[name="from"]').val() : '';
			var openid = $('input[name="openid"]').length >0 ? $('input[name="openid"]').val() : '';
			var redirect = $('input[name="redirect"]').length >0 ? $('input[name="redirect"]').val() : '';
		
			var model = $('input[name="model"]').length >0 ? $('input[name="model"]').val() : '';
			var mid = $('input[name="mid"]').length >0 ? $('input[name="mid"]').val() : '';
			var cid = $('input[name="cid"]').length >0 ? $('input[name="cid"]').val() : '';
			var service_id = $('input[name="service_id"]').length >0 ? $('input[name="service_id"]').val() : '';
			var YII_CSRF_TOKEN = $('input[name=YII_CSRF_TOKEN]').val();

			if($this.text() == '登录中..') {
				return false;
			} else if (username.length == 0) {
				alert('请输入用户名');
			} else if (password.length == 0) {
				alert('请输入密码');
			} else {
				$this.text('登录中..');
				$.post('/mobile/commonLogin', {username: username, password: password, verify: verify, 
				from: from, openid: openid, redirect: redirect, model: model, mid: mid, cid: cid, service_id: service_id, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json) {
					$this.text('登录');
					//社区移动端临时登录数据统计,社区
					if(/plus/.test(redirect)) {
						F.ga('button','click','社区移动端登录用户总数');
					}
					if (json.status == 200) {
						StatLogin('h5', json.message.category, '2.0', json.message.uid);

						if(redirect) {   
							redirect = decodeURIComponent(redirect);
							redirect = redirect.replace(/&amp;/g, '&');
							window.location.href = redirect;
						}else {
							window.location.href = '/';
						}
					} else {
						if(json.message == '请输入图形验证码') {
							location.reload();
					}
						$logError.text(json.message);
						$logError.show();
					}
				}, 'json')
			}
		});
	},

	regist: function() {

		var phoneHeight=$(window).height()-44;
		var $wrap = $('.mfix_reg');
		var $logError = $wrap.find('.inner_error');
		var $regBtn = $wrap.find('#mfix_reg');
		$wrap.css("height",phoneHeight);

        var showErrorMsg = function(msg) {
			$logError.text(msg);
			$logError.show();
		}

		$wrap.find('input').on('focus', function() {
			$logError.hide();
		});

		//定义
		$mobile = $wrap.find('.inner_mobile');

		//获取手机验证码
		var getCodeTime = 60;
		var $getCode = $wrap.find('.get_code');
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
				$.post('/login/sendMobileCode', {mobile: _mobile,YII_CSRF_TOKEN: $('input[name=YII_CSRF_TOKEN]').val()}, function(json) {
				
				}, 'json');
			}else{
				showErrorMsg('请输入正确手机号');
				return false;
			}
		};




		$regBtn.on('click', function() {
			var $this = $(this);
			if($this.text() == '提交中..') {
				return false;
			}

			var username = $('input[name=username]').val();
			var password = $('input[name=password]').val();
			var verify = $('input[name=verification]').val() || '';
			var mobile= $.trim($('input[name=mobile]').val());
			var mobile_code = $('input[name=mobile_code]').val();
			var repwd = $('input[name=repassword]').val();
			var from = $('input[name="from"]').length >0 ? $('input[name="from"]').val() : '';
			var openid = $('input[name="openid"]').length >0 ? $('input[name="openid"]').val() : '';
			var redirect = $('input[name="redirect"]').length >0 ? $('input[name="redirect"]').val() : '';
			var YII_CSRF_TOKEN = $('input[name=YII_CSRF_TOKEN]').val();

			if (mobile.length == 0 || !/^[1][3578][0-9]{9}$/.test(mobile)) {
				showErrorMsg('请输入正确的手机号码');
			} else if(mobile_code.length == 0) {
				showErrorMsg('请输入手机验证码');
			} else if (password.length < 6 || password.length > 20) {
				showErrorMsg('密码不应小于6位，大于20位');
			} else if (password != repwd) {
				showErrorMsg('确认密码不一致');
			} else {
				$this.text('提交中..');

				var requestData = {};
				requestData = {
					nickname: $.trim(username),
					mobile: $.trim(mobile),
					mobile_code: $.trim(mobile_code),
					password: $.trim(password),
					repwd: $.trim(repwd),
					redirect: redirect,
					verify: verify,
					YII_CSRF_TOKEN: YII_CSRF_TOKEN
				}

				$this.attr('disabled', 'disabled');
				$.post('/login/newRegist', requestData, function(json) {
					$this.removeAttr('disabled', 'disabled');
					$this.text('注册');
					if (json.status == 200) {
						StatReg('h5', json.message.category, '2.0', json.message.uid, json.message.resource);
						if(redirect) {   
							redirect = decodeURIComponent(redirect);
							redirect = redirect.replace(/&amp;/g, '&');
							window.location.href = redirect;
						}else {
							window.location.href = '/';
						}
					} else {
						showErrorMsg(json.message);
						$('#img_code').attr('src',  WWW_HOST + 'login/viewCode?a=1&t=' + (+new Date()));
						$('input[name=verification]').val('');
					}
				}, 'json');
			}

		});		
	},

	weiboReg: function() {

		var $wrap = $('.weiboReg_inner');
		var $logBtn = $wrap.find('.weiboReg_btn');
		var $logError = $wrap.find('.inner_error');

		$logBtn.on('click', function() {
			var $this = $(this);
			var username = $('input[name="username"]').val();
			var social_user_id = $('input[name="social_user_id"]').val();
			var social_type = $('input[name="social_type"]').val();
			var token = $('input[name="token"]').val();
			var expires_in = $('input[name="expires_in"]').val();
			var redirect= $('input[name="redirect"]').val();
			var from = $('input[name="from"]').val();
			var YII_CSRF_TOKEN = $('input[name=YII_CSRF_TOKEN]').val();

			if($this.text() == '提交中..') {
				return false;
			} else if (username.length == 0) {
				alert('请输入用户名');
			} else {
				$this.text('提交中..');
				$.post('/login/regist', {username: username, from: from, redirect: redirect, social_user_id: social_user_id, social_type: social_type, token: token, expires_in: expires_in, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json) {
					$this.text('确认');
					if (json.status == 200) {
						if(redirect) {   
							redirect = decodeURIComponent(redirect);
							redirect = redirect.replace(/&amp;/g, '&');
							window.location.href = redirect;
						}else {
							window.location.href = '/';
						}
					} else {
						alert(json.message);
					}
				}, 'json')
			}
		});
	},
})
