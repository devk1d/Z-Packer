{setLayout "mobile"}
<?php
	 $locationHref = urlencode(Helper::get_url());
	 $redirect = urlencode($redirect);
 ?>
<!--{startBlock "content"}-->
<div class="mlogin_inner">
	<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
	<div class="part inner_header">
		<a href="javascript:;"  class="logo">
		</a>
	</div>
	<div id="part_content" class="mContent">
	<?php if($p_code) { ?>
		<div class="priority_code">
			<div class="priority_tit"><span>Hi，你用的是优先码，可直接提单</span></div>
			<div class="priority_tips">
				你还没有登录，登录后我们会告诉你该怎么做
			</div>
		</div>
	<? } ?>
		<div class="code_error">
			<div class="inner_error mlogin_icon">
			</div>
		</div>
		
		<div class="verheight">
			<input class="part inner_user mlogin_icon" name="username" type="text" placeholder="用户名/邮箱" />  	
		</div>
		<div class="verheight">
			<input class="part inner_password mlogin_icon" name="password" type="password" placeholder="密码" />  	
		</div>
		<? if (GraphicCode::checkLoginSpam()) { ?>
		<div class="verheight" style="margin-top:10px; height: 20px;">
			<input class="part inner_vercode mlogin_icon" name="verify" type="verify" placeholder="验证码" />  	
			<div class="code_img">
				<img src="{_WWW_HOST}mobile/viewCode?t=<?= time() ?>" data-type="login" id="img_code">
			</div>
			<div style="clear:both"></div>
		</div>
		<? } ?>

	<?if(!empty($openid)) {?>
		<input type="hidden" name="openid" value={$openid}>
	<? } ?>
	<?if(!empty($from)) {?>
		<input type="hidden" name="from" value={$from}>
	<? } ?>
	<?if(!empty($redirect)) {?>
		<input type="hidden" name="redirect" value={$redirect}>
	<? } ?>
	<?if(!empty($model)) {?>
		<input type="hidden" name="model" value={$model}>
	<? } ?>
	<?if(!empty($mid)) {?>
		<input type="hidden" name="mid" value={$mid}>
	<? } ?>
	<?if(!empty($cid)) {?>
		<input type="hidden" name="cid" value={$cid}>
	<? } ?>
	<?if(!empty($service_id)) {?>
		<input type="hidden" name="service_id" value={$service_id}>
	<? } ?>
	
		<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
		<button class="part inner_btn inner_login ">
			登录
		</button>

		<div class="mlogin_links clear">
			<a href="" class="mlogin_forgot">忘记登录密码？</a>
			<?if(!empty($from) && !empty($openid) && !empty($redirect)) {?>
			<a href="/mobile/reg?from={$from}&openid={$openid}&redirect={$redirect}" class="mlogin_reg">免费注册</a>
			<?} else {?>
				<?if(!empty($redirect)) {?>
					<a href="/mobile/reg?redirect={$redirect}" class="mlogin_reg">免费注册</a>
				<? }else { ?>
					<a href="/mobile/reg" class="mlogin_reg">免费注册</a>
			<?}}?>
		</div>

		<div class="mlogin_quick">
			<div class="quick_text">快捷登录</div>
			<div class="quick_links clear">
				<a href="{_WWW_HOST}index/WeChat?from=plus&redirect={$redirect}&social_type=WECHAT"  class="links_wechat"></a>
				<a href="{_WWW_HOST}Index/sina?from={$from}&redirect={$redirect}"  class="links_weibo"></a>
				<a href="{_WWW_HOST}Index/qq?from={$from}&redirect={$redirect}" class="links_qq"></a>
				<a href="{_WWW_HOST}Index/aliPay?from={$from}&redirect={$redirect}" class="links_ali"></a>
			</div>
		</div>
	</div>
</div>

<!--{endBlock}-->
{widget "mlogin"}
