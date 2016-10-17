<? //var_dump($list['phone']);die; 
$company = $list['company']['list'];
$system = $list['system']['list'];
$phone = $list['phone']['list'];
$banner = $list['banner']['list'];
//获取品牌数量，有些品牌下无手机不显示出来，但序号仍在，通过计数方法来确保数量
$company_num = 0;
?>

{widget "search", array('banner' => $banner)}
<div class="machine_main">
	<div class="main_company">
		<h1>品牌</h1>
		<p>请选择手机品牌</p>
		<div class="company_list item_list">
			<? foreach( $company as $key => $value ){ 
				if( $company_num > 14 ){
					break;
				} 
				$company_num++; ?>
			<a href="{_WWW_HOST}data/list/{$value['id']}">
				<img src="{echo ImagesQcloud::image_url($value['logo'], 0, 0)}" data-hover="{echo ImagesQcloud::image_url($value['logo_hover'], 0, 0)}" data-origin="{echo ImagesQcloud::image_url($value['logo'], 0, 0)}" />
				<span></span>
			</a>
			<? } ?>
			<a href="{_WWW_HOST}data/list">
				<img src="company_more.png" data-hover="company_hover.png" data-origin="company_more.png" />
				<span></span>
			</a>
		</div>
	</div>
	<div class="main_system">
		<h1>系统</h1>
		<p>请选择手机操作系统</p>
		<div class="system_list item_list">
			<? foreach( $system as $key => $value ){ ?>			
			<a href="{_WWW_HOST}data/list/0?&sid={$value['id']}">
				<img src="{echo ImagesQcloud::image_url($value['logo'], 0, 0)}" data-hover="{echo ImagesQcloud::image_url($value['logo_hover'], 0, 0)}" data-origin="{echo ImagesQcloud::image_url($value['logo'], 0, 0)}" />
				<span></span>
			</a>
			<? } ?>
		</div>
	</div>
	<div class="main_phone">
		<h1>手机</h1>
		<p>请选择手机</p>
		<div class="phone_list">
			<? foreach( $phone as $key => $value ){ ?>
				<div class="list_wrap">
					<div class="wrap_poster" data-offset="5">
						<div class="wrap_shadow poster_layer" data-offset="-10"></div>
						<a href="{_WWW_HOST}data/detail/{$value['id']}" class="wrap_img poster_layer" data-offset="-5">
							<img src="{echo ImagesQcloud::image_url($value['cover'], 0, 0)}" />
						</a>
					</div>
					<div class="wrap_words">
						<h2 class="" data-offset="-10">{$value['name']}</h2>
						<p class="" data-offset="-5">
						<? if( !empty($value['specs']) ){
							$data = explode('/', $value['specs']['selling_point']) ?>
						{=empty($data[0]) ? '' : $data[0]} {=empty($data[1]) ? '' : $data[1]}
						<? } ?>
						</p>
						<a class="" data-offset="-10" href="{_WWW_HOST}data/detail/{$value['id']}">详情</a>
					</div>
				</div>
			<? } ?>
		</div>
	 </div>
</div>
<!--{scriptPool}-->
<script>
	Z.use('data/index');
</script>
<!--{/scriptPool}-->
