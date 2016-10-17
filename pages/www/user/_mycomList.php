<input type="text" id="mycom_total" style="display:none;" value="{$list['total_number']}" />

<?php foreach($list['list'] as $key=>$value) { 
	$name = $value['user_id'] == $author_id ? '我' : $value['user_name']; 
	$source_name = $value['source_user_id'] == $author_id ? '我' : $value['source_user_name'];
	$active_class = '';
	if( $name == '我' || $value['source_user_id'] == 0 ){
		$active_class = 'active_class'; 
	}
?>
	<div class="user_comment_inner {$active_class}"> 
		<div class="msg_text">
			<div class="msg_left">
				<!--{if empty($this->user['profile_image_url'])}-->
				<img src="{_STATIC_HOST}images/mb_pic50.gif" alt="头像" />
				<!--{else}-->
				<img src="{echo ImagesQcloud::image_url($this->user['profile_image_url'],25,25)}" width="25" height="25" alt="头像" />
				<!--{/if}-->
			</div>
			<div class="msg_right">
				<span class="right_name">

					{eval $full = htmlspecialchars_decode($value['title']); $full = preg_replace('/<blockquote>(.)+<\/blockquote>/u', '', $full); $str_short = strip_tags($full, '<a>'); $short = LibBase::substr($str_short,64,62);}
					<!--{if $value['source_user_id'] == 0}-->
					我评论了&nbsp;<a href="/post/{$value['post_id']}" target="_blank">{$short}</a>	
					<!--{else}-->
					<!--{eval $name = $value['user_id'] == $author_id ? '我' : $value['user_name']; $source_name = $value['source_user_id'] == $author_id ? '我' : $value['source_user_name'];}-->
					{$name} 在 <a href="/post/{$value['post_id']}" target="_blank">{$short}</a> 中引用了{$source_name} 的评论
					<!--{/if}-->
				</span>
				<span class="right_content">
					{eval $full = htmlspecialchars_decode($value['message']); $full = preg_replace('/<blockquote>(.)+<\/blockquote>/u', '', $full); $str_short = strip_tags($full, '<a>'); $short = LibBase::substr($str_short,74,72);}
					{$short}
				</span>
				<span class="right_time">
					{echo LibBase::changeDate($value['created_at'])}
				</span>
			</div>
		</div>
	</div>
<?php } ?>
