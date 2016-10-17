<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Wed 03 Aug 2016 05:06:12 PM CST
*/
?>
<div class="plus_article">

	<div class="index_title clear">
		<div class="index_titleMain">
			<a class="global_gaNode plusArt_title" href="{_PLUS_HOST}test" data-galabel="home_plusArt_nav_title">
				<h1>深度好文</h1>
			</a>
			<a class="global_gaNode index_titleMore" href="{_PLUS_HOST}test" data-galabel="home_plusArt_nav_more">MORE ></a>
		</div>
	</div>

	<div class="art_wrap clear">
		<ul class="art_list clear">
			<?foreach($plusArtList['list'] as $key => $val) {//var_dump($plusArtList);die;?>
			<li class="article_item article_item{$key}">
				<a class="global_gaNode" href="{$val['target']}" target="_blank" data-galabel="home_plus_article_{$key + 1}">
					<div class="img_box">
						<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
						<div class="plus_article_cover"></div>
					</div>
					
					<h3 class="article_title {=($key%2 == 0 ? 'yellow_line' : '')}">
						{=$val['title'] ? LibBase::substr($val['title'], 34, 34) : LibBase::substr($val['btitle'], 34, 34)}
					</h3>
					<?
						$content = strip_tags(htmlspecialchars_decode($val['content']));
						$newcontent = trim($content);
					?>
					<p class="article_content">{=LibBase::substr($newcontent, 108, 105)}</p>
					<span class="article_total index_icons">{$val['views_total']}</span>
				</a>
			</li>
			<?}?>
		</ul>
		<div class="art_listArrow">
			<span class="page_arrow arrow_left index_icons global_gaNode" data-galabel="home_plus_dot_left"></span>
			<span class="page_arrow arrow_right index_icons unclick global_gaNode" data-galabel="home_plus_dot_right"></span>
		</div>
	</div>
</div>

<div class="plus_sliderWrap">
	<div class="plus_sliderSkin">
		<div class="plus_slider">
			<div class="slider_arrow slider_arrowLeft index_icons global_gaNode" data-galabel="home_plus_arrow_left"></div>
			<div class="slider_arrow slider_arrowRight index_icons global_gaNode" data-galabel="home_plus_arrow_right"></div>
			<div class="slider_coverLeft"></div>
			<div class="slider_coverRight"></div>
			<ul class="slider_list plus_sliderList clear">
				<?foreach($plusSlider as $key => $val) {?>
				<?
					if($key == 0){
						$order = 7;	
					} else if($key == 1){
						$order = 8;	
					} else {
						$order = $key - 1;	
					}
				?>
				<li class="slider_item slider_item{$order}">
					<a class="global_gaNode" href="{$val['target']}" target="_blank" data-galabel="home_plusArt_slider_{$order}">
						<img class="slider_img" src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
						<div class="plus_article_cover"></div>
						<span class="slider_tip">{=LibBase::substr($val['tips'], 32, 32)}</span>
					</a>
				</li>
				<?}?>
			</ul>
		</div>
	</div>
</div>

