Z.define('login/forgot', {
	initialize: function(opts) {
		this.opts = opts;
		this.$wrap = $('.wrap');
	    this.opts.step == 1 && this.stepOne();  //找回密码
		this.opts.step == 2 && this.stepTwo();  //通过手机找回
		this.opts.step == 4 && this.stepFour();  //发送邮件
		this.opts.step == 5 && this.stepFive();  //等待邮件
		this.opts.step == 6 && this.setPassword();  //重设密码
		this.bindEvent(); 
	},
	bindEvent: function() {
		var self = this;
		//判断状态
		var $judge= this.$wrap.find('.forgot_judge');

		$judge.on('focus', function() {
			self.result($(this));
		})
		$judge.on('blur', function() {
			var $this = $(this);
			var type = $this.attr('name');
			self.judge(type);
		})


	},
	judge: function(type) {
		var self = this;
		var $password = $('input[name="password"]');
		var $repwd = $('input[name="repwd"]');
		var $email = $('input[name="email"]');
		var $mobile = $('input[name="mobile"]');
		var $mobile_code = $('input[name="mobile_code"]');

		switch(type) {
			case 'mobile':
				var _mobile = $.trim($mobile.val());
				if(_mobile != '') {
				var pattern = /^[1][3578][0-9]{9}$/;
					if (!pattern.test(_mobile)) {
						self.result($mobile,'error', '请输入正确手机号');
					}else {
						self.result($mobile,'success');
					}
				}else {
					self.result($mobile,'error', '请输入手机号');
				}
				break;
			case 'mobile_code':
				var _mobile_code = $.trim($mobile_code.val());
				if(_mobile_code == '') {
					self.result($mobile_code,'error', '请输入验证码');
				}
				break;
			case 'email': 
				var _email = $.trim($email.val());
				if(_email != '') {
					var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if (!pattern.test(_email)) {
						self.result($email,'error', '格式错误');
					}else {
						self.result($email,'success');
					}
				}else {
					self.result($email,'error', '请输入邮箱');
				}
				break;
			case 'password':
				var _password = $.trim($password.val());
				if(_password != '') {
					var pattern = /^[a-zA-Z0-9]{6,20}$/; 
					if (!pattern.test(_password)) {
						self.result($password,'error', '密码格式应为英文、数字，6-20位字符格式');
					}else {
						self.result($password,'success');
					}
				}else {
					self.result($password,'error', '请输入密码');
				}
				break;
			case 'repwd':
				var _password = $.trim($password.val());
				var _repwd = $repwd.val();
				if(_password != '') {
					var pattern = /^[a-zA-Z0-9]{6,20}$/; 
					if (!pattern.test(_password)) {
						self.result($repwd,'error', '格式错误');
					}else if (_password != _repwd) {
						self.result($repwd,'error', '密码不一致');
					}else {
						self.result($repwd,'success');
					}
				}
				break;
		}

	},
	result: function(ele,type,msg) {
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

	},
	stepOne: function() {
		var $stepOneBtn = this.$wrap.find('.step_one_btn');
		var $pageSelect = this.$wrap.find('.page_select');
		$pageSelect.on('click', function() {
			var $this = $(this);

			if($this.hasClass('go_mobile'))  {
				$stepOneBtn.data('num', 2);  //手机找回
			}

			if($this.hasClass('go_email'))  {
				$stepOneBtn.data('num', 4); //邮箱找回
			}

		})

		// 选择找回密码方式
		$stepOneBtn.on('click', function() {
			var $this = $(this);
			if($this.data('num')) {
				location.href = "/forgot?step="+$this.data('num');
			}else {
				alert('请选择找回密码方式');
			}
		})
	},
	stepTwo: function() {
		var self = this;
		var $stepTwoBtn = this.$wrap.find('.step_two_btn');
		var $mobile = this.$wrap.find('input[name="mobile"]');
		var $mobile_code = this.$wrap.find('input[name="mobile_code"]');

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
				$.post('login/sendMobileCode', {mobile: _mobile,YII_CSRF_TOKEN: self.opts.YII_CSRF_TOKEN}, function(json) {
				
				}, 'json');
			}else{
				$mobile.addClass('active');
				$mobile.siblings('.info_error').show().text('请输入正确手机号');
				return false;
			}
		};

		//下一步操作 
		$stepTwoBtn.on('click', function() {
			var $this = $(this);
			var _mobile = $mobile.val();
			var _code = $mobile_code.val();

			self.judge('mobile');
			self.judge('mobile_code');

			var $infoError = $('.info_error');
			if($infoError.is(':visible')) {
				return;
			}

			$.post('/login/confirmMobileCode', {mobile: _mobile, code: _code, YII_CSRF_TOKEN: self.opts.YII_CSRF_TOKEN}, function(json) {
				if(json.confirmation) {
					location.href = WWW_HOST+'login/resetpassword?confirmation='+json.confirmation;
				}else {
					alert(json.message);
				}

			},'json');
				
		})

	},
	stepFour: function() {
		var self = this;
		var $stepFourBtn = this.$wrap.find('.step_four_btn');
		var $email = $('input[name="email"]');

		//设置cookie
		function setCookie(c_name,value,expiredays) {
			var exdate=new Date()
			exdate.setDate(exdate.getDate()+expiredays)
			document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
		}

		$stepFourBtn.on('click', function() {
			var $this = $(this);
			if($this.text() == '提交中..') {
				return false;
			}

			var _email = $email.val();
			var _verify = $('input[name=verification]').val();

			//判断邮箱
			self.judge('email');

			if (_email.length == 0) {
				alert('请输入注册邮箱');
			} else {
				setCookie('z_email', _email, 1);  //设置cookie

				$this.text('提交中..');
				$.post('/login/sendMail', {email: _email, verify_code: _verify, YII_CSRF_TOKEN: self.opts.YII_CSRF_TOKEN}, function(json) {
					$this.text('下一步');
					if (json.status == 200) {
						location.href = "/forgot?step=5";
						setCookie('z_email', _email, 1);  //设置cookie
					} else {
						alert(json.message);
						$('#img_code').attr('src',WWW_HOST + 'login/viewCode?a=2&t=' + (+new Date()));
						$('#img_code').parent().siblings('input[name="verification"]').val('');
					}

				}, 'json')
			}
		})
	},
	stepFive: function() {
		var self = this;

		function getCookie(c_name) {
			if (document.cookie.length>0) { 
				c_start=document.cookie.indexOf(c_name + "=")
				if (c_start!=-1) { 
					c_start=c_start + c_name.length+1 
					c_end=document.cookie.indexOf(";",c_start)
					if (c_end==-1) c_end=document.cookie.length
						return unescape(document.cookie.substring(c_start,c_end))
				} 
			}
			return '';
		}

		//获取写入的cookie
		var $sendMail = this.$wrap.find('#sendMail');
		var _z_email = getCookie('z_email');

		var email_reg = {
			"foxmail.com":"mail.foxmail.com",
			"qq.com":"mail.qq.com",
			"vip.qq.com":"mail.qq.com",
			"gmail.com":"mail.google.com",
			"163.com":"mail.163.com",
			"126.com":"mail.126.com",
			"188.com":"mail.188.com",
			"sina.com":"mail.sina.com",
			"sohu.com":"mail.sohu.com",
			"yahoo.cn":"mail.cn.yahoo.com",
			"yahoo.com.cn":"mail.cn.yahoo.com",
			"hotmail.com":"mail.hotmail.com",
			"live.com":"mail.live.com"
		};

		var $stepFiveBtn = this.$wrap.find('.step_five_btn');

		if( _z_email.split("@").length && email_reg[_z_email.split("@")[1]]) {
			$stepFiveBtn.data('match', email_reg[_z_email.split("@")[1]]).show();
		}

		$stepFiveBtn.on('click', function() {
			var _match = $stepFiveBtn.data('match');
			_match  && window.open("http://"+_match);

		})

		if($sendMail.attr('href')) {
			$sendMail.show();
		}

		$sendMail.html(_z_email);
	},
	setPassword: function() {
		var self = this;

		//验证密码
		var $password = this.$wrap.find('input[name="password"]');
		var $repwd = this.$wrap.find('input[name="repwd"]');

		var _password = $.trim($password.val());
		var $stepSixBtn = this.$wrap.find('.step_six_btn');

		$stepSixBtn.on('click', function() {
			var $this = $(this);

			if($this.text() == '提交中..') {
				return false;
			}
			var _password = $password.val();
			var _repwd = $repwd.val();

			//判断密码
			self.judge('password');
			self.judge('repwd');

			var $infoError = $('.info_error');
			if($infoError.is(':visible')) {
				return;
			}

		    var _confirmation = F.parseURL().params.confirmation ? F.parseURL().params.confirmation : '';

			$.post('/login/resetPwd', {pwd: _password, repwd: _repwd, confirmation: _confirmation, YII_CSRF_TOKEN: self.opts.YII_CSRF_TOKEN}, function(json) {
				$this.text('确认');
				if (json.status == 200) {
					window.location.href = WWW_HOST;
				} else {
					//忘记密码失效
					var r = confirm(json.message)
					if(r) {
						location.href = '/forgot';
					}else {
						location.href = WWW_HOST;
					}
					
				}
			}, 'json')

		})


	}
})
