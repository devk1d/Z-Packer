Z.define('login/login', {
	initialize: function(opts) {
		this.opts = opts;
		this.$wrap = $('.wrap');
		this.doLogin();
		if(typeof ga !== 'undefined') {
			ga('set', 'page', '/login');
			ga('send', 'pageview');
		}
		$.get('/login/getCsrf',{t: +new Date()}, function(json) {
			if( json.status == 200) { 
					//弹窗登录
				$('input[name=YII_CSRF_TOKEN]').val(json.message);
			}
		},'json');
	},
	//操作登录
	doLogin: function() {
		var self = this;
		var $logBtn = this.$wrap.find('.login_btn');

		$logBtn.on('click', function() {
			var $this = $(this);

			if($this.text() == '提交中..') {
				return false;
			}

			var requestData = {};
			requestData = {
				username: $('input[name="username"]').val(),
				password: $('input[name="password"]').val(),
				verify: $('input[name=verification]').val(),
				redirect: self.opts.redirect,
				YII_CSRF_TOKEN: $('input[name=YII_CSRF_TOKEN]').val(),
				remember: 0
			}

			if ($('.select_box_login').hasClass('active')) {
				requestData.remember = 1;
			}

			if (requestData.username.length == 0) {
				alert('请输入用户名');
			} else if (requestData.password.length == 0) {
				alert('请输入密码');
			} else {
				$this.text('提交中..');
			    $.post(WWW_HOST+ 'login/login', requestData, function(json) {
					$this.text('登录');
					if (json.status == 200) {
						StatLogin('pc', json.message.category, '2.0', json.message.uid);
						window.location.href = json.message.redirect;
					} else if(json.status == 'verify') {
						alert(json.message);
						setTimeout(function() {
							location.reload();
						}, 400);
					} else if(json.status == 'error') {
						alert(json.message);
						$('#img_code').attr('src',WWW_HOST + 'login/viewCode?a=0&t=' + (+new Date()));
						$('#img_code').siblings('input[name="verification"]').val('');

					} else if(json.status == 'emailtip') {
						//邮箱验证未激活	
						var _uid = json.message.id;
						var _usename = json.message.username;
						var _time = json.message.created_at;
						var _email = json.message.email;
						
						window.location.href = WWW_HOST + 'login/emailtip?uid=' + _uid + '&email=' + _email + '&redirect=' + requestData.redirect;
					} else {
						alert(json.message);
					}

				}, 'json')
			}

			return false;
		});
	},
})
