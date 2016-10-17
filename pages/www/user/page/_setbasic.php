<?php
if(empty($this->user['birthday'])) {
	$year = '请选择';
	$month = '请选择';
	$days = '请选择';
} else {
	$year = date('Y', $this->user['birthday']).'年';
	$month = date('m', $this->user['birthday']).'月';
	$days = date('d', $this->user['birthday']).'日';
}
$this->user['provice_name'] = empty($this->user['provice'])?"省份":$this->user['provice_name'];
$this->user['city_name'] = empty($this->user['city'])?"城市/地区":$this->user['city_name'];
//var_dump($this->user['provice_name']);die;
?>

<h2>
	基本信息
	<a class="" href="{=WWW_HOST}personal">返回个人中心 &gt;</a>	
</h2>
<table class="user_basic">
	<tr>
		<td> 昵称 </td>
		<td> <input name="nickname" maxlength="20" class="input_nickname" value="{$this->user['nickname']}" /> </td>
	</tr>
	<tr>
		<td width="60px"> 性别 </td>
		<td> 
			<label class="radio inline"><input type="radio" value="m" name="gender" <!--{if $this->user['gender'] == GENDER_MALE}-->checked<!--{/if}-->/> &nbsp;男</label>&nbsp;&nbsp;
			<label class="radio inline"><input type="radio" value="f" name="gender" <!--{if $this->user['gender'] == GENDER_FEMALE}-->checked<!--{/if}-->/> &nbsp;女</label>
		</td>
	</tr>
	<tr>
		<td> 简介 </td>
		<td> <input name="description" class="input1" value="{$this->user['description']}" /> </td>
	</tr>
	<tr>
		<td> 居住地 </td>
		<td> 
			<div class="global_address global_select">
				<dl>
					<dd class="selMain fItem1">
						<div class="addrClick">
							<p class="provice" rel="{$this->user['provice']}">{$this->user['provice_name']}</p>
							<a href="javascript:;" class="btn"></a>
						</div>
						<ul class="srhList" style="display: none;">
							<li rel="11" >北京</li>
							<li rel="12" >天津</li>
							<li rel="13" >河北</li>
							<li rel="14" >山西</li>
							<li rel="15" >内蒙古</li>
							<li rel="21" >辽宁</li>
							<li rel="22" >吉林</li>
							<li rel="23" >黑龙江</li>
							<li rel="31" >上海</li>
							<li rel="32" >江苏</li>
							<li rel="33" >浙江</li>
							<li rel="34" >安徽</li>
							<li rel="35" >福建</li>
							<li rel="36" >江西</li>
							<li rel="37" >山东</li>
							<li rel="41" >河南</li>
							<li rel="42" >湖北</li>
							<li rel="43" >湖南</li>
							<li rel="44" >广东</li>
							<li rel="45" >广西</li>
							<li rel="46" >海南</li>
							<li rel="50" >重庆</li>
							<li rel="51" >四川</li>
							<li rel="52" >贵州</li>
							<li rel="53" >云南</li>
							<li rel="54" >西藏</li>
							<li rel="61" >陕西</li>
							<li rel="62" >甘肃</li>
							<li rel="63" >青海</li>
							<li rel="64" >宁夏</li>
							<li rel="65" >新疆</li>
							<li rel="71" >台湾</li>
							<li rel="81" >香港</li>
							<li rel="82" >澳门</li>
							<li rel="100" >其他</li>
							<li rel="400" >海外</li>
						</ul>
					</dd>
					<dd class="selMain fItem2">
						<div class="addrClick">
							<p class="city" rel="{$this->user['city']}">{$this->user['city_name']}</p>
							<a href="javascript:;" class="btn"></a>
						</div>
						<ul class="srhList" style="display: none;" id="city">
						</ul>
					</dd>
				</dl>
			</div>
		</td>
	</tr>
	<tr>
		<td> 生日 </td>
		<td>
			<div class="global_date global_select">
				<dl>
					<dd class="selMain fItem1 yearItem">
						<div class="addrClick">
							<p class="year">{$year}</p>
							<a href="javascript:;" class="btn yearbtn"></a>
						</div>
						<ul class="srhList" style="display: none;">
						<?php
							$year = date('Y')-1;
							for($year; $year>=1900; $year--) { 
					    ?>
							<li>{$year}年</li>
						<?php } ?>
						</ul>
					</dd>
					<dd class="selMain fItem2 monthItem" style="width: 87px;">
						<div class="addrClick">
							<p class="month">{$month}</p>
							<a href="javascript:;" class="btn"></a>
						</div>
						<ul class="srhList" style="display: none;">
							<?
								for($m=1; $m<=12; $m++) {
							?>
								<li>{$m}月</li>
							<? } ?>
						</ul>
					</dd>
					<dd class="selMain fItem3 dayItem" style="width: 87px;">
						<div class="addrClick">
							<p class="day">{$days}</p>
							<a href="javascript:;" class="btn"></a>
						</div>
						<ul class="srhList" style="display: none;">
							<?
								for($d=1; $d<=31; $d++) {
							?>
								<li>{$d}日</li>
							<? } ?>

						</ul>
					</dd>
				</dl>
			</div>

		</td>
	</tr>
</table>
<input type="hidden" value="<?php echo Yii::app()->getRequest()->getCsrfToken(); ?>" name="YII_CSRF_TOKEN"/>
<div class="save_btn">保存</div>
