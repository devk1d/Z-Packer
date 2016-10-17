<h2>修改密码</h2>
<div class="user_psd">
	<?
	if( $binding['email'] || $binding['mobile'] ){
	?>
	<ul class="psd_change">
		<li>
			<span>当前密码</span>
			<input type="password" maxlength="20" class="old_pwd" />
		</li>
		<li>
			<span>新密码</span>
			<input type="password" maxlength="20" class="new_pwd" />
		</li>
		<li>
			<span>确认密码</span>
			<input type="password" maxlength="20" class="certain_pwd" />
		</li>
	</ul>
	<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
	<button class="psd_btn">修改</button>
	<? }
	else{
	?>
	<div class="psd_low">
		<p>你当前账户安全较低，请完善信息后再修改密码。</p>
		<a href="/user?pagetype=setmail" class="low_btn">补全资料</a>
	</div>
	<? } ?>
</div>
