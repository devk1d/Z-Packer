<?
$url_redirect = Yii::app()->request->getQuery('redirect', '');

if($url_redirect) {
	$redirect = urldecode($url_redirect);
}
?>
{setLayout "www"}

<!--{startBlock "content"}-->
<div style="display:none" class="repic_mask">
	<div class="mask_bg">
		<div class="mask_content mask_repic">
			<div class="pop_close pop_image"></div>
			<div class="wrap2">
			<div class="uWrap">
					<div class="change">
						<form class="form1">
							<input type="button" value="选择" class="choose" id="fileupload"/>
						</form>
					</div>
					<div style="height: 2px; width: 0px; background: #006ea3;" class="user_progressbar"></div>
					<div class='img_wrap' style="height: 0px; overflow: hidden;">
						<div id="picImg" class="clear" style="margin:20px;"></div>
						<form class="form2">
							<div class="saveOrCancel">
							<input type="hidden" value="0" name="pid" />
							<input type="button" value="保存" id="repic_send" class="send" />
							<input type="button" value="取消" id="repic_cancle" class="cancle"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="main">
	<div class="main_content clear">
		<div class="content_left">
			{widget "sidebar", array('mycom_num' => $mycom_num)}
		</div>
		<div style="display:none" class="input_content">
			<? if (GraphicCode::checkLoginSpam()) { ?>
			<div class="left_row clear">
				<input type="text" class="row_text verification" name="verification" placeholder="验证码" /> 
				<span class="ver_code"><img src="{_WWW_HOST}login/viewCode?t=<?= time() ?>"></span>
			</div>
			<? } 
			if( $pagetype == 'setaccount' ){?>
				<input type="hidden" value="{$from}" name="from"/>
				<input type="hidden" value="{$redirect}" name="redirect"/>
				<input type="hidden" value="{$social_user_id}" name="social_user_id"/>
				<input type="hidden" value="{$social_type}" name="social_type"/>
				<input type="hidden" value="{$access_token}" name="access_token"/>
				<input type="hidden" value="{$expires_in}" name="expires_in"/>
				<input type="hidden" value="{$screen_name}" name="screen_name"/>
			<? } ?>
		</div>


		<div class="content_right">
		</div>
	</div>
</div>

<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
<div class="success_bg">
		
	<div class="pop_close pop_image"></div>	
	<div class="bg_title">
		<span style="width:13px; height:14px; background-position:0 -106px;" class="title_logo"></span>	
		完善信息	
	</div>
	<div class="bg_content">

		<div style="display:none" class="content_success">
			<div style="color:#3a7dda" class="success_title">
				<span style="background-position:0 -76px" class="success_logo"></span>
				修改成功
			</div>
			<div class="success_tip">
				<span>你可以使用新邮箱登录。</span>
				<a style="color:#3a7dda" class="tip_back" href="/">3s后自动返回></a>
			</div>
		</div>
		
		<div style="display:none" class="basic_success">
			<div style="color:#333" class="success_title">
				修改成功
			</div>
			<div class="success_tip">
				<span>3 秒后自动跳转返回当前页面...</span>
			</div>
			<div class="clear">
				<a style="color:#fff" class="bas_tip_back" href="/user?pagetype=setbasic">立即返回</a>
			</div>
		</div>

		<div style="display:none;" class="continue_to_mail">
			<input type="text" class="new_mail new_input" style="margin-top:123px;" name="newphone" placeholder="输入新绑定邮箱" />
			<button class="mail_next" style="margin-top:60px;">下一步</button>
		</div>

		<div style="display:none;" class="content_pwd">
			<input type="password" class="mail_pwd new_input" style="margin-top:123px;" name="newphone" placeholder="输入新密码" />
			<button class="mail_next" style="margin-top:60px;">下一步</button>
		</div>

		<div style="display:none;" class="mail_waiting">
			<div style="color:#3a7dda" class="success_title">
				<span style="background-position:0 -46px" class="success_logo"></span>
				邮箱验证	
			</div>
			<div class="success_tip">
				<span>请前往bekii@zealer.com查收完成验证。未收到邮件？</span>
				<a style="color:#3a7dda" class="tip_back" href="/user?pagetype=setmail">重新发送</a>
			</div>
		</div>
	</div>
</div>

