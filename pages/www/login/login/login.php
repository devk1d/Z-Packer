<div class="content wrapWidth clear">
	<div class="content_left">
		<img src="QRcode.png" />
	</div>
	<div class="content_right">
		<div class="info_space">
			<input type="text" class="text" name="username" placeholder="邮箱、手机"/> 
			<span class="info_error"></span>
		</div>
		<div class="info_space">
			<input type="password" class="text" name="password" placeholder="密码"/> 
			<span class="info_error"></span>
		</div>
		<? if (GraphicCode::checkLoginSpam()) { ?>
			<div class="info_space clear">
				<input type="text" class="text verification" name="verification" style="float:left" placeholder="请输入验证码" /> 
				<img class="verify" src="{_WWW_HOST}login/viewCode?t=<?= time() ?>" data-num="0" id="img_code">
			</div>
		<? } ?>
		<div class="login_info">
			<span class="page_select"><em class="select_box select_box_login"></em>记住密码</span> 
			<a href="/forgot" class="info_forgot"> 忘记密码? </a>
		</div>
		<button class="black login_btn"> 登录 </button>
		<div class="login_info">
			<span class="info_reg">还没有账号，<a href="/reg<? echo !empty($redirect)? '?redirect='.urlencode($redirect):'' ?>">立即注册</a></span>
		</div>
		<div class="page_login_method">
			<?$redirect = htmlspecialchars($redirect);?>
			<a href="{_WWW_HOST}Index/qq?redirect={$redirect}" alt="qq登录" class="method_qq"></a>
			<a href="{_WWW_HOST}Index/sina?redirect={$redirect}" alt="weibo登录" class="method_weibo"></a>
			<a href="{_WWW_HOST}Index/aliPay?redirect={$redirect}" alt="alipay登录" class="method_alipay"></a>
			<a href="{_WWW_HOST}Index/wechatLogin?redirect={$redirect}" alt="wechat登录" class="method_wechat"></a>
			<input type="hidden" value="" name="YII_CSRF_TOKEN"/>
		</div>
	</div> 
</div>

<!--{scriptPool}-->
<script>
	Z.use('login/login',{
		'redirect':'{$redirect}'
	});
</script>
<!--{/scriptPool}-->
