<script type="text/javascript" src="http://yuntv.letv.com/bcloud.js"></script>
<? 
//var_dump($list);die;
if( !empty($list['list']) && $list['total_number'] > 0 ){
foreach($list['list'] as $key=>$value) { 
	//$css = $value['status'] == 'N' ?"un_read":"";
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
	// 判断评论类型 
	$content = "";
	if($value['type'] == 'answer') {
		$content = '回答了 我的提问';
	}

	$floor_id = $value['floor_id'];
	if ($value['type'] == 'reply') {
		$floor_id = $value['floor_id'];
	}
	$page = ceil($value['floor_id']/50) < 1 ? 1 : ceil($value['floor_id']/50);
	$thread_id = $value['thread_id'];
?>
<li>
<div class="message_cardWrap">
	<div class="post_reply clear">
		<div class="inner_left">
			<a href="/personal/{$value['opera_user_id']}" target="_blank" rel="nofollow">		
				<?	if (empty($value['profile_image_url'])) {?>
					<img src="{_STATIC_HOST}images/plus/mb_pic50.gif" class="pic_size" alt="会员头像" />
				<?	} else {?>
					<img src="{echo ImagesQcloud::image_url($value['profile_image_url'],50,50)}" class="pic_size" alt="头像" />
				<? } ?>
				<span class="global_user_level level_yellow_1"></span>
			</a>
		</div>

		<div class="inner_right">
			<a rel="nofollow" href="/personal/{$value['opera_user_id']}" class="user_name" target="_blank">{$value['username']}</a>
			<span class="inner_right_time">
				<s class="global_grey_icons grey_time"></s>
				<em class="global_icons_gap"><? echo LibBase::changeDate($value['created_at'])?></em> 
			</span>

			<p class="reply_content" data-id ={$value['id']}>
			<?  
				$page = ceil(1/50) < 1 ? 1 : ceil(1/50);
				$thread_id = $value['thread_id'];
				//此处进行回复内容输出
				//没有去除tags标签
				$reContent = htmlspecialchars_decode($value['reply_content']);	
				$showContent = strip_tags(htmlspecialchars_decode($value['reply_content']));
				$showContent = libBase::substr($showContent,260,260);

			    print_r("<a href='$url' target='_blank' class='message_reply_written' data-msgId='$value[id]' data-threadId='$value[thread_id]'>$showContent</a>");
                //图片正则
				$patternImg = '/(<img)(.*?)src=\"(.*?)\.(jpg|gif|png|bmp)\"(.*?)(\/>)/';
				//视频正则
			    $patternVideo = '/(<embed)(.*?)\.swf(.*?)(\/>)/';

				// 首先判断是否存在图片
				if(preg_match($patternImg, $reContent, $arr)) {
					//print_r("<a href='$url?page=$page&f=$floor_id&y=reply' target='_blank' class='message_reply_pic'>$arr[0]</a>");   // 输出图片地址
				}else {     //若果不存在图片,输出视频
				   if(preg_match($patternVideo, $reContent)) {  // 判断是否有视频
				//	echo "<a href='$url?page=$page&f=$floor_id&y=reply' target='_blank' class='message_reply_video'>视频评论</a>";
				   }else {     //基本来说就是没有内容了

				   }
				}	
			?>
			</p>
			<div class="reply_others clear">
				<div class="others_text">
					<span class="global_blue">{$content}</span>:
					<? if ($value['type'] == 'assist' && $value['post_id'] != 0) {
						 if(empty($value['content'])) {?>
							<a href="{$url}?page={$page}&f={$floor_id}" target="_blank">
						   		<? echo($value['message']);?>
							</a>
						<?} else {?>
							<a href="{$url}?page={$page}&f={$floor_id}" target="_blank">
							<?$showContent = strip_tags(htmlspecialchars_decode($value['content']));
							echo(libBase::substr($showContent,80,80));?>
							</a>
						<?}?>
					 <? } else {
						 if(empty($value['content'])) {?>
							<a href="{$url}" target="_blank">
						   		<? echo($value['message']);?>
							</a>
						<?} else {?>
							<a href="{$url}" target="_blank">
							<?$showContent = strip_tags(htmlspecialchars_decode($value['content']));
							echo(libBase::substr($showContent,80,80));?>
							</a>
						<?}}?>
					</a>
				</div>
			</div>

			<div class="right_tips">
			   <span class="send_reply">回复</span>
			</div>
	     </div>
	  </div>

	  <div class="message_reply clear" style="display:none">
		   <div class="user_pic"> 
				<?	if (empty($list['my_profile_image_url'])) {?>
					<img src="{_STATIC_HOST}images/plus/mb_pic50.gif" class="pic_size" alt="会员头像" />
				<?	} else {?>
					<img src="{echo ImagesQcloud::image_url($list['my_profile_image_url'],50,50)}" class="pic_size" alt="头像" />
				<? } ?>
		   </div>
		   <div class="message_publish">
			   <div class="message_input">
				   <div class="reply_content_input" contenteditable="true"></div>
			   </div>
			   <button class="global_btn big" data-userId="{$value['opera_user_id']}" data-replyId="{$value['post_id']}" data-threadId="{$value['thread_id']}" data-type="ANSWER">回复</button>
		   </div>
	   </div>
   </div>
</li>
<?  } 
}else { ?>
<li class="no_inform">暂时没有新通知</li>
<? } ?>
<li totalNum="{$list['total_number']}" style="display:none"></li>
