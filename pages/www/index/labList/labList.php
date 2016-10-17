
<div class="lab_wrap">
	<div class="wrap_title clear">
		<a class="title_name global_gaNode" href="{_LAB_HOST}" target="_blank" data-galabel="home_lab_nav_title"><h2>实验室</h2></a>
		<span class="title_tab">
			<a class="global_gaNode" href="{_LAB_HOST}content?page=1" target="_blank" data-galabel="home_lab_nav_1">内容</a>
			<a class="global_gaNode" href="{_LAB_HOST}abstract" target="_blank" data-galabel="home_lab_nav_2">简介</a>
			<a class="global_gaNode" href="{_LAB_HOST}consult" target="_blank" data-galabel="home_lab_nav_3">咨询</a>
			<a class="global_gaNode" href="{_LAB_HOST}testing" target="_blank" data-galabel="home_lab_nav_4">众测</a>
			<a class="global_gaNode" href="{_LAB_HOST}" target="_blank" data-galabel="home_lab_nav_more">更多</a>
		</span>
	</div>
	<ul class="lab_list clear">
	<?if(!empty($lab)) {
	foreach ($lab as $key => $value) { ?>
	<li <?=($key % 2 == 0) ? "style='margin-right: 2%;'" : ''?>>
		<a class="global_gaNode" href="{$value['target']}" target="_blank" data-galabel="home_lab_detail_{$key + 1}">
			<img src="{echo ImagesQcloud::image_url($value['cover'], 550, 240)}" alt="{$value['title']}" />
			<span class="list_cover"></span>
			<span class="left_line"></span>
			<span class="right_line"></span>
			<span class="list_play">更多</span>
		</a>
		<h3 class="list_title">
			<?$title = preg_replace("/「[^」]+」/", "", $value['title']);?>
			{echo LibBase::substr($title, 35, 35)}
		</h3>
	</li>
	<?}}?>
	</ul>
</div>

<div class="lab_mWrap">
	<a href="{_LAB_HOST}" class="lab_mIndex">
		<img src="{=STATIC_HOST}images/www/index_lab.png" />
	</a>

	<ul class="lab_mMenu clear">
		<li><a href="{_LAB_HOST}content?page=1">内容</a></li>
		<li><a href="{_LAB_HOST}abstract">简介</a></li>
		<li><a href="{_LAB_HOST}consult">咨询</a></li>
		<li><a class="labMenu_last" href="{_LAB_HOST}testing">众测</a></li>
	</ul>
</div>

<!--{scriptPool}-->
<script>
Z.use('labList/labList');
</script>
<!--{/scriptPool}-->
