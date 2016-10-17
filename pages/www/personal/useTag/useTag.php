
<?
//var_dump($tagList);die;
if($isSelf) {
	$isSelfTxt = "我";
	$isSelfT = "您";
} else {
	$isSelfTxt = "他";
	$isSelfT = "他";
}?>		
<div class="useTag_wrap clear">
	<h2>{$isSelfTxt}参与过的标签</h2>
	
	<? if(!empty($tagList['joinlist'])){?>
	<div class="join_tags clear">
		<?foreach ($tagList['joinlist'] as $key => $value) {  
			$css = "";	
		if(($key != 0) && (($key+1)%3 == 0)) {
			$css = 'rightNo'; 
		}
		if($key < 9) {
	?>
		<a href="{_PLUS_HOST}tag/{$value['tag_id']}" target="_blank" class="{$css} clear">
			<span class="tag_name">{$value['tag_name']}</span>
			<span class="join_time">{$value['join_total']}</span>
		</a>
	<?}}?>
	</div>
	<?} else {?>
		<div class="empty_title clear">
			{$isSelfT}还没有在标签下参与讨论。看看大家都在聊些什么~
			<div class="tab_change">换一批</div>
		</div>	
		<div class="empty_con">
			<?
			foreach ($tagList['emptyjoin'] as $key => $value) {  
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
		</div>
	<?}?>	
</div>
<!--{scriptPool}-->
<script>
Z.use('personal/useTag');
</script>
<!--{/scriptPool}-->
