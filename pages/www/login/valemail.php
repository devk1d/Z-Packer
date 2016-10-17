
{setLayout "none"}

{setTitle "ZEALER 邮箱验证"}

<!--{startBlock "content"}-->
<div class="wrap">
	{widget "header"}
	<div class="emailtip_title">
		请进行邮箱验证
	</div>
	<div class="emailtip_con">
		激活邮件已经发送到你的邮箱：{$email} <br/>
		请点击邮件中的链接激活账号
	</div>
	<div class="emailtip_tips">
		收不到？<a href="/login/emailsend?uid={$uid}&email={$email}&redirect={$redirect}"> 重新发送</a>
	</div>
</div>

{widget "page", array('redirect'=>$redirect)}
<!--{endBlock}-->
