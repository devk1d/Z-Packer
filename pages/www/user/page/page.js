Z.define('page/page', {
	initialize: function() {
		this.$wrap = $('.wrap');
		this.load();
		this.mouseImg();
	},
	load: function() { 
		var self = this;
		var params = F.parseURL().params;
		var otype = params.pagetype == undefined ? 'setaccount' : params.pagetype;
		var code = params.code;
		var email = params.email;
		var f = params.f ? params.f : null;
		var pwd = params.pwd;
		var setEmail = params.setEmail;
		self.$wrap.find('.content_left a').removeClass('sidebar_active').closest('[otype=' + otype + ']').addClass('sidebar_active');
		var $contentRight= self.$wrap.find('.content_right');
		var YII_CSRF_TOKEN = $('input[name=YII_CSRF_TOKEN]').val();
		$.get('/user', {pagetype: otype, clear: 1}, function(json) {
			if(json.status == 200) {
				$contentRight.html(json.message.html);
				switch (otype){
					case 'setbasic':
						self.setbasic();
						break;
					case 'setmail':	 
						self.addBind();
						self.modifyBind();
						//当客户在邮箱点击链接打开页面时
						if( code && email && pwd ){
							var backTimer = null;
							//创建客户邮箱验证新开对话框
							var $successBg = $('.success_bg');
							var repicDialog = new Dialog({
								content: $successBg.show(),
							});
							var $repicDialogWrap = repicDialog.$wrap;
							$repicDialogWrap.on('click', '.pop_close', function() {
								repicDialog.hide();
							});
							$repicDialogWrap.find('.dialog_inner').css({'width':'540px', 'height': 'auto','margin-top':'-260px', 'margin-left':'-280px'});

							var $backNewMail = $successBg.find('.new_mail');
							var $sBgContent = $successBg.find('.bg_content');
							//验证是否为旧邮箱
							if( setEmail == 'old' && pwd == 'y' ){
								$.post('/user/oldEmailVerify', {code:code, email:email, YII_CSRF_TOKEN: YII_CSRF_TOKEN, f: f}, function(json){
									if( json.status == '原邮箱通过验证' ){
										repicDialog.show();
										$sBgContent.find('.continue_to_mail').show();
										//验证旧邮箱成功继续输入新邮箱的下一步
										$successBg.on('click', '.mail_next', function(){
											var mailReg = /^([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i; 
											var mailTest = mailReg.test($backNewMail.val());
											var url = '/user/emailSendCode';
											var setEmail = 'new';
											if( mailTest ){
												$.post(url, {email:$backNewMail.val(), type:setEmail,YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
													if(json.status == '邮箱验证码发送成功'){
														$sBgContent.children().hide();
														$sBgContent.find('.mail_waiting').show().find('.success_tip span').html('请前往'+$backNewMail.val()+'查收完成验证。未收到邮件？');
														var $tipBack = $sBgContent.find('.success_tip .tip_back');
														$tipBack.on('click', function(){
															$(this).css({'color':'#6d737e', 'text-decoration':'none', 'cursor':'default'});
															$(this).off('click');
															$.post(url, {email:$backNewMail.val(), type:setEmail, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
															}, 'json');
														});
													} else {
														alert(json.message);
														return false;
													}
												}, 'json');
											}
											else{ 
												alert("请输入正确的邮箱");
												return false;
											}
										});
									}
									else{
										alert(json.message);
										return false;
									}
								}, 'json');
							}
							else if( setEmail == 'new' && pwd == 'y' ){
								//客户设置点击邮件链接后确认新邮箱
								$.post('/user/emailVerify', {email:email, code:code, pwd: pwd, YII_CSRF_TOKEN: YII_CSRF_TOKEN, f: f}, function(json){
									if( json.message == '' ){
										repicDialog.show();
										$sBgContent.children().hide();
										$sBgContent.find('.content_success').show();
										var $tipBack = $successBg.find('.tip_back');
										var i = 3;
										$sBgContent.find('.pop_close').on('click', function(){ 
											window.location.href = '/';
										});
										$('.dialog_closebg').on('click', function(){
											window.location.href = '/';
										});
										backTimer = setInterval(function(){ 
											i--;
											var html = i + 's后自动返回>'; 
											$tipBack.html( html );
											if( i == 0 ){
												clearInterval(backTimer);
												window.location.href = "/user?pagetype=setmail";
											}
										}, 1000);
									}
									else{ 
										alert(json.message);
										return false;
									}
								}, 'json');
							}
							else if(  pwd == 'n' && setEmail == 'new' ){
								//新增邮箱验证后打开输入密码对话框
								repicDialog.show();
								$sBgContent.children().hide();
								var $conPwd = $sBgContent.find('.content_pwd');
								var $mailPwd = $conPwd.find('.mail_pwd');
								var $mailNext = $conPwd.find('.mail_next');
								$conPwd.show();
								$mailNext.on('click', function(){ 
									var pwdReg = /^[a-zA-Z0-9]{6,20}$/;
									var testPwd = pwdReg.test($mailPwd.val());
									pwdVal = $mailPwd.val();
									if( testPwd ){
										$.post('/user/emailVerify', {email:email, code:code, password: pwdVal, pwd: pwd, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
											if( json.message == '' ){
												repicDialog.show();
												$sBgContent.children().hide();
												$sBgContent.find('.content_success').show();
												var $tipBack = $successBg.find('.tip_back');
												var i = 3;
												$sBgContent.find('.pop_close').on('click', function(){ 
													window.location.href = '/';
												});
												$('.dialog_closebg').on('click', function(){
													window.location.href = '/';
												});
												backTimer = setInterval(function(){ 
													i--;
													var html = i + 's后自动返回>'; 
													$tipBack.html( html );
													if( i == 0 ){
														clearInterval(backTimer);
														window.location.href = "/user?pagetype=setmail";
													}
												}, 1000);
											}
											else{ 
												alert(json.message);
												return false;
											}
										}, 'json');
									}
								});
							}
						}
						break;
					case 'setpsd':
						self.changePwd();
						break;
					case 'setaccount':
						self.socialChange();
						break;
					case 'mycom':
						self.mycomList();
						break;
					case 'appro':
						//self.approList();
						break;
				}
			}
		}, 'json');
	},

	addBind: function() { 
		var self = this;
		var $userBind = self.$wrap.find('.user_bind');
		var $bindPhone = $userBind.find('.bind_phone');
		var $bindMail = $userBind.find('.bind_mail');
		var $addPhone = $bindPhone.find('.phone_add');
		var $addMail = $bindMail.find('.mail_add');
		var YII_CSRF_TOKEN = $('input[name=YII_CSRF_TOKEN]').val();
		
		//创建绑定手机对话框
		var $container = $('.show_bg');
		var repicDialog = new Dialog({
			content: $container.show(),
		});
		var $repicDialogWrap = repicDialog.$wrap;
		$repicDialogWrap.on('click', '.pop_close', function() {
			repicDialog.hide();
		});
		$repicDialogWrap.find('.dialog_inner').css({'width':'540px', 'height': 'auto','margin-top':'-260px', 'margin-left':'-280px'})

		var $bgContent = $container.find('.bg_content');
		//点击手机添加
		$addPhone.on('click', function() {
			repicDialog.show();
			$bgContent.children().hide();
			$bgContent.find('.phone_input').show();
		});
		//点击邮箱添加
		$addMail.on('click', function() {
			repicDialog.show();
			$bgContent.children().hide();
			$bgContent.find('.mail_input').show();
		});

		var $newPhone = $bgContent.find('.new_phone');
		var $phoneCode = $bgContent.find('.phone_code');
		var $phonePwd = $bgContent.find('.phone_pwd');
		var $getCode = $bgContent.find('.get_code');
		var $phoneNext = $bgContent.find('.phone_next');
		var $phoneSuccess = $bgContent.find('.phone_success');
		var $phoneInput = $bgContent.find('.phone_input'); 

		var $newMail = $bgContent.find('.new_mail');
		var $mailNext = $bgContent.find('.mail_next');

		//是否设置过密码
		var pwd = 'y';
		if( $phonePwd.length != 0 ){ 
			pwd = 'n'
		}
		//绑定成功后的‘自动返回’计时器
		var backTimer = null;
		//获取验证码
		var getCodeTime = 60;
		$getCode.on('click', btnCode);
		var codeTimer = null;
		function btnCode(){
			var phoneReg = /^[1][3578][0-9]{9}$/;
			var testPhone = phoneReg.test($newPhone.val());
			var url = '/user/getCode';
			
			if(testPhone){
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
				$.post(url, {mobile: $newPhone.val(),YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
				
				}, 'json');
			}
			else{
				alert("请输入正确的手机号码");
				return false;
			}
		};

		//点击下一步发送验证码
		$phoneNext.on('click', function(){ 
			var phoneReg = /^[1][358][0-9]{9}$/;
			var testPhone = phoneReg.test($newPhone.val());
			var codeReg = /^[0-9]{6}$/;
			var testCode = codeReg.test($phoneCode.val());
			var pwdSet = 0;
			if( $phonePwd.length == 0 ){ 
				testPwd = true;
				pwdVal = '';
				pwdSet = 0;
			}else {
				var pwdReg = /^[a-zA-Z0-9]{6,20}$/;
				var testPwd = pwdReg.test($phonePwd.val());
				pwdVal = $phonePwd.val();
				pwdSet = 1;
			}
			var url = '/user/sendCode';
			if( testCode && testPhone && testPwd ){
				$.post(url, {mobile: $newPhone.val(), code: $phoneCode.val(), set: pwdSet, password: pwdVal, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){ 
					if( json.status == '验证成功' ){
						$bgContent.children().hide();
						$phoneSuccess.show();
						var $tipBack = $phoneSuccess.find('.tip_back');
						var i = 3;
						$container.find('.pop_close').on('click', function(){ 
							window.location.href = '/';
						});
						$('.dialog_closebg').on('click', function(){
							window.location.href = '/';
						});
						backTimer = setInterval(function(){ 
							i--;
							var html = i + 's后自动返回>'; 
							$tipBack.html( html );
							if( i == 0 ){
								clearInterval(backTimer);
								window.location.href = "/user?pagetype=setmail";
							}
						}, 1000);
					}
					else{
						alert(json.message);
						return false;
					}

				}, 'json');
			}
			else{
				alert("请正确输入");
				return false;
			}
		});
		//新增邮箱下一步
		$mailNext.on('click', function(){ 
			sendEmailCode();
		});
		function sendEmailCode(){
			var mailReg = /^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i; 
			var mailTest = mailReg.test($newMail.val());
			var url = '/user/emailSendCode';
			var setEmail = 'new';
			//没有设置过密码
			
			if( mailTest ){
				$.post(url, {email:$newMail.val(), type:setEmail, pwd:pwd, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
					if(json.status == '邮箱验证码发送成功'){
						$bgContent.children().hide();
						$bgContent.find('.mail_waiting').show().find('.success_tip span').html('请前往'+$newMail.val()+'查收完成验证。未收到邮件？');
						var $tipBack = $bgContent.find('.success_tip .tip_back');
						$tipBack.on('click', function(){
							$(this).css({'color':'#6d737e', 'text-decoration':'none', 'cursor':'default'});
							$(this).off('click');
							$.post(url, {email:$newMail.val(), type:setEmail,pwd: pwd, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
							}, 'json');
						});
					}
					else{
						alert(json.message);
						return false;
					}
				}, 'json');
			}
			else{ 
				alert("请输入正确的邮箱");
				return false;
			}
		}
	},

	modifyBind: function(){ 
		var self = this;
		var $userBind = self.$wrap.find('.user_bind');
		var $bindPhone = $userBind.find('.bind_phone');
		var $bindMail = $userBind.find('.bind_mail');
		var $phoneChangeBtn = $bindPhone.find('.phone_change');
		var $mailChangeBtn = $bindMail.find('.mail_change');
		var YII_CSRF_TOKEN = $('input[name=YII_CSRF_TOKEN]').val();
		//创建绑定手机对话框
		var $container = $('.bg_modify');
		var repicDialog = new Dialog({
			content: $container.show(),
		});
		var $repicDialogWrap = repicDialog.$wrap;
		$repicDialogWrap.on('click', '.pop_close', function() {
			repicDialog.hide();
		});
		$repicDialogWrap.find('.dialog_inner').css({'width':'540px', 'height': 'auto','margin-top':'-260px', 'margin-left':'-280px'})
		

		var $modifyCon = $container.find('.modify_content');
		var $oPhoneChange = $modifyCon.find('.old_phone_change');
		var $oPhoneInput = $modifyCon.find('.modify_phone_input');
		var $oPhoneCode = $modifyCon.find('.old_phone_code');
		var $oGetCode = $modifyCon.find('.old_get_code');
		var $oPhoneNext = $modifyCon.find('.old_phone_next');
		var $nPhonePrev = $modifyCon.find('.new_phone_prev');
		var $nPhoneNext = $modifyCon.find('.new_phone_next');
		var $phoneProcess = $modifyCon.find('li').eq(1);

		var $nPhoneSuccess = $modifyCon.find('.new_phone_success');
		var $nPhoneBtn = $nPhoneSuccess.find('.nPhone_btn');
		var oldPhoneNum = '';
		var oldPhoneCode = '';

		var $modifyMail = $modifyCon.find('.modify_mail');
		var $oMailInput = $modifyCon.find('.old_mail_input');
		var $oMailNext = $modifyCon.find('.mail_next');
		
		$phoneChangeBtn.on('click', function() {
			$.post('user/verifyUpdateChance', {YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
				if( json.message == '手机号本月已修改过' || json.error == '10001' ){
					alert(json.message);
					return false;
				}
				else{
					repicDialog.show();
					$modifyCon.children().hide();
					$container.find('.bg_title').html('<span style="" class="title_logo"></span>验证手机');
					$oPhoneChange.show();
				}
			}, 'json');
		});
		
		//旧、新号码获取验证码
		var getCodeTime = 60;
		$oGetCode.on('click', btnCode); 
		var codeTimer = null;
		function btnCode(){	
			var phoneReg = /^[1][3578][0-9]{9}$/;
			var testPhone = phoneReg.test($oPhoneInput.val());
			var url = '/user/getCode';
			if(testPhone){
				var i = getCodeTime;
				$oGetCode.off('click');
				
				$.post(url, {mobile: $oPhoneInput.val(), YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
					codeTimer = setInterval(function(){
						i--;
						$oGetCode.html('已发送(' + i + ')');
						if( i == 0 ){
							clearInterval(codeTimer);
							$oGetCode.html('获取验证码').on('click', btnCode);
						}
					}, 1000);
				}, 'json');
			}
			else{
				alert("请输入正确的手机号码");
				return false;
			}
		};
		//验证旧手机号码的下一步
		$oPhoneNext.on('click', function(){ 
			var phoneReg = /^[1][3578][0-9]{9}$/;
			var testPhone = phoneReg.test($oPhoneInput.val());
			var codeReg = /^[0-9]{6}$/;
			var testCode = codeReg.test($oPhoneCode.val());
			oldPhoneNum = $oPhoneInput.val();
			oldPhoneCode = $oPhoneCode.val();
			var url = '/user/oldMobileVerify';
			if( testCode && testPhone ){
				$.post(url, {mobile: $oPhoneInput.val(), code: $oPhoneCode.val(), YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){ 
					if( json.status == '验证成功' ){
						clearInterval(codeTimer);
						$oGetCode.html('获取验证码').on('click', btnCode);
						$oPhoneInput.val('');
						$oPhoneCode.val('');
						$oPhoneNext.hide();
						$nPhonePrev.show();
						$nPhoneNext.show();
						
						$phoneProcess.find('p').addClass('acting');
						$phoneProcess.find('span').css({'background-position':'0 -120px'});
					}
					else{
						alert(json.message);
						return false;
					}
				}, 'json');
			}
			else if( testCode && !testPhone ){
				alert("请输入正确的手机号码");
				return false;	
			}
			else if( !testCode && testPhone ){
				alert("请输入正确的验证码");
				return false;
			}
			else{
				alert("请正确输入");
				return false;
			}
		});
		//点击上一步
		$nPhonePrev.on('click', function(){
			$oPhoneInput.val(oldPhoneNum);
			$oPhoneCode.val(oldPhoneCode);
			$nPhonePrev.hide();
			$nPhoneNext.hide();
			$oPhoneNext.show();
			$oPhoneInput.val('');
			$oPhoneCode.val('');
			$phoneProcess.find('p').removeClass('acting');
			$phoneProcess.find('span').css({'background-position':'0 -140px'});
			clearInterval(codeTimer);
			$oGetCode.html('获取验证码').on('click', btnCode);
		});

		//是否设置过密码
		var $phonePwd = self.$wrap.find('.phone_pwd');
		var pwd = 'y';
		var pwdSet = 0;
		//完成旧手机验证后，验证新手机号码的下一步
		$nPhoneNext.on('click', function(){ 
			var phoneReg = /^[1][3578][0-9]{9}$/;
			var testPhone = phoneReg.test($oPhoneInput.val());
			var codeReg = /^[0-9]{6}$/;
			var testCode = codeReg.test($oPhoneCode.val());
			oldPhoneNum = $oPhoneInput.val();
			oldPhoneCode = $oPhoneCode.val();
			var url = '/user/sendCode';
			var setEmail = 'old';
			if( testCode && testPhone ){
				
				$.post(url, {mobile: $oPhoneInput.val(), code: $oPhoneCode.val(), type:setEmail, set: pwdSet, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){ 
					if( json.status == '验证成功' ){
						$oPhoneChange.hide();
						$nPhoneSuccess.show();
						$nPhoneBtn.on('click', function(){
							window.location.href = '/';
						});
						$container.find('.pop_close').on('click', function(){ 
							window.location.href = '/';
						});
						$('.dialog_closebg').on('click', function(){
							window.location.href = '/';
						});
					}
					else{
						alert(json.message);
						return false;
					}
				}, 'json');
			}
			else if( testCode && !testPhone ){
				alert("请输入正确的手机号码");
				return false;	
			}
			else if( !testCode && testPhone ){
				alert("请输入正确的验证码");
				return false;
			}
			else{
				alert("请正确输入");
				return false;
			}
		});
		
		//点击邮箱修改
		$mailChangeBtn.on('click', function() {
			repicDialog.show();
			$modifyCon.children().hide();
			$modifyMail.show();
			$container.find('.bg_title').html('<span style="width:13px; height:14px; background-position:0 -106px" class="title_logo"></span>完善信息');
		});
		//修改邮箱弹窗的下一步
		$oMailNext.on('click', function(){
			var mailReg = /^([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i; 
			var mailTest = mailReg.test($oMailInput.val());
			var url = '/user/emailSendCode';
			var setEmail = 'old';
			if( mailTest ){
				$.post(url, {email:$oMailInput.val(), type:setEmail, pwd: pwd, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
					if(json.status == '邮箱验证码发送成功'){
						$modifyCon.children().hide();
						$modifyCon.find('.mail_waiting').show().find('.success_tip span').html('请前往'+$oMailInput.val()+'查收完成验证。未收到邮件？');
						var $tipBack = $modifyCon.find('.success_tip .tip_back');
						$tipBack.on('click', function(){
							$(this).css({'color':'#6d737e', 'text-decoration':'none', 'cursor':'default'});
							$(this).off('click');
							$.post(url, {email:$oMailInput.val(), type:setEmail, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json){
							}, 'json');
						});
					}
					else{
						alert(json.message);
						return false;
					}
				}, 'json');
			}
			else{ 
				alert("请输入正确的邮箱");
				return false;
			}
		});
	},

	changePwd: function(){
		var self = this;
		var $userPwd = self.$wrap.find('.user_psd');
		var $oldPwd = $userPwd.find('.old_pwd');
		var $newPwd = $userPwd.find('.new_pwd');
		var $certainPwd = $userPwd.find('.certain_pwd');
		var $pwdBtn = $userPwd.find('.psd_btn');
		var YII_CSRF_TOKEN = $('input[name=YII_CSRF_TOKEN]').val();

		$pwdBtn.on('click', function(){
			if( $oldPwd.val == '' || $newPwd.val() == '' || $certainPwd.val() == '' ){
				alert('信息填写不完整');
				return false;
			}
			//if( !regPwd($oldPwd.val()) || !regPwd($newPwd.val()) || !regPwd($certainPwd.val()) ){
				//alert('密码只能使由6-20位数字或字母组成');
				//return false;
			//}
			var params = {oldPwd:$oldPwd.val(), newPwd:$newPwd.val(), confirmPwd:$certainPwd.val(), YII_CSRF_TOKEN: YII_CSRF_TOKEN}; 
			$.post('/user/updatePwd', params, function(json){ 
				if( json.status == 1 ){
					alert('修改成功');
					/*$oldPwd.val('');
					$newPwd.val('');
					$certainPwd.val('');*/
					window.location.reload();
				}
				else{
					alert(json.message);
					return false;
				}
			}, 'json');
		});

		function regPwd(pwd){
			var reg = /^[a-zA-Z0-9]{6,20}$/;
			return reg.test(pwd);
		}

	},

	socialChange: function(){
		var self = this;
		var $userAccount = self.$wrap.find('.user_account'); 
		//var $bindings = $userAccount.find('.binding');
		var $inputContent = self.$wrap.find('.input_content');
		var username = $('input[name=screen_name]').val();
		var from = $('input[name=from]').val();
		var redirect = $('input[name=redirect]').val();
		var social_user_id = $('input[name=social_user_id]').val();
		var social_type = $('input[name=social_type]').val();
		var access_token = $('input[name=access_token]').val();
		var expires_in = $('input[name=expires_in]').val();
		var $social_user_name = $('input[name=screen_name]').val();
		var YII_CSRF_TOKEN = $('input[name=YII_CSRF_TOKEN]').val();

		if( social_user_id && access_token ){
			$.post('/user/socialBinding', {social_user_id: social_user_id, social_type: social_type, access_token: access_token, expires_in: expires_in, social_user_name: $social_user_name, YII_CSRF_TOKEN: YII_CSRF_TOKEN}, function(json) {
				if( json.message ){
					alert(json.message);
					window.location.href= '/user?type=setaccount';
				}else if( json['social_type'] ){
					alert('绑定成功');
					window.location.href= '/user?type=setaccount';
				}
			}, 'json');
		}else {
			var $bindDel = $userAccount.find('.binding'); 
			$bindDel.on('click', function(){
				if( confirm('确定要解除绑定吗') ){
					var social_user_id = $(this).attr('sid');
					$.post('/user/socialDel', {social_user_id: social_user_id}, function(json){
						var jsonCon = json.message ? json.message : json.status;
						alert(jsonCon);
						window.location.href= '/user?type=setaccount';
					}, 'json');
				}
			});
		}
	},

	mouseImg: function(){ 
		var self = this;
		var $imgBox = self.$wrap.find('.img_box');
		var $wrapCover = $imgBox.find('.wrap_cover');
		$imgBox.on('mouseenter', function(){ 
			$wrapCover.stop();
			$wrapCover.fadeIn(300);
		});
		$imgBox.on('mouseleave', function(){ 
			$wrapCover.stop();
			$wrapCover.fadeOut(300);
		});

	},
	//基本设置内容
	setbasic: function() {
		var self = this;
		var $wrap = $(".content_right");
		var $globalSel = $wrap.find(".global_select");
		var $globalAddress = $wrap.find(".global_address");
		//省份确定情况下，可直接选择城区
		var proviceChosse = $wrap.find('.fItem1').find('p').attr('class');
		var recl = $wrap.find('.fItem1').find('p').attr('rel');

		if (proviceChosse == "provice") {
			Address(recl);
		}
		//定义 生日日期
        Birthday();
		function Birthday() {
			var monthDay = {1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};
			var _year = parseInt($globalSel.find('.year').html());
			var _month = parseInt($globalSel.find('.month').html());
			var day = monthDay[_month];

			if(_year%4 == 0 && _month ==2) {
				day++;
			}
			var html ='';
			for(i=1; i<=day; i++) {
				html += '<li>'+i+'</li>';
			}
			$globalSel.find('.fItem3 .srhList').html(html);
	    }

		function Address(id) {
			var html = '';
			$globalAddress.find('#city').html();
			$.getJSON('/user/getCity', {province: id}, function(json) {

				if (json.status == 200) {
					$.each(json.message, function(i, v) {
						html += '<li rel="'+ v.id +'">'+ v.name +'</li>';
					})
					$globalAddress.find('#city').html(html);
				} else {
					alert(json.message);
				}
			});
		}
	
		$globalSel.on('click', '.addrClick', function() {
			var $this = $(this);
			var $dom = $this.siblings('.srhList');
			$dom.toggle();
			$globalSel.find('.srhList').not($dom).hide();
			var select = $this.find('p').attr('class');
			if (select == "day") {
				Birthday();
			}


		})
		var proviceChosse = $wrap.find('.fItem1').find('p').attr('class');
		var recl = $wrap.find('.fItem1').find('p').attr('rel');
		if (proviceChosse == "provice") {
			Address(recl);
		}

		$globalSel.on('click', '.srhList li', function() {
			var $this = $(this);
			var value = $this.html();
			var rel = $this.attr('rel');
			$this.closest('.selMain').find('p').html(value);
			$this.closest('.selMain').find('p').attr('rel',rel);
			$globalSel.find('.srhList').hide();
			var select = $this.closest('.fItem1').find('p').attr('class');
			if (select == "provice") {
				Address(rel);
				$this.closest('.global_address').find('.city').html('城市/地区');
			}
		})
		//关闭函数
		$(document).on("click", function (e) {
			var target  = $(e.target);
				if(target.closest(".addrClick").length == 0){
					$(".srhList").hide();
				}
		})

       // 保存info信息
	   $wrap.on('click', '.save_btn', function() {
		   var $this  = $(this);
			var data = {
				nickname: $wrap.find('.input_nickname').val(),
				gender: $wrap.find('input[name=gender]:checked').val(),
				description: $wrap.find('.input1').val(),
				provice: $wrap.find('.provice').attr('rel'),
				city: $wrap.find('.city').attr('rel'),
				YII_CSRF_TOKEN: $wrap.find('input[name=YII_CSRF_TOKEN]').val(),
			};
			data.birthday = parseInt($wrap.find('.year').text())+'-'+parseInt($wrap.find('.month').text())+'-'+parseInt($wrap.find('.day').text());
			/*if(data.provice == 0 || data.city == 0) {
				alert('信息填写不完整');
				return false;
			}*/
			if($.trim(data.nickname) == '') {
				alert('用户昵称不为空'); 
				return false;
			}

			$(this).attr('disabled', true);
			$.post('/user/post', data, function(json) {
				if(json.status ==200) {
					//alert(json.message);
					//console.log($('.success_bg'));	
					
					var $container = $('.success_bg');
					var repicDialog = new Dialog({
						content: $container.show(),
					});
					var $repicDialogWrap = repicDialog.$wrap;
					$repicDialogWrap.find('.dialog_inner').css({'width':'540px', 'height': 'auto','margin-top':'-260px', 'margin-left':'-280px'});
					repicDialog.show();
					var $sBgContent = $container.find('.bg_content');
					$sBgContent.find('.basic_success').show();
					
					var i = 3;
					backTimer = setInterval(function(){ 
						i--;
						if( i == 0 ){
							clearInterval(backTimer);
							window.location.href = "/user?pagetype=setbasic";
						}
					}, 1000);
					
					//window.location.reload();
				} else {
						alert(json.message);
				}
				$this.removeAttr('disabled');
			},'json')
	   })
	},

	mycomList: function(){
		var self = this;
		//$sidenav.find('li').eq(4).addClass('active');
		//self.$wrap.find('.inner_right').html(json.message.html);
		//加载我发出评论列表
		$.get('/user/mycomList',function(html) {
			$('#mycom_show').html(html);
			var total_num = self.$wrap.find('#mycom_total').val();
			//page
			var page = new Page({
				wrap: self.$wrap.find('.page_mycom'),
				data: {},
				url: '/user/mycomList',
				totalPage: Math.ceil(total_num/20),
				type: 'html',
				callback: function(html) {
					self.$wrap.find('#mycom_show').html(html);
				}
			});
		},'html')
	},
});

