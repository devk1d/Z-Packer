<div class="phone_wrap clear">

	<div class="index_title clear">
		<div class="index_titleMain">
			<a class="global_gaNode plusArt_title" href="{_PHONE_HOST}" target="_blank" data-galabel="home_phone_nav_title">
				<h1>手机工具</h1>
			</a>
			<a class="global_gaNode index_titleMore" href="{_PHONE_HOST}" target="_blank" data-galabel="home_phone_nav_more">MORE ></a>
		</div>
	</div>

	<?
	if( count($module['list']) > 1 ){
		$component = $module['list'][1];
	?>
	<ul class="phone_component list_pic_3 clear">
	<? foreach( $component['subject'] as $key => $value ){
		$pics = CJSON::decode($value['pic']);
		?>
		<li class="each_{$key}">
			<a href="{$value['url']}" target="_blank" class="global_gaNode" data-galabel="home_phone_article_{$key + 1}">
				<img src="{=ImagesQcloud::image_url($pics['small_pic'], 0, 0)}" data-retina="{=ImagesQcloud::image_url($pics['big_pic'], 0, 0)}" />
				<!--<div class="phone_cover"></div>-->
			</a>
		</li>
	<? } ?>
	</ul>
	<? } ?>

	<ul class="phone_listWrap clear">
	<?foreach($phone as $key => $val ){ ?>
		<li class="phone_listItem phone_listItem{$key}">
			<a class="global_gaNode" href="{$val['target']}" target="_blank" data-id={$val['id']} data-galabel="home_phone_small_{$key + 1}">
				<img class="phone_listImg" src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
				<!--<div class="phone_cover"></div>-->
				<div class="lab_title_wrap">
					<h2 class="secbanner_title">{=LibBase::substr($val['title'], 34, 34)}</h2>
				</div>
			</a>
		</li>
	<?}?>
	</ul>

</div>

