
<?
	//处理帖子详情页面跳转链接
	function getPostUrl($type, $theme, $id) {
		$postUrl = '';
		switch($type) {
			 case 'normal':
			 case 'vote':
				$postUrl = 'post/' . $id . '.html';
				break;
			case 'barrage':
				$postUrl = 'video/' . $id . '.html';
				break;
			case 'pubtest':
				if($theme == 'Y') {
					$postUrl = 'test/' . $id . '.html';
				}else {
					$postUrl = 'report/' . $id . '.html';
				}
				break;
		}

		return $postUrl;
	}

	if($isSelf) {
		$isSelfTxt = "我";
		$uid = "";	
	} else {
		$isSelfTxt = "他";
	}
	switch($type) {
		case 'great':
			$subTxt = '精华帖';
			break;
		case 'post':
			$subTxt = '发帖';
			break;
		case 'reply':
			$subTxt = '回帖';
			break;
		case 'vote':
			$subTxt = '投票';
			break;	
		case 'ask':
			$subTxt = '提问';
			break;	
		case 'answer':
			$subTxt = '回答';
			break;	
	}
?>
<?/*
<?if($show) {?>
<div class="personal_sub_title">	
	<h2>
		{$isSelfTxt}的{$subTxt}
		<a class="" href="/personal/{$uid}">返回个人中心 &gt;</a>	
	</h2>
</div>
<?}?>
*/?>
<? 
if($type == 'ask') {
	echo $this->getTemplate('_content', array('isSelf' => $isSelf, 'page' => $page, 'type'=>'post', 'isShow'=> false,  'list' => $list), 'askList', 'personal');
	return;
}
?>

<? 
if($type == 'answer') {
	echo $this->getTemplate('_content', array('isSelf' => $isSelf, 'page' => $page, 'type'=>'answer',  'isShow'=> false, 'list' => $list), 'askList', 'personal');
	return;
}
?>

