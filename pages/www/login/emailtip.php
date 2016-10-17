
{setLayout "none"}

{setTitle "ZEALER 邮箱验证"}

<!--{startBlock "content"}-->
<div class="wrap">
	{widget "header"}
	<div class="emailtip_title">
		请进行邮箱验证
	</div>
	<div class="emailtip_con">
	你好，你的邮箱: {$email} 还未进行过验证！	
	</div>
	<div class="emailtip_tips">
		请选择：<a href="/login/emailsend?uid={$uid}&email={$email}&redirect={$redirect}"> 发送验证邮件</a> 进行验证或 <a href="javacript:;" onclick="window.history.back();return false;" >更换登录方式</a> 	
	</div>
</div>

{widget "page", array('redirect'=>$redirect)}
<!--{endBlock}-->
