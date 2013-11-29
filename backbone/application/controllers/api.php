<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 只获取数据，不需要视图
 */
class Api extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// 模拟从服务器端获取一组数据
		$this->images = array(
			array('id'=>1, 'src'=>'images/aa.jpg','src_origin'=> 'images/aa_origin.jpg', 'intro'=> 'phoneA description' ),
			array('id'=> 2, 'src'=> 'images/bb.jpg', 'src_origin'=> 'images/bb_origin.jpg', 'intro'=> 'phoneB description' ),
			array('id'=> 3, 'src'=> 'images/cc.jpg', 'src_origin'=> 'images/cc_origin.jpg', 'intro'=> 'phoneC description' )
		);
		
	}

	public function index() {
		$this->load->view('api_list');

	}
	
	public function images() {
		echo json_encode($this->images);
	}

	public function view($id) {
		// 显示单个图片相关
		foreach ($this->images as $item) {
			if($item['id']== $id) {
				$view = $item;
				break;
			}
		}
		echo json_encode($view);
	}


}