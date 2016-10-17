Z.define('reg/regist', {
	initialize: function() {
		var phoneHeight=$(window).height()-44;
		this.$container = $('.mfix_reg');
		this.$logError =this.$container.find('.inner_error');
		this.$regBtn =this.$container.find('#mfix_reg');
		this.$container.css("height",phoneHeight);
		this.bindEvent();
	},

	bindEvent: function() {
		var self = this;

		self.$container.find('input').on('focus', function() {
			self.$logError.hide();
		});


		self.$regBtn.on('click', function() {
			var $this = $(this);
			if($this.text() == '提交中..') {
				return false;
			}

			var username = $('input[name=username]').val();
			var password = $('input[name=password]').val();
			var verify = $('input[name=verification]').val();
			var email = $('input[name=email]').val();
			var repwd = $('input[name=repassword]').val();

			if (username.length == 0) {
				self.showErrorMsg('请输入用户名');
			} else if (email.length == 0 || !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
				self.showErrorMsg('请输入正确的邮箱');
			} else if (password.length < 6 || password.length > 20) {
				self.showErrorMsg('密码不应小于6位，大于20位');
			} else if (password != repwd) {
				self.showErrorMsg('确认密码不一致');
			} else {
				$this.text('提交中..');
				$.post('/mobile/regist', {username: username, password: password, repwd: repwd, email: email, verify: verify}, function(json) {
					$this.text('注册');
					if (json.status == 200) {
						if (email.length != 0) {
							self.showErrorMsg(json.message);
						} else {
							window.location.href = '/mobile';
						}
					} else {
						self.showErrorMsg(json.message);
					}
				}, 'json');
			}

		});
	},
	
	showErrorMsg: function(msg) {
		this.$logError.text(msg);
		this.$logError.show();
	}
})
