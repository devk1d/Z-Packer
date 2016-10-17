<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Mon 13 Jun 2016 03:44:24 PM CST
*/
?>
<ul>
	<?foreach($list['list'] as $key => $val) {?>
	<li class="user_listItem clear">
		<a href="/personal/{$val['id']}">
			<div class="user_img">
				<?if($val['profile_image_url'] == '') {?>
				<img src="{_STATIC_HOST}images/mb_pic50.gif" alt="会员头像" />
				<?} else {?>
				<img src="{=ImagesQcloud::image_url($val['profile_image_url'], 0, 0)}" />
				<?}?>
			</div>
			<div class="user_info">
				<div>{$val['nickname']}</div>
				<div>{$val['description']}</div>
			</div>
			<ul class="user_dataList clear">
				<li>
					<div class="datalist_title">发帖</div>
					<div class="datalist_val">{$val['thread_total']}</div>
				</li>
				<li>
					<div class="datalist_title">回帖</div>
					<div class="datalist_val">{$val['thread_comment_total']}</div>
				</li>
				<li>
					<div class="datalist_title">提问</div>
					<div class="datalist_val">{$val['question_total']}</div>
				</li>
				<li class="datalist_last">
					<div class="datalist_title">回答</div>
					<div class="datalist_val">{$val['answer_total']}</div>
				</li>
			</ul>
		</a>
	</li>
	<?}?>
<ul>

