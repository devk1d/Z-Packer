<h2>手机和邮箱</h2>
<div class="user_bind">
	
	<? 
	if( !$binding['mobile'] && !$binding['email'] ){ 
	?>
	<div class="bind_security">
		<div class="bind_title">账户安全</div>
		<div class="security_content process_wrap">
			<span style="width: 60px;"></span>
		</div>
		<span class="low_txt">低</span>
	</div>
	<div class="bind_phone">
		<div class="bind_title">手机</div>
		<div class="phone_content">
			<button class="phone_add">添加绑定</button>
		</div>
	</div>
	<div class="bind_mail">
		<div class="bind_title">邮箱</div>
		<div class="mail_content">
			<button class="mail_add">添加绑定</button>
		</div>
	</div>
	<? } 
	else if( $binding['mobile'] && !$binding['email'] ){ 
	?>
	<div class="bind_security">
		<div class="bind_title">账户安全</div>
		<div class="security_content process_wrap">
			<span style="width: 120px;"></span>
		</div>
		<span class="low_txt">一般</span>
	</div>
	<div class="bind_phone">
		<div class="bind_title">手机</div>
		<div class="phone_content">
			<input name="phone" readonly="readonly" type="text" value="{$binding['mobile']}"/>
			<button class="phone_change">修改</button>
		</div>
	</div>
	<div class="bind_mail">
		<div class="bind_title">邮箱</div>
		<div class="mail_content">
			<button class="mail_add">添加绑定</button>
		</div>
	</div>
	<? }
	else if( !$binding['mobile'] && $binding['email'] ){ 
	?>
	<div class="bind_security">
		<div class="bind_title">账户安全</div>
		<div class="security_content process_wrap">
			<span style="width: 120px;"></span>
		</div>
		<span class="low_txt">一般</span>
	</div>
	<div class="bind_phone">
		<div class="bind_title">手机</div>
		<div class="phone_content">
			<button class="phone_add">添加绑定</button>
		</div>
	</div>
	<div class="bind_mail">
		<div class="bind_title">邮箱</div>
		<div class="mail_content">
			<input name="mail" readonly="readonly" type="text" value="{$binding['email']}"/>
			<button class="mail_change">修改</button>
		</div>
	</div>
	<? }

	else if( $binding['mobile'] && $binding['email'] ) {
	?>
	<div class="bind_security">
		<div class="bind_title">账户安全</div>
		<div class="security_content process_wrap">
			<span style="width: 180px;"></span>
		</div>
		<span class="low_txt">高</span>
	</div>
	<div class="bind_phone">
		<div class="bind_title">手机</div>
		<div class="phone_content">
			<input name="phone" type="text" readonly="readonly" value="{$binding['mobile']}"/>
			<button class="phone_change">修改</button>
		</div>
	</div>
	<div class="bind_mail">
		<div class="bind_title">邮箱</div>
		<div class="mail_content">
			<input name="mail" readonly="readonly" type="text" value="{$binding['email']}"/>
			<button class="mail_change">修改</button>
		</div>
	</div>
	<? } ?>
</div>
