<div class="forgot_content">
	<!-- 找回密码 -->
	<? if($step == 1) {  ?>
	<h2>找回密码</h2>
	<div class="content_info">
		<div class="forgot_info">
			<span class="page_select go_mobile"><em class="select_box"></em>通过手机短信验证身份<span> 
		</div>
		<div class="forgot_info">
			<span class="page_select go_email"><em class="select_box"></em>通过邮箱验证身份<span> 
		</div>
		<button class="black step_one_btn" data-num="0"> 下一步 </button>
	</div>
	<? } ?>

	<!-- 通过手机号码 -->
	<? if($step == 2) {  ?>
	<h2>找回密码</h2>
	<div class="content_info">
		<div class="info_space">
			<input type="text" class="text forgot_judge" name="mobile" placeholder="请输入您的注册手机号"/> 
			<span class="info_error"></span>
			<span class="info_success"></span>
		</div>
		<div class="info_space">
			<input type="text" name ="mobile_code" class="text verification forgot_judge" placeholder="验证码(必填)" /> 
			<button class="black get_code">获取验证码</button> 
			<span class="info_error"></span>
		</div>
		<div class="info_space">
			<a href="/forgot">&lt;上一步</a> <button class="black next step_two_btn">下一步</button> 
		</div>
	</div>
	<? } ?>

	<!-- 重新设置您的密码 -->
	<? if($step == 3) {  ?>
	<h2 style="margin-left: 110px;">重新设置您的密码</h2>
	<div class="content_info">
		<div class="info_space">
			<input type="text" class="text active" placeholder="新密码"/> 
			<span class="info_error"> isadfad</span>
			<span class="info_success"> isadfad</span>
		</div>
		<div class="info_space">
			<input type="text" class="text" placeholder="确认密码"/> 
			<span class="info_error"> isadfad</span>
			<span class="info_success"> isadfad</span>
		</div>
		<button class="black"> 确认 </button>
	</div>
	<? } ?>

	<!-- 通过邮箱找回 -->
	<? if($step == 4) {  ?>
	<h2>找回密码</h2>
	<div class="content_info">
		<div class="info_space">
			<input type="text" class="text forgot_judge" placeholder="请输入您的注册邮箱" name="email"/> 
			<span class="info_error"></span>
			<span class="info_success"></span>
		</div>
		<div class="info_space clear">
			<input type="text" class="text verification" style="float:left" placeholder="验证码(必填)" name="verification" /> 
			<img  class="verify" src="{_WWW_HOST}login/viewCode?a=2" data-num="2" id="img_code" />
		</div>
		<div class="info_space">
			<a href="/forgot">&lt;上一步</a> <button class="black next step_four_btn  ">下一步</button> 
		</div>
	</div>
	<? } ?>

	<!-- 选择邮箱发送 -->
	<? if($step == 5) {  ?>
	<h2 style="margin-left: 30px;">我们向您的邮箱发送了一封验证邮件</h2>
	<button class="black step_five_btn" style="display:none; margin-top: 20px;" data-match="0"> 查看我的邮件 </button>
	<div class="content_info">
		<div class="info_sendMail">
			请前往<span id="sendMail"> </span>查收，<br />
			未收到邮件？<a href="/forgot?step=4">重新发送</a>
		</div>
	</div>
	<? } ?>

	<!-- 请重新设置你的密码 -->
	<? if($step == 6) {  ?>
	<h2 style="margin-left: 98px;">请重新设置你的密码</h2>
	<div class="content_info">
		<div class="info_space">
			<input type="password" class="text forgot_judge" name="password" placeholder="新密码"/> 
			<span class="info_error"></span>
			<span class="info_success"></span>
		</div>
		<div class="info_space">
			<input type="password" class="text forgot_judge" name="repwd" placeholder="确认密码"/> 
			<span class="info_error"></span>
			<span class="info_success"></span>
		</div>
		<button class="black step_six_btn" data-num="0">确认</button>
	</div>
	<? } ?>
</div>

<!--{scriptPool}-->
<script>
	Z.use('login/forgot',{
		'step': '{$step}',
		'redirect':'{$redirect}', 
		'YII_CSRF_TOKEN': '{=Yii::app()->getRequest()->getCsrfToken()}'
	});
</script>
<!--{/scriptPool}-->