<div class="show_bg">
	<div class="pop_close pop_image"></div>	
	<div class="bg_title">
		<span style="width:13px; height:14px; background-position:0 -106px;" class="title_logo"></span>	
		完善信息	
	</div>

	<div class="bg_content">
		<div class="phone_success content_success">
			<div class="success_title">
				<span class="success_logo"></span>
				修改成功
			</div>
			<div class="success_tip">
				<span>你可以使用新手机号码登录。</span>
				<a class="tip_back" href="/user?pagetype=setmail">3s后自动返回></a>
			</div>
		</div>

		<div class="mail_success content_success">
			<div style="color:#3a7dda" class="success_title">
				<span style="background-position:0 -76px" class="success_logo"></span>
				修改成功
			</div>
			<div class="success_tip">
				<span>你可以使用新邮箱登录。</span>
				<a style="color:#3a7dda" class="tip_back" href="/user?pagetype=setmail">3s后自动返回></a>
			</div>
		</div>

		<div class="mail_waiting content_success">
			<div style="color:#3a7dda" class="success_title">
				<span style="background-position:0 -46px" class="success_logo"></span>
				邮箱验证	
			</div>
			<div class="success_tip">
				<span>请前往bekii@zealer.com查收完成验证。未收到邮件？</span>
				<a style="color:#3a7dda" class="tip_back" href="javascript:;">重新发送</a>
			</div>
		</div>

		<div class="phone_input content_input">
			<input type="text" class="new_phone new_input" name="newphone" placeholder="输入绑定手机" />
			<input type="text" class="phone_code" name="phonecode" placeholder="输入验证码" />
			<button class="get_code">获取验证码</button>
			<? if( empty($binding['password']) ){ ?>
			<input type="password" class="phone_pwd" name="phonepwd" placeholder="输入新密码" />
			<? } ?>
			<button class="phone_next">下一步</button>
		</div>
		
		<div class="mail_input content_input">
			<input type="text" class="new_mail new_input" style="margin-top:123px;" name="newphone" placeholder="输入绑定邮箱" />
			
			<button class="mail_next" style="margin-top:60px;">下一步</button>
		</div>	
	</div>
</div>

<div class="bg_modify" style="display:none;">
	<div class="pop_close pop_image"></div>	
	<div class="bg_title">
		<span style="" class="title_logo"></span>	
		验证手机	
	</div>

	<div class="modify_content">

		<div class="old_phone_change old_phone">
			<ul class="phone_process">
				<li>
					<p class="acting">验证身份</p>
					<span style="background-position:0 -120px;"></span>
				</li>
				<li>
					<p>验证新号码</p>
					<span></span>
				</li>
				<li>
					<p>完成</p>
					<span></span>
				</li>
			</ul>
			<input type="text" class="modify_phone_input" placeholder="输入绑定手机验证" />  
			<input type="text" class="old_phone_code" placeholder="输入验证码" />
			<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
			<button class="old_get_code">获取验证码</button>
			<button class="old_phone_next">下一步</button>
			<button class="new_phone_prev">上一步</button>
			<button class="new_phone_next">下一步</button>
		</div>
		
		<div class="new_phone_success old_phone">
			<ul class="phone_process">
				<li>
					<p class="acting">验证身份</p>
					<span style="background-position:0 -120px;"></span>
				</li>
				<li>
					<p class="acting">验证新号码</p>
					<span style="background-position:0 -120px;"></span>
				</li>
				<li>
					<p class="acting">完成</p>
					<span style="background-position:0 -120px;"></span>
				</li>
			</ul>
			<p style="margin-top:14px">修改成功</p>
			<p>你可以使用新号码登录</p>
			<button class="nPhone_btn">完成</button>
		</div>

		<div style="height:339px;" class="modify_mail">
			<input type="text" class="old_mail_input" name="newphone" placeholder="输入原来的绑定邮箱" />
			<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
			<button class="mail_next">下一步</button>
		</div>

		<div class="mail_waiting content_success">
			<div style="color:#3a7dda" class="success_title">
				<span style="background-position:0 -46px" class="success_logo"></span>
				邮箱验证	
			</div>
			<div class="success_tip">
				<span>请前往bekii@zealer.com查收完成验证。未收到邮件？</span>
				<a style="color:#3a7dda" class="tip_back" href="javascript:;">重新发送</a>
			</div>
		</div>
	</div>
	
	
</div>
<!--{endBlock}-->

{widget "page"}
