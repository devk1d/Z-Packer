<? 
var_dump($list);die; 
if( !empty($list['list']) && $list['total_number'] > 0 ){
foreach($list['list'] as $key=>$value) { 
	switch ($value['site']) {
		case 'WWW':
			$url = WWW_HOST.'post/'.$value['thread_id'].'.html';
			break;
		case 'PLUS':
			$url = PLUS_HOST.'post/'.$value['thread_id'].'.html';
			break;
		case 'ASK':
			$url = ASK_HOST.'post/'.$value['thread_id'].'.html';
			break;
	}	

	if( $value['type'] == 'collect' ){
		// 定义在循环用到的title	
		$content = '';

		$thread_id = $value['thread_id'];
?>
<div class="message_cardWrap">
	<div class="post_reply clear">
		<div class="inner_left">
			<a href="/user/{$value['opera_user_id']}" target="_blank" rel="nofollow">		
				<?	if (empty($value['profile_image_url'])) {?>
					<img src="{_STATIC_HOST}images/plus/mb_pic50.gif" class="pic_size" alt="会员头像" />
				<?	} else {?>
					<img src="{echo ImagesQcloud::image_url($value['profile_image_url'],50,50)}" class="pic_size" alt="头像" />
				<? } ?>
			</a>
		</div>
		<div class="inner_right">
			<a rel="nofollow" href="/user/72" class="user_name">{$value['username']}</a>
			<span class="inner_right_time">
				<s class="global_grey_icons grey_time"></s>
				<em class="global_icons_gap"><? echo LibBase::changeDate($value['created_at'])?></em> 
			</span>
			<div class="reply_others clear">
				<div class="others_text">
					<span class="global_blue">{$content}</span>:
					<? if ($value['type'] == 'assist' && $value['post_id'] != 0) {
						 if(empty($value['content'])) {?>
							<a href="{$url}?page={$page}&f={$floor_id}">
						   		<? echo($value['message']);?>
							</a>
						<?} else {?>
							<a href="{$url}?page={$page}&f={$floor_id}">
							<?$showContent = strip_tags(htmlspecialchars_decode($value['content']));
							echo(libBase::substr($showContent,80,80));?>
							</a>
						<?}?>
					 <? } else {
						 if(empty($value['content'])) {?>
							<a href="{$url}">
						   		<? echo($value['message']);?>
							</a>
						<?} else {?>
							<a href="post/{$value['thread_id']}">
							<?$showContent = strip_tags(htmlspecialchars_decode($value['content']));
							echo(libBase::substr($showContent,80,80));?>
							</a>
						<?}}?>
					</a>
				</div>
			</div>

			<div class="right_tips">
			   <a href={$url} class="send_reply">查看</a>
			</div>
	     </div>
	  </div>
   </div>
<? } } 
}else { ?>
<li class="no_inform">暂时没有新通知</li>
<? } ?>
<li totalNum="{$list['total_number']}" style="display:none"></li>
