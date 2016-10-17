<?
$phone_case = $phoneData['phone_case'];
$tag_cloud = $phoneData['tag_cloud'];
$condition = $phoneData['condition'];
$basic = $phoneData['basic'];

//标签云链接处理
$url_1 = PHONE_HOST . '/list/0asb';
$url_2 = '';
$zealer_index = 100;
$zealer_tag = array('specials', 'subject', 'temp_score', 'camera_score', 'screen_score', 'battery_score');
foreach( $condition['list'] as $key => $value ){
	if( in_array($value['tag'][0]['type'], $zealer_tag) ){
		$zealer_index = $key;
	} else {
		if( $key < $zealer_index ){
			$url_1 .= '0b';
		} else {
			$url_2 .= '0b';
		}
	}
}
//标签云跳转链接
if( !empty($url_2) ){
	$url_2 = substr($url_2, 0, -1);
}

//价格处理
$newPrice= floor($basic['price']);

?>
<div class="post_data">
	<a href="{_PHONE_HOST}/post/{$phoneData['mobile_id']}" class="data_phone">
		<span></span>
		<? $case = ''; 
		if( !empty($phone_case) ){
			$i = 0;
			if( isset($phone_case[1]) ) $i = 1;
			$case = ImagesQcloud::image_url($phone_case[$i]['cover'], 0, 0);
		} ?>
		<img src="{$case}" />
	</a>

	<div class="data_cloud">
	<? $num = 0;
	foreach( $tag_cloud as $key => $value ){
		$url = $url_1 . $value['id'] . 'asb' . $url_2; ?>
			<a href="{$url}" target="_blank" class="cloud_tag cloud_tag_{$num}" title="{$value['name']}">{$value['name']}</a>
	<? $num++;
	if( $num > 4 ) break;
	} ?>
	</div>

	<div class="data_price">
		<div class="price_title">当前最低：</div>

		<? if( !empty($newPrice) ){ ?>
		<a href="{_PHONE_HOST}/post/{$phoneData['mobile_id']}" class="now_price clear">
			<span class="price_logo">￥</span>
			<span class="price_num">&nbsp;{$newPrice}.</span>
			<span>00</span>
		</a>

		<div class="price_canvas">
			<canvas width="360px" height="245px">*您的浏览器版本不支持该功能</canvas>
		</div>	

		<? } else { ?>
		<a href="{_PHONE_HOST}/post/{$phoneData['mobile_id']}" class="now_price clear">
			<span class="price_num">暂无</span>
		</a>
		<div class="no_pic"></div>
		<? } ?>
	</div>
</div>
<!--{scriptPool}-->
<script>
	Z.use('post/data', {trend: {=CJSON::encode($phoneData['trend'])}});
</script>
<!--{/scriptPool}-->
