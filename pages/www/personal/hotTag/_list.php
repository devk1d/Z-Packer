

<?
//var_dump($list);die;
foreach ($list as $key => $value) {  
	$css = "";	
	if(($key != 0) && (($key+1)%2 == 0)) {
		$css = 'rightNo'; 
	}			
?>
<a href="{_PLUS_HOST}post/{$value['id']}.html" target="_blank" class="{$css} post_item clear">
	<?
		$images = LibBase::getContentImages($value['content'], 80, 60, IMG_TYPE_SQ_M);
		$maxlen1 = 36;
		$maxlen2 = 22;
		if(!empty($images)) {
			$maxlen1 = 20;
			$maxlen2 = 10;
			foreach($images as $key => $value1) {
				if($key < 1) {?>
				<img class="rec_article_pic"  src="{$value1}" style="width: 80px; height: 60px;" alt="{$value['title']}"/>		
				<?}  
			}
		}
	?>
	<div class="rec_post_name">
		{=LibBase::substr($value['title'], $maxlen1, $maxlen1)}	
	</div>
	<? if($value['profile_image_url']) { ?>
		<img class="rec_user_pic" src="{echo ImagesQcloud::image_url($value['profile_image_url'], 55, 55)}" />
	<? } else { ?>
		<img class="rec_user_pic" src="{_STATIC_HOST}images/plus/mb_pic250.gif" class="group_portrait">
	<? } ?>
	<span class="rec_user_name">
		{=LibBase::substr($value['username'], $maxlen2, $maxlen2)}	
	</span>
	<span class="rec_right topic_num">	
		<span class="topic_visit_num plusGlobalIcons">
			{$value['views_total']}	
		</span>
		<span class="topic_comment_num plusGlobalIcons">
		{$value['post_total']}	
		</span>
	</span>
</a>
<?}?>
