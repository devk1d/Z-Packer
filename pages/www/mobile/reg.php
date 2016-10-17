{setLayout "mobile"}
<?php
	 $locationHref = urlencode(Helper::get_url());
	 $redirect = urlencode($redirect);
 ?>
<!--{startBlock "content"}-->
<div class="mlogin_inner">
	<div class="mfix_reg">
	<div class="part inner_header">
		<a href="javascript:;"  class="logo">
		</a>
	</div>
	<div id="part_content_reg" class="mContent">
		<div class="code_error">
			<div class="inner_error mlogin_icon" style="">
			</div>
		</div>
		
		<div class="verheight">
			<input class="part inner_user mlogin_icon" name="username" type="text" placeholder="昵称" />  	
		</div>
		<div class="verheight">
			<input class="part inner_email inner_mobile mlogin_icon" name="mobile" type="text" placeholder="手机" />  	
		</div>
		<div class="verheight clear" style="height: 20px" >
			<input class="part inner_vercode mlogin_icon mobile_code" name="mobile_code" type="text" placeholder="手机验证码" />  	
			<button  id="get_mobile_code" class="get_code">
				获取手机验证码
			</button>
			<div style="clear:both"></div>
		</div>
		<div class="verheight">
			<input class="part inner_password mlogin_icon" name="password" type="password" placeholder="密码" />  	
		</div>
		<div class="verheight">
			<input class="part inner_password_confirm mlogin_icon" name="repassword" type="password" placeholder="确认密码" />  	
		</div>
		<? if (GraphicCode::checkLoginSpam()) { ?>   <!-- 已经有了手机验证码 -->
		<div class="verheight" style="height: 20px" >
			<input class="part inner_vercode mlogin_icon" name="verification" type="verification" placeholder="验证码" />  	
			<div>
				<img src="{_WWW_HOST}mobile/viewCode?a=1&t=<?= time() ?>" data-type="reg" id="img_code">
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

		<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
		<button class="part inner_btn" id="mfix_reg">
			注册
		</button>
	</div>
</div>
</div>

<div class="mlogin_footer ">
<?if(empty($from)) {?>
	<div class="part_left">
			<?php
				$social = new SocialToken();
			?>
		<a href="{$weibo}" class="weibo"></a>
	</div>
	<?}?>
	<div class="part_left" id={$from}>
<?if(!empty($from) && !empty($openid) && !empty($redirect)) {?>

		<a href="/mobile/login?from={$from}&openid={$openid}&redirect={$redirect}" class="goreg1 goto"></a>
	<?} else {?>
		<a href="/mobile/login?redirect={$redirect}" class="goreg1 goto"></a>
		<?}?>
	</div>
	<div class="clear"></div>
</div>
<!--{endBlock}-->
{widget "mlogin"}
