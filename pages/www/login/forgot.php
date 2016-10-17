{setLayout "none"}

{setTitle "ZEALER 找回密码"}

<!--{startBlock "content"}-->
<div class="wrap">
	{widget "header"}
	{widget "forgot", array('redirect'=>$redirect, 'step' => $step)}
</div>

{widget "page", array('redirect'=>$redirect)}
<!--{endBlock}-->
