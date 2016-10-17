<div class="left_logo">
</div>
<div class="user_pic">
<? 
//var_dump($this);die;
?>
	<a href="javascript:;" rel="nofollow" target="_blank">
		<!--{if empty($this->user['profile_image_url'])}-->
		<img src="{_STATIC_HOST}images/plus/mb_pic50.gif" class="pic_size" alt="会员头像" />
		<!--{else}-->
		<img src="{echo ImagesQcloud::image_url($this->user['profile_image_url'], 80, 80)}" />
		<!--{/if}-->
	</a>
	<a href="javascript:;" class="user_cover">更换头像</a>
</div>
<div style="display:none" class="repic_mask">
	<div class="mask_bg">
		<div class="mask_content mask_repic">
			<div class="pop_close pop_image"></div>
			<div class="wrap2" style="display: none;">
			<div class="uWrap">
					<div class="change">
						<form class="form1">
							<input type="button" value="选择" class="choose" id="fileupload"/>
						</form>
					</div>
					<div style="height: 2px; width: 0px; background: #006ea3;" class="user_progressbar"></div>
					<div class='img_wrap' style="height: 0px; overflow: hidden;">
						<div id="picImg" class="clear" style="margin:20px;"></div>
						<form class="form2">
							<div class="saveOrCancel">
							<input type="hidden" value="0" name="pid" />
							<input type="button" value="保存" id="repic_send" class="send" />
							<input type="button" value="取消" id="repic_cancle" class="cancle"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<dl class="left_list">
	<dd>
		<a href="/user?pagetype=setbasic" otype="setbasic"><span class="left"> </span>基本设置<span class="right"> </span></a>
		<a href="/user?pagetype=setmail" otype="setmail" ><span class="left"> </span>手机和邮箱<span class="right"> </span></a>
		<a href="/user?pagetype=setpsd" otype="setpsd"><span class="left"> </span>修改密码<span class="right"> </span></a>
		<a href="/user?pagetype=setaccount" otype="setaccount"><span class="left"> </span>第三方账号<span class="right"> </span></a>
	</dd>
</dl>
<!--{scriptPool}-->
<script>
Z.use('sidebar/sidebar', {
	'YII_CSRF_TOKEN': '{=Yii::app()->getRequest()->getCsrfToken()}'
});
</script>
<!--{/scriptPool}-->
