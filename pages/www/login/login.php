{setLayout "none"}

{setTitle "ZEALER 登录"}

<!--{startBlock "content"}-->
<div class="wrap">
	{widget "header"}
	{widget "login", array('redirect'=>$redirect)}
</div>

{widget "page", array('redirect'=>$redirect)}
<!--{endBlock}-->
