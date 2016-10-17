{setLayout "www"}

<!--{startBlock "content"}-->
<div id="main">
	<div class="main_content clear">
		<div class="content_left">
			{widget "sidebar", array()}
		</div>
		<div class="content_right">
		<? 
			switch($type) { 
				case "about": 
					$html = $this->getTemplate('_about', array(), 'page');
					break;
				case "contect": 
					$html = $this->getTemplate('_contect', array(), 'page');
					break;
				case "join": 
					$html = $this->getTemplate('_join', array('list' => $list), 'page');
					break;
				case "item": 
					$html = $this->getTemplate('_item', array(), 'page');
					break;
			}
			echo $html;
		?>

		</div>
	</div>
</div>
<!--{endBlock}-->

{widget "page"}
