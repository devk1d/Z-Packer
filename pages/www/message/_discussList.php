<? //处理帖子详情页面跳转链接
$url = '';
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
			};
			break;
	};

	return $postUrl;
};
if( !empty($list['list']) && $list['total_number'] > 0 ){
foreach($list['list'] as $key=>$value) { 
	// 判断评论是否未读，该功能暂时唔需要。若后期需加上，则在.inner_left加$css,和 <i class="un_read_icon"></i>
	//$css = $value['status'] == 'N' ?"un_read":"";

	//var_dump($list['list']);
	switch ($value['site']) {
		case 'WWW':
			$url = WWW_HOST.'post/'.$value['thread_id'].'.html';
			$count =20;
			break;
		case 'PLUS':
			$post = getPostUrl($value['ptype'], $value['is_theme'], $value['thread_id']);
			$url = PLUS_HOST.$post;
			$count =30;
			break;
		case 'ASK':
			$url = ASK_HOST.'question/'.$value['thread_id'].'.html';
			$count =20;
			break;
	}	

	$floor_id = $value['floor_id'];
	if ($value['type'] == 'reply') {
		$floor_id = $value['floor_id'];
	}
	$page = ceil($value['floor_id']/$count) < 1 ? 1 : ceil($value['floor_id']/$count);
	// 判断评论类型 
		$ctxt= '';
		$ctxt2= '';

		if ($value['site'] == 'PLUS'){
			if(empty($value['content'])) {  //社区下的评论
				$ctxt = '评论了 我的文章：';
				$ctxt2 = $value['title'];  //应该是是标题
			}else {    //评论下的回复
				$ctxt = '回复了 我的评论：';
				$ctxt2 = $value['content'];  //应该是是标题
			}
			$url = $url.'?page='.$page.'&f='.$floor_id;
		}
		if ($value['site'] == 'ASK'){
		  //对回答的评论
			$ctxt = '评论了 我的回答：';
		  //评论下的回复
			$ctxt2 = empty($value['source_content']) ? $value['content'] : $value['source_content'];  //内容
			$url = $url.'?page='.$page;
		}
		if ($value['site'] == 'WWW') {
			$ctxt = '回复了 我的视频评论：';
			$ctxt2 = $value['content']; 
			$url = $url.'?page='.$page.'&f='.$floor_id;
		}

?>
<li>
<div class="message_cardWrap">
	<div class="post_reply clear">
		<div class="inner_left">
			<a href="/personal/{$value['opera_user_id']}" target="_blank" rel="nofollow">		
				<?	if (empty($value['profile_image_url'])) {?>
					<img src="{_STATIC_HOST}images/plus/mb_pic40.gif" class="pic_size" alt="会员头像" />
				<?	} else {?>
					<img src="{echo ImagesQcloud::image_url($value['profile_image_url'],40,40)}" class="pic_size" alt="头像" />
				<? } ?>
				<span class="global_user_level level_yellow_1"></span>
			</a>
		</div>
		<div class="inner_right">
			<a rel="nofollow" href="/personal/{$value['opera_user_id']}" class="user_name" target="_blank">{$value['nickname']}</a>
			<span class="inner_right_time">
				<s class="global_grey_icons grey_time"></s>
				<em class="global_icons_gap"><? echo LibBase::changeDate($value['created_at'])?></em> 
			</span>

			<p class="reply_content" data-id ={$value['id']}>
			<?  
				$ccontent = $value['reply_content'];
				//此处进行回复内容输出
				//没有去除tags标签

				//视频正则
				$patternVideo = '/(<embed)(.*?)\.swf(.*?)(\/>)/';

				if(preg_match($patternVideo, $ccontent)) {  // 判断是否有视频
					$showContent = '视频';
				}else {
					$showContent = libBase::substr(strip_tags(htmlspecialchars_decode($ccontent)), 260,257);
				}

			    print_r("<a href='$url' target='_blank' class='message_reply_written' data-msgId='$value[id]' data-threadId='$value[thread_id]' >$showContent</a>");

				$images = LibBase::getContentImages($ccontent, 122, 80);
				foreach($images as $key => $value1) {
					if($key > 3) {
						break;
					}
				?>
				<a href="{$url}" target="_blank"> <img src = "{$value1}" class="tag_pic" alt=""></a>
				<? }
			?>
			</p>
			<div class="reply_others clear">
				<div class="others_text">
					<span class="global_blue">{$ctxt}</span>
					<a href="{$url}" target="_blank">
					<?$showContent = strip_tags(htmlspecialchars_decode($ctxt2));
					echo(libBase::substr($showContent,80,80));?>
					</a>
				</div>
			</div>

			<div class="right_tips">
			<? if($value['site'] == 'ASK') { ?>
			   <a href="{$url}" class="check_reply" target="_blank">查看</a>
			<? }else { ?>
			   <span class="send_reply">回复</span>
			  <? } ?>
			</div>
	     </div>
	  </div>

	  <div class="message_reply clear" style="display:none">
		   <div class="user_pic"> 
				<?	if (empty($list['my_profile_image_url'])) {?>
					<img src="{_STATIC_HOST}images/plus/mb_pic40.gif" class="pic_size" alt="会员头像" />
				<?	} else {?>
					<img src="{echo ImagesQcloud::image_url($list['my_profile_image_url'],40,40)}" class="pic_size" alt="头像" />
				<? } ?>
		   </div>
		   <div class="message_publish">
			   <div class="message_input">
				   <div class="reply_content_input" contenteditable="true"></div>
			   </div>
			   <button class="global_btn big" data-ptype= "{= $value['ptype'] == 'video'? 'video': ''}"data-userId="{$value['opera_user_id']}" data-replyId="{= $value['ptype'] == 'video' ? $value['thread_id'] :$value['post_id']}" data-threadId="{$value['thread_id']}" data-type="REPLY" data-user="{= $value['nickname']}" data-content="{= LibString:: substr(htmlentities(strip_tags($value['message'])), 0, 180, 'dot')}">回复 </button>
		   </div>
	   </div>
   </div>
</li>
<?  } 
}else { ?>
<li class="no_inform">暂时没有新通知</li>
<? } ?>
<li class="totalnum"  totalNum="{$list['total_number']}" style="display:none"></li>
