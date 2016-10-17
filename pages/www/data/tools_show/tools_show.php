
<?
$default = 'video';
if(empty($list['link'])) {
	$default = 'surface';
}

$arrShowTools = array(
	'configure' => true,
	'surface' => true,
	'camera' => true,
	'screen' => true,
	'battery' => true,
	'temp' => true,
	'system' => false,
	'comment' => false 
);
//当前手机信息
$list = $specs[0];
?>

<ul class="tools_content">
	<li class="content_date" data-type="configure">
		{$list['release_date']}上市
	</li>
	<li class="content_pixels" data-type="camera">
		{$list['camera_pixels']} 万像素摄像头
	</li>
	<li class="content_inch" data-type="screen">
		{$list['inch']} 寸屏幕
	</li>
	<li class="content_battery" data-type="battery">
		{$list['battery_capacity']} 电池
	</li>
	<li class="content_cpu" data-type="temp">
		{=preg_replace( '/（(.*)）/', '', $list['cpu'])}
	</li>
</ul>

<div class="tools">

	<div class="item">
		{widget "configure", array('mobile' => $mobile, 'specs' => $specs, 'company' => $company)}
	</div>

	<div class="item">
		{widget "surface", array('mobile' => $mobile, 'company' => $company, 'cover' => $cover)}
	</div>

	<div class="item">
		{widget "camera", array('mobile' => $mobile, 'company' => $company)}
	</div>

	<div class="item">
		{widget "screen", array('mobile' => $mobile, 'company' => $company)}
	</div>

	<div class="item">
		{widget "battery", array('mobile' => $mobile, 'company' => $company)}
	</div>

	<div class="item">
		{widget "temp", array('mobile' => $mobile, 'company' => $company)}
	</div>

	<!-- 第一版系统性能不上 -->
	<?if($arrShowTools['system']) {?>
	<div class="item">
		{widget "system", array('mobile' => $mobile)}
	</div>
	<?}?>

	<!-- 第一版zealer点评不上 -->
	<?if($arrShowTools['comment']) {?>
	<div class="item">
		{widget "comment", array('contrastList' => $contrastList)}
	</div>
	<?}?>

</div>

<!--{scriptPool}-->
<script>
Z.use('data/tools_show', {defaultTag: '<?= $default ?>'});
</script>
<!--{/scriptPool}-->
