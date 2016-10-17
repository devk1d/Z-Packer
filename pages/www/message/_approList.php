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
	//$css = $value['status'] == 'N' ?"un_read":"";

	switch ($value['site']) {
		case 'WWW':
			$url = WWW_HOST.'post/'.$value['thread_id'].'.html';
			$count = 20;
			break;
		case 'PLUS':
			$post = getPostUrl($value['ptype'], $value['is_theme'], $value['thread_id']);
			$url = PLUS_HOST.$post;
			$count = 30;
			break;
		case 'ASK':
			$url = ASK_HOST.'question/'.$value['thread_id'].'.html';
			$count = 20;
			break;
	}	

	$floor_id = $value['floor_id'];
	$page = ceil($value['floor_id']/$count) < 1 ? 1 : ceil($value['floor_id']/$count);  //区分第几页
	$thread_id = $value['thread_id'];

	//判断文案
	if($value['site'] == 'WWW') {  //官网评论点赞
		$content = '赞了 我的视频评论';
		$url = $url.'?page='.$page;
	}

	if($value['site'] == 'PLUS') {  //社区点赞
		if($value['post_id'] == 0) {
			$content = '赞了 我的文章';   //文章
		}else {
			$content = '赞了 我的评论';   //评论
		}
		$url = $url.'?page='.$page;
	}

	if($value['site'] == 'ASK') {  //问答点赞
		if($value['is_theme'] == 'Y') {
			$content = '赞了 我的回答';   //回答
		}else {
			$content = '赞了 我的评论';   //评论
		}
		$url = $url.'?page='.$page;
	}
?>
<div class="message_cardWrap">
	<div class="post_reply clear">
		<div class="inner_left">
			<a href="/personal/{$value['opera_user_id']}" target="_blank" rel="nofollow">		
				<?	if (empty($value['profile_image_url'])) {?>
					<img src="{_STATIC_HOST}images/plus/mb_pic50.gif" class="pic_size" alt="会员头像" />
				<?	} else {?>
					<img src="{echo ImagesQcloud::image_url($value['profile_image_url'],50,50)}" class="pic_size" alt="头像" />
				<? } ?>
			</a>
		</div>
		<div class="inner_right">
			<a rel="nofollow" href="/personal/{$value['opera_user_id']}" class="user_name" target="_blank">{$value['username']}</a>
			<span class="inner_right_time">
				<s class="global_grey_icons grey_time"></s>
				<em class="global_icons_gap"><? echo LibBase::changeDate($value['created_at'])?></em> 
			</span>
			<div class="reply_others clear">
				<div class="others_text">
					<span class="global_blue">{$content}:</span>
					<a href="{$url}" target="_blank">
						<? //视频正则
						$patternVideo = '/(<embed)(.*?)\.swf(.*?)(\/>)/';

						if(preg_match($patternVideo, $value['message'])) {  // 判断是否有视频
							echo '视频';
						}else {
							echo LibBase::substr(strip_tags(htmlspecialchars_decode($value['message'])),160,157);
						}
					?>
					</a>
					<div>
						<?
						$images = LibBase::getContentImages($value['message'], 122, 80);
						foreach($images as $key => $value1) {
							if($key > 3) {
								break;
							}
						?>
						<a href="{$url}" target="_blank"> <img src = "{$value1}" class="tag_pic" alt=""></a>
						<? } ?>
					</div>
				</div>
			</div>

			<div class="right_tips">
			   <a href={$url} class="send_reply" target="_blank">查看</a>
			</div>
	     </div>
	  </div>
   </div>
<?  } 
}else { ?>
<li class="no_inform">暂时没有新通知</li>
<? } ?>
<li totalNum="{$list['total_number']}" style="display:none"></li>
