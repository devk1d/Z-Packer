<div class="user_dialog">
	<div class="dialog_to">
		<div class="to_header clear">
			<div class="header_left">发私信给<a href="/personal/{$s}" target="_blank">{= $s != 397215 ? $info['name'] : '管理员'}</a></div>
			<a href="/message?type=inbox"  class="header_right">返回私信列表 &gt;</a>
		</div>
		<div class="dialog_text">
			<textarea class="dialog_box"></textarea>
		</div>
		<button class="send_dia_btn clear" data-id="{$info['id']}">
			发送
		</button>
	</div>

	<div id="dialog_show"></div>
	<div class="page_dialog page_center">

	</div>
</div>
