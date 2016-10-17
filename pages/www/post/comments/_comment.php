<? if(!$allow) {
	$login = "unlogin";
} else {
	$login = '';
}
	
	if(isset($list['comments'])) { ?>
		<!--{loop $list['comments'] $key $val}-->
		<li id="c_{$val['id']}" class="c_{$val['user_id']} clear">
			<div class="list_card pic usercard" card="{$val['users']['id']}">
				<!--{if empty($val['users']['profile_image_url'])}-->
				<img src="{_STATIC_HOST}images/mb_pic50.gif" alt="会员头像" />
				<!--{else}-->
				<img src="{echo ImagesQcloud::image_url($val['users']['profile_image_url'],50,50)}" alt="会员头像" />
				<!--{/if}-->
				<a href = "{_WWW_HOST}personal/{$val['user_id']}" class="user_idcard"  target="_blank" rel="nofollow">
					<span class="user_cover_icon"></span>
					<span class="user_cover"></span>
				</a>
			</div>
			<div class="list_wrap">
				<dl class="hot_text">
					<dt>
						<span class="mb_name">{echo LibBase::changeUserName($val['users']['username'], $val['users']['purview'])}</span>
						<span class="commentTime">&nbsp;{echo LibBase::changeDate($val['created_at'])}</span>
					</dt>
					<dd>{echo strip_tags($val['message'],'<blockquote><blockquote/><br><p></p><em><strong></em></strong>')}</dd>
					<dd class="cmt_info cmtInfo">
						
						<!--{if $competence == true || $user_id == $val['user_id']}-->
						<span class="info_del approDel delWrap">
							<span class="postIcons delComment commentIcons"></span>
							<a class="post_commDel" href="javascript:;" data-id="{$val['id']}">删除</a>
						</span>
						<!--{/if}-->

						<!--{if $val['approval'] == 1}-->
						<span class="appro liked" reply="{$val['id']}">
							<span class="info_appro_active">已赞</span>
							<span class="info_appro_active">({$val['like_total']})</span>
						</span>
						<!--{else}-->
						<span class="appro {$login}" reply="{$val['id']}">
							<span class="info_appro">点赞</span>
							<!--{if $val['like_total'] != 0}-->
							<span class="">({$val['like_total']})</span>
							<!--{else}-->
							<span></span>
							<!--{/if}-->
						</span>
						<!--{/if}-->

						<span class="reply {$login}" author="{$val['user_id']}" reply="{$val['id']}"><span class="postIcons replyIcon commentIcons"></span>回复</span>

						<!--{if $competence == true}-->
						<span class="approDel silentWrap">
							<span class="postIcons silent commentIcons"></span>
							<a class="post_commProhibit" href="javascript:;" data-id="{$val['id']}" data-uid="{$val['user_id']}">禁言</a>
						</span>
						<span class="approDel delSilentWrap">
							<span class="postIcons delSilent commentIcons"></span>
							<a class="post_commDelProhibit" href="javascript:;" data-id="{$val['id']}" data-uid="{$val['user_id']}">删评禁言</a>
						</span>
						<!--{/if}-->
					</dd>
				</dl>
			</div>
		</li>
		<!--{/loop}-->
<? } ?>
<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
