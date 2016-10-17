<!-- 大banner -->
<?if($banner && !isset($banner['error'])){
	$bannerBig = $banner['big'][0];
	$bannerSmall = $banner['small'];
?>

<ul class="banner_first clear">
	<li class="banner_firstBig">
		<? if (preg_match('/adServer.bs/i', $bannerBig['target'])) { ?>
		<a class="global_gaNode exposure" href="{$bannerBig['target']}" target="_blank" data-id={$bannerBig['id']} data-galabel="home_banner_big">
		<? } else { ?>
		<a class="global_gaNode" href="{$bannerBig['target']}" target="_blank" data-id={$bannerBig['id']} data-galabel="home_banner_big">
		<? } ?>
			<img src="{=ImagesQcloud::image_url($bannerBig['cover'], 0, 0)}" />
			<div class="banner_cover"></div>
		</a>
	</li>

	<?foreach($bannerSmall as $key => $val) {?>
	<li>
		<a class="global_gaNode" href="{$val['target']}" target="_blank" data-id={$val['id']} data-galabel="home_banner_small_{$key + 2}">
			<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
			<div class="banner_cover"></div>
		</a>
	</li>
	<?}?>

</ul>
<?}?>

<!-- 副banner -->
<?if($secSlider && !isset($secSlider['error'])){?>
<div class="banner_sliderWrap">
	<div class="slider_arrow slider_arrowLeft index_icons global_gaNode" data-galabel="home_banner_arrow_left"></div>
	<div class="slider_arrow slider_arrowRight index_icons global_gaNode" data-galabel="home_banner_arrow_right"></div>
	<div class="banner_slider">
		<ul class="slider_list banner_sliderUl clear">
			<?foreach($secSlider as $key => $val) {?>
			<?
				$order = $key;
				if($order == 0){
					$order = 8;
				}
			?>
			<li class="slider_iterm slider_item{$order}">
				<a class="global_gaNode" href="{$val['target']}" target="_blank" data-id={$val['id']} data-galabel="home_banner_slider_{$order}">
					<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
					<div class="secbanner_cover"></div>
					<div class="secbanner_title_wrap">
						<h2 class="secbanner_title">{=LibBase::substr($val['title'], 40, 37)}</h2>
						<!--
						<span class="secbanner_tip">{$val['tips']}</span>
						-->
					</div>
				</a>
			</li>
			<?}?>
		</ul>
	</div>
</div>
<?}?>
