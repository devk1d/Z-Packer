
		<? 
			foreach ($list['list'] as $key => $value) {
		?>
		<div class="list_inner clear">
			
			<a target="_blank" href="{_PLUS_HOST}post/{$value['id']}.html" class="inner_left">
				<div class="comments">评论</div>		
				<div class="comments comment_nums">{$value['post_total']}</div>		
			</a>
			
			<div class="inner_right clear">
				<a href="{_PLUS_HOST}post/{$value['id']}.html" id="right_title"  target="_blank" class="color_black">
					<?php echo LibBase::substr($value['title'], 62, 62); ?>
				</a>
				
				<?
					$images = LibBase::getContentImages($value['content'], 120, 80);
					if(count($images) > 0) {
				?>
				<div class="img_content clear">
				<?foreach($images as $key => $value1) {
					if($key > 3) {
						break;
					}
				?>
					<a href="{_PLUS_HOST}post/{$value['id']}.html" class="img_content" target="_blank"> <img src = "{$value1}" class="tag_pic" alt=""></a>
				<? } ?>	
				</div>
				<? } ?>	
				<div class="right_tips">
					<a class="user_name" href="/personal/{$value['users']['id']}" rel="nofollow">{$value['users']['nickname']}</a>
					<div class=" global_user global_user_level level_{$value['users']['level_type']}_{$value['users']['level']} user_level" alt="会员等级"></div>
					<span class="post_creatTime global_grey_icons"><? echo LibBase::changeDate($value['created_at'])?></span>
					<?if(!empty($value['group_id'])){?>
						<span>来自&nbsp;</span><a href="{_PLUS_HOST}group/{$value['group_id']}" class="group_name" target="_blank"> {$value['group_name']} </a><span>&nbsp;小组</span>	
					<?}?>
					<div class="tips_related">
						<em class="plusGlobalIcons related_comment"></em>  {$value['praise_total']}
						<em class="related_eyes plusGlobalIcons topic_comment_num"></em>  {$value['views_total']}
					</div>
				</div>
			</div>
		</div>
		<?}?>
