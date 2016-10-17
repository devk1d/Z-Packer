<input type="hidden" name="mobile_num" value="{$list['total_number']}" >

<?
	if($list['total_number'] >0 ) { 
	foreach($list['list'] as $key => $value) { 
		$specs = $value['specs'] ? $value['specs']:'';
?>
<a href="/data/detail/{$value['id']}" target="_blank" class="clear">
   <div class="brand_list clear">
   		<div class="list_left clear">
			<div class="left_product clear">
				<div class="product_left">
					<h2>{$value['name']}</h2>
					<p>官方价格<span> ￥{$value['price']['official_price']} </span>起</p>
					<p>网上商城<span> ￥{$value['price']['lowest_price']} </span> 起</p>
					<span class="product_more">更多详情 &gt;</span>
				</div>
				<img src="{echo ImagesQcloud::image_url($value['cover'], 150, 160, IMG_TYPE_L_WH)}" class="product_pic">
			</div>
			<ul class="left_info clear">
				<li>
					<span class="info_scale"></span>
					<p class="info_fonts">
						长  <? echo $specs ? $specs['height'] : '' ?>mm  厚  <? echo $specs ? $specs['thickness']: '' ?>mm <br />
						宽  <? echo $specs ? $specs['width'] : '' ?>mm 重量  <? echo $specs ? $specs['weight'] : '' ?>g <br />
					</p>
				</li>
				<li>
					<span class="info_size"></span>
					<p class="info_fonts">
						尺寸  <? echo $specs ? $specs['inch'] : '' ?> 英寸 <br />
						分辨率   <? echo $specs ? $specs['resolution'] : '' ?><? echo ($specs && isset($specs['ppi'])) ? '('.$specs['ppi'].'PPI)' : '' ?>
					</p>
				</li>
				<li>
					<span class="info_camera"></span>
					<p class="info_fonts">
						前置  <? echo $specs ? $specs['front_camera_pixels'] : '' ?> 万像素 <br />
						后置  <? echo $specs ? $specs['camera_pixels'] : '' ?> 万像素 <br/>
					</p>
				</li>
				<li>
					<span class="info_cpu"></span>
					<p class="info_fonts">
						CPU  <? echo $specs ? LibBase::substr($specs['cpu'], 20, 17) : '' ?> <br />
						GPU <? echo $specs ?  $specs['gpu']: '' ?>
					</p>
				</li>
			</ul>
		</div>
   		<div class="list_right clear">
			<div class="right_pic">
				<input type="hidden" class="basic_data_{$value['id']}" 
					data-product={=CJSON::encode($value['product_score'])} 
					data-system='{$value["system_score"]}'
					data-specs='{$value["specs_score"]}' 
					data-screen='{$value["screen_score"]}' 
					data-camera='{$value["camera_score"]}' 
					data-battery='{$value["battery_score"]}' 
					data-temp='{$value["temp_score"]}'
					data-name='{$value["name"]}'
				/>
				<div class="list_star_chart" id="list_star_chart_{$value['id']}" data-id="{$value['id']}" style="width: 266px; height: 180px; margin: 18px 0 0 4px"></div>
			</div>
			<!--
			<div class="right_link"> 
				<a href="/data/detail/{$value['id']}" target="_blank">&gt;</a>
			</div>
			-->
		</div>
   </div>
   </a>
  <? }}else { ?>
  	<div class="list_no_data">
		<div class="no_data_inner">
			<span class="no_phone"></span>数据库暂无此款机型
		</div>
	</div>
  <? } ?>
