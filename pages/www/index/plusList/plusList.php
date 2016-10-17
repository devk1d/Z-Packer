<?
	$recomBig = $plusRecom['big']['list'][0];
	$recomSmall = $plusRecom['small']['list'][0];
?>
<div class="plus_wrap">
	<div class="index_title clear">
		<div class="index_titleMain">
			<a class="global_gaNode plusRecom_title" href="{_PLUS_HOST}" data-galabel="home_plus_nav_title">
				<h1>OK 推荐</h1>
			</a>
			<a class="global_gaNode index_titleMore" href="{_PLUS_HOST}" data-galabel="home_plus_nav_more">MORE ></a>
		</div>
	</div>

	<div class="plus_recommend">
		<div class="recom_wrap clear">

			<div class="recom_top clear">
				<div class="recom_topLeft">
					<a class="global_gaNode" href="{$recomBig['target']}" target="_blank" data-galabel="home_plus_bigRecommend_1">
						<img src="{=ImagesQcloud::image_url($recomBig['cover'], 0, 0)}" />
						<div class="recom_titleWrap">
							<h3 class="recom_title">{=$recomBig['title'] ? LibBase::substr($recomBig['title'], 58, 55) : LibBase::substr($recomBig['btitle'], 58, 55)}</h3>
							<span class="recom_total index_icons">{$recomBig['views_total']}</span>
						</div>
						<div class="plus_cover"></div>
					</a>
				</div>
				<div class="recom_topRight">
					<a class="global_gaNode" href="{$recomSmall['target']}" target="_blank" data-galabel="home_plus_bigRecommend_2">
						<img src="{=ImagesQcloud::image_url($recomSmall['cover'], 0, 0)}" />
						<div class="recom_titleWrap">
							<h3 class="recom_title">{=$recomSmall['title'] ? LibBase::substr($recomSmall['title'], 58, 55) : LibBase::substr($recomSmall['btitle'], 58, 55)}</h3>
							<span class="recom_total index_icons">{$recomSmall['views_total']}</span>
						</div>
						<div class="plus_cover plus_coverR"></div>
					</a>
				</div>
			</div>

			<div class="recom_list">
				<?foreach($plusRecom['list']['list'] as $key => $val) {?>
				<li class="recom_item{$key}">
					<a class="global_gaNode" href="{$val['target']}" target="_blank" data-galabel="home_plus_recommend_{$key + 1}">
						<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
						<div class="plus_cover plus_coverBottom"></div>
					</a>
					<a class="global_gaNode" href="{$val['target']}" target="_blank" data-galabel="home_plus_recommend_{$key + 1}">
						<h3 class="recom_title">{=$val['title'] ? LibBase::substr($val['title'], 58, 55) : LibBase::substr($val['btitle'], 58, 55)}</h3>
					</a>
					<span class="recom_total index_icons">{$val['views_total']}</span>
				</li>
				<?}?>
			</div>
		</div>
	</div>

</div>

