
<?
if($isSelf) {
	$isSelfTxt = "我";
	$isSelfT = "您";
} else {
	$isSelfTxt = "他";
	$isSelfT = "他";
}?>		
<div class="hotTag_wrap clear">
	<h2>{$isSelfTxt}擅长的标签</h2>
	<? if(!empty($tagList['praiselist'])){ ?>
	<ul class="clear">
		<?foreach ($tagList['praiselist'] as $key => $value) {  
			$css = "";	
			if(($key != 0) && (($key+1)%3 == 0)) {
				$css = 'rightNo'; 
			}			
		?>
		<a class="{$css} clear tagItem_{$key}" href="{_PLUS_HOST}tag/{$value['tag_id']}" target="_blank">
			<div class="spinner spinner_{$key}" data-praise="{$value['praise_total']}">
				<div class="spinner_left">
					<div class="left">
					</div>
				</div>
				<div class="spinner_right">
					<div class="right">
					</div>
				</div>
				<div class="spinner_logo logo_pic"></div>
			</div>
			<div class="tagname">{$value['tag_name']}</div>
			<div class="tagpraise">获赞 <span class="tagpraisev">{$value['praise_total']}</span> 次</div>
		</a>
		<?}?>
	</ul>
	<?} else {?>
		<div class="empty_title clear">
			{$isSelfT}还没有在标签下获赞。看看大家都在赞些什么~	
			<div class="tab_change">换一批</div>
		</div>	
		<div class="empty_con">
			<?
			foreach ($tagList['emptypraise'] as $key => $value) {  
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
Z.use('personal/hotTag');
</script>
<!--{/scriptPool}-->
