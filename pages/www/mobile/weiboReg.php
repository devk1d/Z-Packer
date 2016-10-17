{setLayout "mobile"}
<?php
	 $locationHref = urlencode(Helper::get_url());
 ?>
<!--{startBlock "content"}-->
<div class="weiboReg_inner mlogin_inner">
	<div class="part inner_header">
		<a href="#"  class="logo">
		</a>
	</div>
	<div id="part_content" class="mContent">
		<div class="login_title">
         欢迎登录，请确认用户名
		</div>
		<div class="weiboReg_part code_error">
			<div class="inner_error mlogin_icon">
			</div>
		</div>
		
		<div class="verheight">
			<input class="part inner_user mlogin_icon" name="username" value="{$screen_name}" type="text" />  	
		</div>
		<input type="hidden" value="{$social_user_id}" name="social_user_id"/>
		<input type="hidden" value="{$from}" name="from"/>
		<input type="hidden" value="{$social_type}" name="social_type"/>
		<input type="hidden" value="{$access_token}" name="token"/>
		<input type="hidden" value="{$expires_in}" name="expires_in"/>
		<input type="hidden" value="<? echo $redirect; ?>" name="redirect"/>
		<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
		<button class="part inner_btn weiboReg_btn ">
			确定	
		</button>
	</div>
</div>

<!--{endBlock}-->
{widget "mlogin", array(), 'mobile'}
