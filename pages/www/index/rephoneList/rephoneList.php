<div class="rephone_wrap clear">

	<div class="index_title clear">
		<div class="index_titleMain">
			<a class="global_gaNode plusArt_title" href="{_FIX_HOST}" target="_blank" data-galabel="home_rephone_nav_title">
				<h1>FIX 手机服务</h1>
			</a>
			<a class="global_gaNode index_titleMore" href="{_FIX_HOST}" target="_blank" data-galabel="home_rephone_nav_more">MORE ></a>
		</div>
	</div>

	<div class="rephone_top clear">
		<ul class="rephone_leftWrap clear">
		<?foreach($fixBanner['left'] as $key => $val ){ ?>
			<li class="rephone_leftItem rephone_leftItem{$key}">
				<a class="global_gaNode" href="{$val['target']}" target="_blank" data-id={$val['id']} data-galabel="home_rephone_small_{$key + 1}">
					<img class="rephone_leftImg" src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
				</a>
			</li>
		<?}?>
		</ul>
		<?$fixRight = $fixBanner['right'][0];?>
		<a class="rephone_rightWrap global_gaNode" href="{$fixRight['target']}" target="_blank" data-id={$fixRight['id']} data-galabel="home_rephone_big_1">
			<img class="rephone_rightImg" src="{=ImagesQcloud::image_url($fixRight['cover'], 0, 0)}" />
		</a>
	</div>

	<ul class="rephone_listWrap clear">
	<?foreach($fixBanner['bottom'] as $key => $val ){ ?>
		<li class="rephone_listItem rephone_listItem{$key}">
			<a class="global_gaNode" href="{$val['target']}" target="_blank" data-id={$val['id']} data-galabel="home_rephone_articel_{$key + 1}">
				<img class="rephone_listImg" src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
			</a>
		</li>
	<?}?>
	</ul>


</div>
