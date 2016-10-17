<div class="video_wrap">
	<div class="index_title clear">
		<div class="index_titleMain">
			<a class="global_gaNode" href="/media" data-galabel="home_media_nav_title">
				<h1>官方视频</h1>
			</a>
			<a class="global_gaNode index_titleMore" href="/media" data-galabel="home_media_nav_more">MORE ></a>
		</div>

		<ul class="index_titleList clear">
			<?if(!empty($acid['list']) ){
				foreach ($acid['list'] as $key => $value) {
					if($value['status'] == 'show') {
			?>
			<li><a class="global_gaNode" target="_blank" href="/media?cid={$value['id']}&index={$key}" cid="{$value['id']}" data-galabel="home_media_nav_{$key + 1}">{$value['title']}</a></li>
			<?}}}?>
		</ul>

	</div>

	<?
	// 左侧手机测评专区
	$left = $videoBanner['big'][0];
	?>	
	<div class="video_container clear">
		<div class="video_left">
			<a class="global_gaNode" href="{$left['target']}" data-galabel="home_media_big_video">
				<img src="{=ImagesQcloud::image_url($left['cover'], 0, 0)}" />
				<div class="video_titleWrap">
					<span class="video_tip">{$left['tips']}</span>
					<h2 class="video_title">{=LibBase::substr($left['title'], 40, 37)}</h2>
					<p class="video_des">{=LibBase::substr($left['note'], 52, 49)}</p>
				</div>
				<span class="video_icon index_icons"></span>
				<div class="video_cover video_cover0"></div>
			</a>
		</div>

		<ul class="video_right">
			<?foreach($videoBanner['small'] as $key => $val) {?>
			<li class="video_list{$key}">
				<a href="{$val['target']}" class="global_gaNode" data-galabel="home_media_video_{$key + 1}">
					<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
					<div class="video_titleWrap">
						<span class="video_tip">{$val['tips']}</span>
						<h2 class="video_title">{=LibBase::substr($val['title'], 40, 37)}</h2>
						<p class="video_des">{=LibBase::substr($val['note'], 52, 49)}</p>
					</div>
					<span class="video_icon index_icons"></span>
					<div class="video_cover video_cover{$key + 1}"></div>
				</a>
			</li>
			<?}?>
		</ul>
	</div>
	<!-- 视频系列 -->
	<?if($videoSeries && !isset($videoSeries['error'])) {?>
	<div class="video_series">
		<div class="series_split_line"></div>
		<ul class="series_list clear">
			<?foreach($videoSeries['list'] as $key => $val) {?>
			<li class="series_item{$key}">
				<?if($val['type'] == 'URL' && $val['target'] != '') {?>
				<a href="{$val['target']}" target="_blank" class="series_itemImg global_gaNode" data-galabel="home_media_series_{$key + 1}">
					<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
					<span class="video_icon index_icons"></span>
					<div class="video_seriesCover"></div>
				</a>
				<a class="global_gaNode" href="{$val['target']}" target="_blank" data-galabel="home_media_series_{$key + 1}"><h3 class="series_subTitle">{$val['title']}</h3></a>
				<?} else {?>
				<a href="/series/{$val['id']}" target="_blank" class="series_itemImg global_gaNode" data-galabel="home_media_series_{$key + 1}">
					<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
					<span class="video_icon index_icons"></span>
					<div class="video_seriesCover"></div>
				</a>
				<a class="global_gaNode" href="/series/{$val['id']}" target="_blank" data-galabel="home_media_series_{$key + 1}"><h3 class="series_subTitle">{$val['title']}</h3></a>
				<?}?>
			</li>
			<?}?>
		</ul>
	</div>
	<?}?>
</div>

