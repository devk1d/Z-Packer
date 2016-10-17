<?
$url_redirect = Yii::app()->request->getQuery('redirect', '');

if($url_redirect) {
	$redirect = urldecode($url_redirect);
}
$redirect = $redirect.'user';
?>
<h2>第三方账号</h2>
<? 
//var_dump($social);die;
?>
<div class="user_social" style="display:none">
	<input type="text" />
</div>
<ul class="user_account">
<? 
$sina = false;
$sina_id = '';
$qq = false;
$alipay = false;
if( $social['total_number'] != 0 ){
	foreach($social['list'] as $key=>$value) { 
		switch ($value['social_type']){	
			case 'SINA':
				$sina = true;
				$sina_id = $value['id'];
				break;
			case 'ALIPAY':
				$alipay = true;
				$alipay_id = $value['id'];
				break;
			case 'QZONE':
				$qq = true;
				$qq_id = $value['id'];
				break;
		}
	}
} ?>
	<li>
		<div style="background-position:0 -60px"></div>
		<h3>QQ</h3>
		<? if( $qq ){ ?>
			<span>已绑定</span>
			<a href="javascript:;" sid="{$qq_id}" class="binding">解除绑定</a>
		<? }else { ?>
			<span>未绑定</span>
			<a href="{_WWW_HOST}user/qq?from={$from}&redirect={$redirect}" otype="qq">添加绑定</a>
		<? } ?>
	</li>
	<li>
		<div style="background-position:-60px -60px"></div>
		<h3>微博</h3>
		<? if( $sina ){ ?>
			<span>已绑定</span>
			<a href="javascript:;" sid="{$sina_id}" class="sina_del binding">解除绑定</a>
		<? }else { 
			
		?>
			<span>未绑定</span>
			<a href="{_WWW_HOST}user/sina?from={$from}&redirect={$redirect}" otype="SINA">添加绑定</a>
		<? } ?>
	</li>
	<li>
		<div style="background-position:-120px -60px"></div>
		<h3>支付宝</h3>
		<? if( $alipay ){ ?>
			<span>已绑定</span>
			<a href="javascript:;" sid="{$alipay_id}" class="binding">解除绑定</a>
		<? }else { ?>
			<span>未绑定</span>
			<a href="{_WWW_HOST}user/aliPay?from={$from}&redirect={$redirect}" otype="apay">添加绑定</a>
		<? } ?>
	</li>
	<?/*
	<li>
		<div style="background-position:-180px -60px"></div>
		<h3>微信</h3>
		<? if( $alipay ){ ?>
			<span>已绑定</span>
			<a href="javascript:;" sid="{$alipay_id}" class="binding">解除绑定</a>
		<? }else { ?>
			<span>未绑定</span>
			<a href="{_WWW_HOST}user/wechat?from={$from}&redirect={$redirect}" otype="apay">添加绑定</a>
		<? } ?>
	</li>
	*/?>
</ul>
