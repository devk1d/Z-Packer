<?php
//echo dirname(__FILE__);
//require_once(dirname(__FILE__).'/../../pages/www/lucky/jssdk.php');
/*
$jssdk = new JSSDK("wxbdd4ddac2b9417e3", "d52b22a106b1a3aa02481da2e0b0446e");
$signPackage = $jssdk->GetSignPackage();
$appId = $signPackage['appId'];
$timestamp = $signPackage['timestamp'];
$nonceStr = $signPackage['nonceStr'];
$signature = $signPackage['signature'];
{widget "page", array('appId' => $appId, 'timestamp' => $timestamp, 'nonceStr' => $nonceStr, 'signature' => $signature)}
*/
?>

{setLayout "mobile"}

{setTitle "猴年办公新行头"}

{scripts STATIC_HOST."js/easing.js"}
{scripts "http://res.wx.qq.com/open/js/jweixin-1.0.0.js"}

<!--{startBlock "content"}-->

{widget "page"}

<!--{endBlock}-->
