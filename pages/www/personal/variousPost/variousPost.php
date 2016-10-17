
<?
	$css = '';
	$is_active = "";
	$list= $greatPostList;	
	$total = $greatPostList['total_number'];
	if($no_great) {
		$css = 'display: none';	
		$is_active = "active";
	} 
	if($isSelf) {
		//$uid = 0;	
	} 
	//var_dump($list);die;
?>
<div class="various_post_wrap" data-uid="{$uid}">
	<h2 class="clear">
		<a class="sub_title active" data-type="great" style="{$css}" href="/personal/great/{$uid}">精华帖</a>	
		<a class="sub_title {$is_active}" data-type="post" href="/personal/post/{$uid}">发帖</a>	
		<a class="sub_title" data-type="reply" href="/personal/reply/{$uid}">回帖</a>	
		<a class="sub_title" data-type="vote" href="/personal/vote/{$uid}">投票</a>	
		<a class="sub_title" data-type="vote" href="/personal/videocom/{$uid}">视频讨论</a>	
		<a class="sub_title" data-type="ask" href="/personal/ask/{$uid}">提问</a>	
		<a class="sub_title" data-type="answer" href="/personal/answer/{$uid}">回答</a>	
	</h2>
	
	<div class="various_content_wrap" data-total="{$total}">	
		<? 
		if($total != 0) {
		?>
			<div class="personal_inner_wrap clear" data-pos="no" data-page="{$page}" data-totalnum ="{$list['total_number']}">
				<?echo $this->getTemplate('_record_inner', array('greatPostList' => $greatPostList, 'type' => 'post', 'isSelf' => $isSelf, 'page' => $page, 'list' => $list, 'uid' => $uid), 'variousPost', 'personal');?>
			</div>
		<?} else {?>
			<div class="empty_title clear">
				暂无记录。看看社区正在发生什么精彩的故事~	
				<div class="tab_change">换一批</div>
			</div>	
			<div class="empty_con">
				<? 
					foreach ($greatPostList['emptypost']['list'] as $key => $value) {
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
						<div class="img_content clear" style="width: auto">
						<?foreach($images as $key => $value1) {
							if($key > 3) {
								break;
							}
						?>
							<a href="{_PLUS_HOST}post/{$value['id']}.html"  style="margin-right: 20px;" class="img_content" target="_blank"> <img src = "{$value1}" class="tag_pic" alt=""></a>
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
			</div>	
			<?/*	
			<div class="empty_collect clear">
				<div class="empty_left personal_logo">
					<div class="collect_tip">
						暂无记录！	
					</div>	
				</div>
			</div>	
			*/?>
		<?}?>	
	</div>
</div>
<!--{scriptPool}-->
<script>
Z.use('personal/variousPost');
</script>
<!--{/scriptPool}-->
