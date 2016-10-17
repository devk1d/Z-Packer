<?
$user_id = $this->user['id'];
$addr = LibBase::searchProvince($headerList['provice'], $headerList['city']);
?>
<div class="per_header_main clear">
	<div class="header_pic clear">
		<div class="user_logo_grade global_user big clear">
			<?if(empty($headerList['profile_image_url'])) {?>
			<img src="{_STATIC_HOST}images/plus/mb_pic50.gif" class="pic_size" alt="会员头像" />
			<?} else {?>
			<img src="{echo ImagesQcloud::image_url($headerList['profile_image_url'],80,80)}" alt="头像" />
			<?}?>
			<span class="global_user_level level_{$headerList['level_type']}_{$headerList['level']}"></span>	
		</div>	
		<div class="header_set">
			<?if($isSelf) {?>		
				<a href="/user?pagetype=setbasic">设置</a>
			<?} else {?>
				<a href="/message?type=dialog&s={$user_id}&a={$headerList['id']}">私信</a>
			<?}?>
		</div>
		<div class="header_score_wrap">
			<div class="score_arrow">
			</div>
			<div class="user_score">
				<span>{$headerList['score']}</span>&nbsp;/
				<span>{$headerList['nextscore']}</span>	
			</div>
		</div>
	</div>
	<div class="header_center">
		<div class="user_name clear">
			<div class="name_wrap">{$headerList['nickname']}</div>
			<span class="user_award">
			<?if(!empty($headerList['award'])) {
				foreach($headerList['award'] as $key => $value1) {
				if($key > 7) {
					break;
				}
			?>
				<div class="award_wrap clear">
					<img src="{echo ImagesQcloud::image_url($value1['cover'],40,40)}" alt="头像" />
					<span class="award_name">{$value1['name']}</span>
					<span class="award_logo"></span>
				</div>	
			<?}}?>
			</span>	
		</div>
		<div class="user_des">
			<?if(!empty($headerList['description'])) {?>	
			{$headerList['description']}
			<?} else {?>
			我爱ZEALER千万遍，却没时间改简介！	
			<?}?>
		</div>
		<div class="user_info">
			<span class="user_sex personal_logo">
				<? 
				echo ($headerList['gender'] == 'FEMALE') ? '女' : '男' ;
					if($headerList['birthday'] <= 0) {
						$old = 0;	
					} else {
						$now_year = date("Y");	
						$bir_year = date("Y", $headerList['birthday']);
						
						$now_month = (int)(date("m"));
						$bir_month = (int)(date("m", $headerList['birthday']));
						
						if($now_month < $bir_month) {	
							$now_year -= 1;	
						}
						$old = $now_year - $bir_year;	
						echo '&nbsp;'.$old.' 岁';	
					}	
				?>
			</span>	
			<span class="personal_logo user_address">
				<?if(!isset($addr['provice']) && !isset($addr['city'])) {
					echo '火星';
				} else { 
					if(!empty($addr['provice'])) {
						echo $addr['provice'].'-';
					}
					if(!empty($addr['city'])) {
						echo $addr['city'];
					}
				}?>
			</span>
			<s class="global_grey_icons grey_time"></s>
			<?
				$now = time();
				$created = $headerList['created_at'];
				$diff= $now - $created;
				$days= ceil($diff/3600/24) ;  

				//
				$c_hour_diff = date('H', $created);
				$n_hour_diff = date('H', $now);

				$c_min_diff = date('i', $created);
				$n_min_diff = date('i', $now);
				if($c_hour_diff > $n_hour_diff) {  // 判断时间
					$days++;
				}else if($c_hour_diff == $n_hour_diff  && $c_min_diff > $n_min_diff) {
					$days++;
				}
				 
			?>	
			<span class="user_zealer_old">
				<? if($days <= 1) {
					echo '今天刚加入ZEALER';
				} else {
					echo '加入 ZEALER '.$days.' 天';	
				}?>
			</span>
		</div>
	</div>
	<?
		if($user_id == $headerList['id']) {
			$userid = '';	
		} else {
			$userid = $headerList['id'];	
		}
	?>	
	<div class="user_number">
		<a href="/personal/reply/{$userid}" class="reply_number">
			<div class="reply_logo personal_logo">
					
			</div>
			<div class="reply_text">回复</div>
			<div class="reply_num">{$headerList['thread_comment_total']}</div>
		</a>
		
		<a href="/personal/post/{$userid}" class="post_number">
			<div class="post_logo personal_logo">
					
			</div>
			<div class="post_text">发帖</div>
			<div class="post_num">{$headerList['thread_total']}</div>
		</a>
	</div>
</div>
<!--{scriptPool}-->
<script>
	Z.use('personal/personalHeader');
</script>
<!--{/scriptPool}-->

