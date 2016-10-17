	
<?php 
//var_dump($list);die;
$totalNum = $list['total_number'];
foreach($list['messages'] as $key=>$value) { 
	$css = $value['reading_date'] ==  '0' ?"un_read":"";
	if($value['recipient_id']==0 ){
		$url =  'javascript:;';
	}else {
		$url = '/personal/'.$value['is_group'];
	}
?>
<div class="msg_text" totalNum="{$totalNum}">
	<span class="msg_inner {$css} clear ">
		<i class="un_read_icon"></i>
		<a class="msg_left" href="{$url}" target="blank">
			<!--{if empty($value['recipient']['profile_image_url'])}-->
			<img src="{_STATIC_HOST}images/mb_pic50.gif" class="pic_radius" alt="会员头像" />
			<!--{else}-->
			<img src="{echo ImagesQcloud::image_url($value['recipient']['profile_image_url'],50,50)}" class="pic_radius" alt="头像" />
			<!--{/if}-->
			<span class="global_user_level level_yellow_1"></span>
		</a>
		<span class="msg_right">
			<span class="right_name">
				<a href="{$url}" target="_blank" >{$value['recipient']['username']} </a>
				<span>
					<em>|</em>{echo LibBase::changeDate($value['created_at'])}
				</span>	
			</span>
			<a target="_blank" href="/message?type=dialog&s={$value['sender_id']}&a={$value['recipient_id']}<!--{if !empty($f)}-->&f={$f}<!--{/if}-->" sid="{$value['sender_id']}" rid="{$value['recipient_id']}" class="right_content clear">
			
			<?	
				$images = LibBase::getContentImages($value['message'], 120, 80);
				foreach($images as $key => $value1) {
					if($key > 0) {
						break;
					}
			?>
			 <img src = "{$value1}" class="tag_pic" alt="zealer" >
			<? } ?>
			
				{echo LibBase::substr(strip_tags($value['message']),160,163)}
			
			</a>
			<span class="right_remove" data-id="{$value['id']}" data-sid="{$value['sender_id']}" data-rid="{$value['recipient_id']}"></span>
		</span>
	</span>
</div>
<? } ?>
