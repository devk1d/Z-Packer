<div class="reg_content">
	<a href="/reg?redirect={$redirect}&type=phone" class="{= $type =='phone' ? 'active_h': ''} reg_do_method" data-type="telephone">手机注册</a>
	<span class="line_break"></span>
	<a href="/reg?redirect={$redirect}&type=email" class="{= $type =='email' ? 'active_h': ''} reg_do_method"  style="margin-left: 20px;" data-type="email">邮箱注册</a>
	<? if($type == 'phone') { ?>
	<div class="content_info telephone">
		<div class="info_space">
			<input type="text" class="text reg_judge" placeholder="昵称(格式支持中英文数字，少于20字符)" name="nickname"/> 
			<span class="info_error"> </span>
			<span class="info_success"> </span>
		</div>
		<div class="info_space">
			<input type="text" class="text reg_judge" placeholder="手机号码(必填)" name="mobile" /> 
			<span class="info_error"> </span>
			<span class="info_success"> </span>
		</div>
		<div class="info_space">
			<input type="text" class="text mobile_code reg_judge" placeholder="验证码(必填)" name="mobile_code" /> <button class="black get_code">获取验证码</button> 
			<span class="info_error" id="mobile_code_error"> </span>
			<span class="info_success"> </span>
		</div>
		<div class="info_space">
			<input type="password" class="text reg_judge" placeholder="设置密码(密码格式应为英文、数字，6-20位字符格式)" name="password" /> 
			<span class="info_error"> </span>
			<span class="info_success"> </span>
		</div>
		<div class="info_space">
			<input type="password" class="text reg_judge" placeholder="确认密码" name="repwd" /> 
			<span class="info_error"> </span>
			<span class="info_success"> </span>
		</div>
		<!--滑块验证--!>
		<div class="checkout clear" style="margin-bottom: 30px; position: relative; z-index: 0">
			 <div style="float:left; line-height: 30px;margin-right: 20px;">滑块验证</div>
			 <div style="float: left" id="captcha-box"> </div>
		</div>
		<? if (GraphicCode::checkLoginSpam()) { ?>   <!-- 已经有了手机验证码 -->
		<div class="info_space clear">
			<input type="text" class="text verification reg_judge" name="verification" style="float:left" placeholder="请输入验证码" /> 
			<img class="black verify" id="img_code" src="{_WWW_HOST}login/viewCode?a=1&t=<?= time() ?>" data-num="1">
		</div>
		<? } ?>
		<div class="reg_info reg_terms">
			<span class="page_select"><em class="select_box active"></em>我已阅读并接受《&nbsp;ZEALER&nbsp;用户注册条款》<span> 
		</div>
		<button class="black reg_btn"> 注册 </button>
		<div class="reg_info">
			<span class="info_login toreg_btn">已有账号，<a href="/login?redirect={$redirect}">去登录</a></span>
		</div>
		<div class="page_login_method">
			<a href="{_WWW_HOST}Index/qq?redirect={$redirect}" alt="qq登录" class="method_qq"></a>
			<a href="{_WWW_HOST}Index/sina?redirect={$redirect}" alt="weibo登录" class="method_weibo"></a>
			<a href="{_WWW_HOST}Index/aliPay?redirect={$redirect}" alt="alipay登录" class="method_alipay"></a>
			<a href="{_WWW_HOST}Index/wechatLogin?redirect={$redirect}" alt="wechat登录" class="method_wechat"></a>
		</div>
	</div>
	<? } ?>
	<? 
	if($type == 'email') { ?>

	<!--邮箱注册--!>
	<div class="content_info email">
		<div class="info_space">
			<input type="text" class="text reg_judge" placeholder="昵称(格式支持中英文数字，少于20字符)" name="emailname"/> 
			<span class="info_error"> </span>
			<span class="info_success"> </span>
		</div>
		<div class="info_space">
			<input type="text" class="text reg_judge" placeholder="邮箱(必填)" name="email" /> 
			<span class="info_error"> </span>
			<span class="info_success"> </span>
		</div>
		<div class="info_space">
			<input type="password" class="text reg_judge" placeholder="设置密码(密码格式应为英文、数字，6-20位字符格式)" name="emailpwd" /> 
			<span class="info_error"> </span>
			<span class="info_success"> </span>
		</div>
		<div class="info_space">
			<input type="password" class="text reg_judge" placeholder="确认密码" name="emailrepwd" /> 
			<span class="info_error"> </span>
			<span class="info_success"> </span>
		</div>
		
		<!--滑块验证--!>
		<div class="checkout clear" style="margin-bottom: 30px; position: relative; z-index: 0">
			 <div style="float:left; line-height: 30px;margin-right: 20px;">滑块验证</div>
			 <div style="float: left" id="captcha-box"> </div>
		</div>
		
		<div class="reg_info reg_terms">
			<span class="page_select"><em class="select_box active"></em>我已阅读并接受《&nbsp;ZEALER&nbsp;用户注册条款》<span> 
		</div>
		<button class="black reg_btn"> 注册 </button>
		<div class="reg_info">
			<span class="info_login toreg_btn">已有账号，<a href="/login?redirect={$redirect}">去登录</a></span>
		</div>
		<div class="page_login_method">
			<a href="{_WWW_HOST}Index/qq?redirect={$redirect}" alt="qq登录" class="method_qq"></a>
			<a href="{_WWW_HOST}Index/sina?redirect={$redirect}" alt="weibo登录" class="method_weibo"></a>
			<a href="{_WWW_HOST}Index/aliPay?redirect={$redirect}" alt="alipay登录" class="method_alipay"></a>
			<a href="{_WWW_HOST}Index/wechatLogin?redirect={$redirect}" alt="wechat登录" class="method_wechat"></a>
		</div>
	</div>
	<? } ?>
</div>
<!--{scriptPool}-->
<script>
	Z.use('login/reg',{
		'redirect':'{$redirect}', 
		'YII_CSRF_TOKEN': '{=Yii::app()->getRequest()->getCsrfToken()}'
	});
</script>
<!--{/scriptPool}-->