<?if(($type != 'vote') && ($type != 'reply')) { //精华帖和发帖样式
	if($list['total_number'] != 0) {?>
	<div class="great_post_wrap" data-page="{$page}" data-totalnum="{$list['total_number']}">
		<?	foreach ($list['list'] as $key => $value) {
		?>
		<div class="list_inner clear">
			<a target="_blank" href="{_PLUS_HOST}{=getPostUrl($value['type'], $value['is_theme'], $value['thread_id'])}" class="inner_left">
				<div class="comments">评论</div>		
				<div class="comments comment_nums">{$value['post_total']}</div>		
			</a>
			
			<div class="inner_right clear">
				<a href="{_PLUS_HOST}{=getPostUrl($value['type'], $value['is_theme'],$value['thread_id'])}" id="right_title"  target="_blank" class="color_black">
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
					<a href="{_PLUS_HOST}{=getPostUrl($value['type'], $value['is_theme'],$value['thread_id'])}" style="margin-right: 20px;" class="img_content" target="_blank"> <img src = "{$value1}" class="tag_pic" alt=""></a>
				<? } ?>	
				</div>
				<? } ?>	
				<div class="right_tips">
					<a class="user_name" href="/personal/{$value['user_id']}" rel="nofollow">{$value['users']['nickname']}</a>
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
			<!--inner_right-->
		</div>
		<?}?>
		<div class="index_page page_center"></div>
	</div>
	<?} else {?>
		<div class="empty_title clear">
			暂无记录，看看社区大家都在发什么帖子吧！ 
			<div class="tab_change">换一批</div>
		</div>	
		<div class="empty_con">
				<? 
					foreach ($greatPostList['emptypost']['list'] as $key => $value) {
				?>
				<div class="list_inner clear">
					
					<a target="_blank" href="{_PLUS_HOST}{=getPostUrl($value['type'], $value['is_theme'],$value['id'])}" class="inner_left">
						<div class="comments">评论</div>		
						<div class="comments comment_nums">{$value['post_total']}</div>		
					</a>
					
					<div class="inner_right clear">
						<a href="{_PLUS_HOST}{=getPostUrl($value['type'], $value['is_theme'],$value['id'])}" id="right_title"  target="_blank" class="color_black">
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
							<a href="{_PLUS_HOST}{=getPostUrl($value['type'], $value['is_theme'],$value['id'])}" style="margin-right: 20px;" class="img_content" target="_blank"> <img src = "{$value1}" class="tag_pic" alt=""></a>
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
<?} elseif ($type == 'reply') { //回复帖子样式
	//var_dump($list);die;
	if($list['total_number'] != 0) {?>
	<div class="reply_content_wrap" data-page="{$page}" data-totalnum ="{$list['total_number']}">	
		<?
			foreach ($list['list'] as $key => $value) {
		?>
		<div class="reply_list_inner clear">
			<div class="reply_left clear">
				<div class="reply_title">回复：	
					<a href="{_PLUS_HOST}{=getPostUrl($value['type'], $value['is_theme'],$value['thread_id'])}" id="right_title"  target="_blank" class="color_black">
						<?php echo LibBase::substr($value['title'], 62, 62); ?>
					</a>
				</div>	
				<div class="left_tips clear">
					<div class="reply_item clear">
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
							<a href="{_PLUS_HOST}{=getPostUrl($value['type'], $value['is_theme'],$value['thread_id'])}" style="margin-right: 20px;" class="img_content" target="_blank"> <img src = "{$value1}" class="tag_pic" alt="" style="width: 120px; height: 70px;"></a>
						<? } ?>	
						</div>
						<? } else { ?>
							{$value['content']}
						<? } ?>
					</div>
					<span class="post_creatTime ">
						<s class="global_grey_icons grey_time">
						</s>	
						<? echo LibBase::changeDate($value['created_at'])?>
					</span>
					<div class ="vote_right">
						<?
						if(!empty($value['group_id'])){?>
							来自<a href="{_PLUS_HOST}group/{$value['group_id']}" target="_blank"> {$value['group_name']} </a>小组	
						<?}?>
					</div>
				</div>
			</div>
		</div>
		<?}?>
		<div class="index_page page_center"></div>
	</div>
	<?} else {?>
		<div class="empty_collect clear">
			<div class="empty_left personal_logo">
				<div class="collect_tip">
					暂无记录！	
				</div>	
			</div>
		</div>	
	<?}?>	
<?} else { //投票帖子样式
	if($list['total_number'] != 0) {?>
	<div class="vote_content_wrap" data-page="{$page}" data-totalnum ="{$list['total_number']}">	
		<?
			foreach ($list['list'] as $key => $value) {
		?>
		<div class="vote_list_inner clear">
			<div class="vote_left clear">
				<div class="vote_title">投票：	
					<a href="{_PLUS_HOST}{=getPostUrl($value['type'], $value['is_theme'],$value['thread_id'])}" id="right_title"  target="_blank" class="color_black">
						<?php echo LibBase::substr($value['title'], 62, 62); ?>
					</a>
				</div>	
				<div class="left_tips">
					<div class="vote_item">
						<?if(count($value['votes']) == 2) {?>	
							投给了选项：{$value['votes'][0]} 和 {$value['votes'][1]}
						<?} else {?>
							投给了选项：{$value['votes'][0]} 
						<?}?>
					</div>
					<span class="post_creatTime ">
						<s class="global_grey_icons grey_time">
						</s>	
						<? echo LibBase::changeDate($value['created_at'])?>
					</span>
					<div class ="vote_right">
					<?if(!empty($value['group_id'])){?>
						来自<a href="{_PLUS_HOST}group/{$value['group_id']}" target="_blank"> {$value['group_name']} </a>小组	
					<?}?>
					</div>
				</div>
			</div>
			
		</div>
		<?}?>
		<div class="index_page page_center"></div>
	</div>
	<?} else {?>
		<div class="empty_collect clear">
			<div class="empty_left personal_logo">
				<div class="collect_tip">
					暂无记录！	
				</div>	
			</div>
		</div>	
	<?}?>	
<?}?>
