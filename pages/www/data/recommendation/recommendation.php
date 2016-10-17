
<div class="detail_recommendation">
	<?if(count($getPrice) > 0) {?>
	<div class="recomm_price">
		<div class="recomm_header prices_box clear">
			<span class="header_tag"></span>
			<span class="header_title">报价参考</span>
		</div>
		<div class="recomm_rom">
		<? foreach($getPrice['list'] as $key => $value) { 
			$active = $key == 0?'active': '';?>
			<span class="price_tab {$active}" data-id="{$key}">{$value['name']}</span>
		<? } ?>
		</div>
		<div class="price_wrap">
			<? 
			//var_dump($getPrice);die;
				foreach($getPrice['list'] as $key => $value) { 
			?>
				<div class="price_{$key} price_inner">
					
					<? if( $value['official_price'] != '0.00' ){ ?>
					<div>官方售价 
						<span class="inner_content">¥ {$value['official_price']}</span>
					</div>
					<? } 
					if( !empty($value['sales_platforms']) ){ ?>
					<div>网上商城
						<span class="inner_content {=(intval($value['jd_price']) == $value['lowest_price']) ? 'font_red' : ''}">¥ {$value['jd_price']} </span>
					</div>
					<div class="price_other">
						<div class="price_other_pos">
							<span class="hui_more">查看其它商家报价</span>
							<span class="hui_logo new_icons"></span>
						</div>
						<div class="price_other_box">
						<? foreach($value['sales_platforms'] as $key => $value2) { 
							if($value2['siteName'] == '淘宝网') {
								break;
							}
							$lowest = '';
							if($value2['price'] == $value['lowest_price']) {
								$lowest = 'low';
							}
						?>
							<div class="other_box_link">
								<a href="{$value2['url']}" target="_blank">
									<span class="link_1">{$value2['siteName']}</span>
									<span class="link_2 {$lowest}">¥ {$value2['price']}</a></span>
								</a>
							</div>
						<? } ?>
						</div>
					</div>
					<? } 
					if( empty($value['sales_platforms']) && $value['official_price'] == '0.00' ){ ?>
					<div>发售价格 
						<span class="inner_content">¥ {$value['sale_price']}</span>
					</div>
					<div>网上商城
						<span class="inner_content">暂无售价</span>
					</div>
					<? } ?>
				</div>
			<? } ?>
		</div>
	</div>
	<? }
	$show_video = false;
	$show_plus = false;
	//帖子和视频同时有时显示视频
	if( !empty($getRelate['video']['total_number']) && !empty($getRelate['plus']['total_number']) ){
		$show_video = true;
	} else if( !empty($getRelate['video']['total_number']) ){
		$show_video = true;
	} else if( !empty($getRelate['plus']['total_number']) ){
		$show_plus = true;
	}
	if( $show_video ){ //判断是否存在视频
		$video = $getRelate['video']['list']; ?>
	<div class="recomm_video">
		<div class="recomm_header">
			<span class="header_tag"></span>
			<span class="header_title">相关视频</span>
			<a class="header_link" href="{_WWW_HOST}" target="_blank">查看更多</a>
		</div>
		<div class="video_wrap">

			<? if( !empty($getRelate['video']['list']) ){ //只显示一个视频 ?>
				<div class="video_one">
					<a href="{_WWW_HOST}post/{$video[0]['post_id']}" target= "_blank" class="video_mask"></a>
					<img src="{echo ImagesQcloud::image_url($video[0]['cover'],300,150,IMG_TYPE_SQ_M)}" class="video_img" alt="video" />
				</div>
				<div class="video_title">
				  	<? echo (libBase::substr($video[0]['title'], 30, 30));?>
				</div>

			<? } else if(false) { //不显示多视频 ?>
			<ul class="clear">
				<? foreach($video as $key => $value) { ?> 
				<li>
					<a href="{_WWW_HOST}post/{$value['post_id']}" target= "_blank" class="video_mask"></a>
					<img src="{echo ImagesQcloud::image_url($value['cover'],300,150,IMG_TYPE_SQ_M)}" class="video_img" alt="video" />
				</li>
				<? } ?>
			</ul>
			<div class="video_control">
				<em class="btn_left"></em>
				<em class="btn_right"></em>
			</div>
			<? } ?>
		</div>
	</div>
	<? }
	if( $show_plus ){ //判断是否存在帖子 ?>
	<div class="recomm_plus">
		<div class="recomm_header">
			<span class="header_tag"></span>
			<span class="header_title">相关帖子</span>
			<a class="header_link" href="{_PLUS_HOST}" target="_blank">查看更多</a>
		</div>
		<div class="plus_wrap">
		<? foreach($getRelate['plus']['list'] as $key => $value) { ?> 
			<div class="new_icons">
				<a href="{_PLUS_HOST}post/{$value['post_id']}" target= "_blank">  
				  	<? echo (libBase::substr($value['title'], 30,30));?>
				</a>
			</div>
		<? } ?>
		</div>
	</div>
	<? } ?>
</div>

<!--{scriptPool}-->
<script>
	Z.use('data/recommend');
</script>
<!--{/scriptPool}-->
