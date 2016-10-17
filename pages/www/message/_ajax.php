<? 
	$status = STATUS_200;
	$html = '操作失败';
	//$total_number = $arr['list']['total_number'];
	//$binding = $arr['binding'];
	switch($arr['type']) { 
		case "discuss": 
			$html = $this->getTemplate('_discuss', array(), 'page');
			break;
		case "appro": 
			$html = $this->getTemplate('_appro', array(), 'page');
			break;
		case "inbox": 
			$html = $this->getTemplate('_inbox', array(), 'page');
			break;
		case "dialog": 
			$html = $this->getTemplate('_dialog', $arr, 'page');
			break;
		case "collect": 
			$html = $this->getTemplate('_collect', array(), 'page');
			break;
		case "vote": 
			$html = $this->getTemplate('_vote', array(), 'page');
			break;
		case "answer": 
			$html = $this->getTemplate('_answer', array(), 'page');
			break;
	}
	$this->ajaxJson($status, array('html' => $html));
?>
	
