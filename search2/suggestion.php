<?php
	// 建议获取
	$suggestions  = array(
		'张三丰',
		'张无忌',
		'张三',
		'郑微',
		'林静',
		'阮莞',
		'陈孝正',
		'张开',
		'许开阳'
	);
	// 相关联的关键字
	$possible_keys = array();
	// 搜索关键字
	if (isset($_GET['s'])) {
		$search = strtolower($_GET['s']);
		if (!empty($search)) {
			foreach ($suggestions as $suggestion) {
				// 匹配以搜索文本开头的关键字
				if (strpos($suggestion, $search) === 0) {
					$possible_keys[] = $suggestion;
				}
			}
		}
	}
	// 以json格式传递数据
	echo json_encode($possible_keys);