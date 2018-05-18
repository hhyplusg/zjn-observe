<?php
header("Content-Type:text/plain;charset=utf-8");
// require_once('..\Lib\PHPExcel-1.8\Classes\PHPExcel\Writer\Excel2007.php'); 
 // ini_set('date.timezone','Asia/Beijing'); 
 date_default_timezone_set('PRC');

//定义库操作类型：读取、删除等
$action=$_GET['action'];

switch($action){
	case 'initialize_db':initialize_db();break;
	case 'delete_db':delete_db();break;	
	case 'addRow_db':addRow_db();break;
	case 'updateRow_db':updateRow_db();break;
	case 'Search_db':Search_db();break;
	case 'SearchReworkOngoing_db':SearchReworkOngoing_db();break;
	case 'ChangeToRework_db':ChangeToRework_db();break;
	case 'ReworkFinish_db':ReworkFinish_db();break;
	case 'CaculateStateQuantity_db':CaculateStateQuantity_db();break;
	case 'SearchByPost_db':SearchByPost_db();break;
	case 'SearchByPosition_db':SearchByPosition_db();break;
	case 'UploadPicture_db':UploadPicture_db();break;
	case 'SearchUploadedPicture_db':SearchUploadedPicture_db();break;
	case 'UploadQualityCheckResult_db':UploadQualityCheckResult_db();break;
	case 'addReworkTime_db':addReworkTime_db();break;
	case 'searchReworkTime_db':searchReworkTime_db();break;
	case 'dailyReworkEngine_db':dailyReworkEngine_db();break;
	case 'reworkContent_db':reworkContent_db();break;
	case 'occupyStation_db':occupyStation_db();break;
	case 'reworkRecordSearch_db':reworkRecordSearch_db();break;
		
}
 
function initialize_db(){
	  
	  $sql="select * from enginedatabase where STATE = '待返修'";
	  $data=getResult($sql);
	  echo json_encode($data,true);	
	}
function delete_db(){
	echo "开始执行删除函数----";
	$deleteline=$_POST["deleteID"];
	$sql="delete from enginedatabase where ID='".$deleteline."'";
	$data=getResult($sql);
	echo "ok";
	}
function addRow_db(){
	  $sql='insert into enginedatabase (`NUM`, `CT TIME`,`TYPE`,`ID` ,`ORDERNUM` ,`PROBLEM`,`POSITION`,`ISPRIORITY`,`SOURCE`,`SHIFT`,`STATE`) values (';
	  var_dump($_POST);
	  $sql.='\''.$_POST['NUM'].'\',';
	  $sql.='\''.$_POST['CT_TIME'].'\',';
	  $sql.='\''.$_POST['TYPE'].'\',';
	  $sql.='\''.$_POST['ID'].'\',';
	  $sql.='\''.$_POST['ORDERNUM'].'\',';
	  $sql.='\''.$_POST['PROBLEM'].'\',';
	  $sql.='\''.$_POST['POSITION'].'\',';
	  $sql.='\''.$_POST['ISPRIORITY'].'\',';
	  $sql.='\''.$_POST['SOURCE'].'\',';
	  $sql.='\''.$_POST['SHIFT'].'\',';
	  $sql.='\''.$_POST['STATE'].'\',';
	  	  
//	  for($i=1;$i<6;$i++){		  
//		  $sql.='\''.$_POST['NUM'].'\',';		  
//	  }
	  $sql=trim($sql,",");
	  $sql.=")";
	  // echo  $sql;
	  $data=getResult($sql);
	  // echo  $data;
	  echo json_encode($data,true);
//	var_dump($_POST);  原样返回原先的数值
	 }
	
//数据库连接与读取
function getResult($sql){
		$conn=mysql_connect("127.0.0.1","root","");
		//设置数据的字符集utf-8,解决中文乱码问题
		mysql_query("set names 'utf8' ");
		mysql_query("set character_set_client=utf8");
		mysql_query("set character_set_results=utf8");
		
		mysql_select_db("gh",$conn)or die(mysql_error);
		$resource=mysql_query($sql,$conn);
		$res=array();
		while(($row=mysql_fetch_assoc($resource))!=false){
			// var_dump($resource);
			// var_dump($row);			
			$res[]=$row;
		}
	return $res;
	
	}
	//query_sql函数的效果等同于getResult
function query_sql(){
	$mysqli=new mysqli("127.0.0.1","root","","gh");
	$sqls=func_get_args();
	foreach($sqls as $s){
		$query=$mysqli->query($s);
	}
	$mysqli->close();
	return $query;
	}
function Search_db(){
	$EngineID=$_POST["EngineID"];
	// echo('$EngineID的值为：'+$EngineID);
	$sql="select * from enginedatabase where ID='".$EngineID."'";
	$data=getResult($sql);
	echo json_encode($data,true);
}
function SearchByPosition_db(){
	$EnginePosition=$_POST["EnginePosition"];
	// echo('$EnginePosition'+$EnginePosition);
	$sql="select * from enginedatabase where POSITION=".$EnginePosition;
	$data=getResult($sql);
	echo json_encode($data,true);
}
function SearchReworkOngoing_db()
{
	$sql="select * from enginedatabase where STATE = '返修中'";
	$data=getResult($sql);
	echo json_encode($data,true);
}


function ChangeToRework_db()
{
	$Reworkline=$_POST["ReworkID"];
	$ReworkPosition=$_POST["ReworkPosition"];
	$ReworkTime=$_POST["ReworkTime"];
	// echo('数据库读取的$ReworkPosition：'.$ReworkPosition);
	$sql="update enginedatabase set STATE='返修中', POSITION=".$ReworkPosition.", REWORKTIME=concat(REWORKTIME,'".$ReworkTime."') where ID= '".$Reworkline."'";
	echo($sql);
	$data=getResult($sql);
	echo($data);
}

function ReworkFinish_db(){
	$Reworkline=$_POST["ReworkFinishID"];
	$ReworkTime=$_POST["ReworkTime"];
	$ReworkTotalTime=$_POST["totalTime"];
	$sql="update enginedatabase set STATE='已放行', POSITION=0 , REWORKTIME=concat(REWORKTIME,'".$ReworkTime."'), TOTALTIME=TOTALTIME+".$ReworkTotalTime." where ID='".$Reworkline."'";
	// echo($sql);
	$data=getResult($sql);
}

function CaculateStateQuantity_db(){
	  
	 $arr = array('WaitReworkQuantity' =>0 ,'OnReworkQuantity' =>0 ,'WaitCTQuantity' =>0 ,'WaitHTQuantity' =>0 , );

	 $sql="select * from enginedatabase where STATE = '待返修'";
	 $data=getResult($sql);
	 $arr['WaitReworkQuantity']=count($data);
	
	$sql="select * from enginedatabase where STATE = '返修中'";
	$data=getResult($sql);
	$arr['OnReworkQuantity']=count($data);

	$sql="select * from enginedatabase where STATE = '待冷试'";
	$data=getResult($sql);
	$arr['WaitCTQuantity']=count($data);

	$sql="select * from enginedatabase where STATE = '待热试'";
	$data=getResult($sql);
	$arr['WaitHTQuantity']=count($data);

	echo json_encode($arr,true);	

}

function updateRow_db(){
	$Reworkline=$_POST["editNUM"];
	// $Reworkline1=$_POST["NUM"];	
	$Reworkline1=$_POST["STATE"];
	$Reworkline2=$_POST["CT_TIME"];	
	$Reworkline3=$_POST["TYPE"];	
	$Reworkline4=$_POST["ID"];	
	$Reworkline5=$_POST["PROBLEM"];  //该值为字符串，注意下面添加时要加单引号
	$Reworkline6=$_POST["POSITION"];	

	$sql="update enginedatabase set `CT TIME`='".$Reworkline2."', TYPE=".$Reworkline3.
	", ID='".$Reworkline4."', PROBLEM='".$Reworkline5."', POSITION=".$Reworkline6.", STATE='".$Reworkline1."' where ID= '".$Reworkline."'";	
	
	// unset($_POST["editNUM"]);
	//   $sql='update enginedatabase set (`NUM`, `CT TIME`,`TYPE`,`ID` ,`PROBLEM`,`POSITION`) values (';
	//   var_dump($_POST);
	//   $sql.='\''.$_POST['NUM'].'\',';
	//   $sql.='\''.$_POST['CT_TIME'].'\',';
	//   $sql.='\''.$_POST['TYPE'].'\',';
	//   $sql.='\''.$_POST['ID'].'\',';
	//   $sql.='\''.$_POST['PROBLEM'].'\',';
	//   $sql.='\''.$_POST['POSITION'].'\',';

	//   $sql=trim($sql,",");
	//   $sql.=")";
	//   $sql.=' where `ID`='.$Reworkline;
     
	  $data=getResult($sql);
	  echo  $sql;

}


function SearchByState_db(){
	$sql="select * from enginedatabase";
	$data=getResult($sql);
	echo json_encode($data,true);
}
function SearchByPost_db(){
	$SearchItem=$_POST["SearchItem"];
	$SearchItemValue=$_POST["SearchItemValue"];

	// echo $SearchItemValue;

	$sql="select * from enginedatabase where ".$SearchItem."=".$SearchItemValue;
	if($SearchItem=="发动机号"){$sql="select * from enginedatabase where ID LIKE'%".$SearchItemValue."%'";}
	else if($SearchItem=="日期"){$sql="select * from enginedatabase where `CT TIME` LIKE'%".$SearchItemValue."%'";}
	else if($SearchItem=="返修原因"){$sql="select * from enginedatabase where PROBLEM LIKE'%".$SearchItemValue."%'";}
	else if($SearchItem=="机型"){$sql="select * from enginedatabase where TYPE LIKE '%".$SearchItemValue."%'";}
	else if($SearchItem=="待返修"){$sql="select * from enginedatabase where STATE='待返修'";}
	else if($SearchItem=="待冷试"){$sql="select * from enginedatabase where STATE='待冷试'";}
	else if($SearchItem=="待热试"){$sql="select * from enginedatabase where STATE='待热试'";}
	else if($SearchItem=="已放行"){$sql="select * from enginedatabase where STATE='已放行'";}
	else if($SearchItem=="全部"){$sql="select * from enginedatabase";}
	$data=getResult($sql);
	// echo $sql;
	echo json_encode($data,true);
}

function UploadPicture_db()
{
	echo("进入database\n");

	if (is_array($_FILES)) {
    $uploadType = array_keys($_FILES)[0];
    // echo($uploadType);
    // print_r(array_keys($_FILES));
    $files = $_FILES[$uploadType];
    //enigneID to upload picture
    $fileofEngine = $_FILES['currentEngineID'];
    $NameofEngine = $fileofEngine['name'];
    // echo json_encode($files,true);
	 //    if ($_FILES["userfile"]["error"] > 0)
		// {
		//   echo "Error: " . $_FILES["userfile"]["error"] . "<br />";
		// }
	} else {
	    die('Nothing Upload! [1]');
	}

	// $dir = 'C:/upload/';
	$dir = '../Images/';
	if (!is_dir($dir)) {
	    mkdir($dir);
	}
	$uploadURLString='';

	if (is_array($files['name'])) {
	    $picLink = [];
	    for ($i = 0; $i < count($files['name']); ++$i) {
	    	echo($files['name'][$i]."\n");
	    	//文件后缀
	        $picExplode = explode('.', $files['name'][$i]);
	        $picSuffix = '.'.end($picExplode);
	        // checkPic($picSuffix);

	        //文件前缀
	        $picPrefix = substr($files['name'][$i], 0, -(strlen($picSuffix)));

	        //文件名 - Cover | Carouse _ Time _ i+1 _ MD5
	        // $pic = $uploadType.'_'.date('YmdHis').'_'.($i + 1).'_'.md5($picPrefix).$picSuffix;
	        $pic = $uploadType.'_'.date('YmdHis').'_'.$NameofEngine[0].'_'.$picPrefix.$picSuffix;
	        // echo("文件名为：".$pic."\n");
	        try {
	            move_uploaded_file($files['tmp_name'][$i], $dir.mb_convert_encoding($pic,"gbk", "auto"));
	            $picLink[] = $dir.$pic;
	        } catch (Exception $e) {
	            die($e->getMessage());
	            echo("error____"+$e);
	        } 
	    }
	    echo implode("\n", $picLink);
	    $uploadURLString=implode("\n", $picLink); 
	}
	//download existed PictureURL
	$sql="select * from enginedatabase where ID = '"	.$NameofEngine[0]."'";
	$data=getResult($sql);
	// var_dump($data);
	$ExistedURL=$data[0]['PICTUREURL'];
	echo("row_items----");
	echo($ExistedURL);
	if ($ExistedURL!='') {
		$ExistedURL=$ExistedURL."\n";		
	}
	// upload picture to DB
	$uploadURLString=$ExistedURL.$uploadURLString;
	$sql="update enginedatabase set PICTUREURL='".$uploadURLString."' where ID= '".$NameofEngine[0]."'";
	echo($sql);
	$data=getResult($sql);
	// echo($data);
}
function SearchUploadedPicture_db()
{
	
	$SearchItem=$_POST["eningeID"];
	$sql="select * from enginedatabase where ID ='".$SearchItem."'";
	$data=getResult($sql);
	echo json_encode($data,true);
}
function UploadQualityCheckResult_db()
{
	$SearchItem=$_POST["eningeID"];
	$sql="update enginedatabase set QUALITYCHECKRESULT='1"."' where ID= '".$SearchItem."'";
	$data=getResult($sql);
	echo($data);
	
}

function addReworkTime_db()
{
	$Reworkline=$_POST["ReworkID"];
	$ReworkTime=$_POST["ReworkTime"];
	// echo('数据库读取的$ReworkTime'.$ReworkTime);
	$sql="update enginedatabase set REWORKTIME=concat(REWORKTIME,'".$ReworkTime."') where ID= '".$Reworkline."'";
	echo($sql);
	$data=getResult($sql);
	// echo($data);
}
function searchReworkTime_db()
{
	// echo('conduct database  search!');
	$Reworkline=$_POST["ReworkID"];
	// $ReworkTime=$_POST["ReworkTime"];
	// echo('数据库读取的$ReworkTime'.$ReworkTime);
	// $sql="update enginedatabase set REWORKTIME=concat(REWORKTIME,'".$ReworkTime."') where ID= '".$Reworkline."'";
	$sql="select * from enginedatabase where ID='".$Reworkline."'";
	// echo($sql);
	$data=getResult($sql);
	// echo($data);
	echo json_encode($data,true);
}
function dailyReworkEngine_db()
{
	// echo('conduct database  search!');
	$ReworkID=$_POST["ReworkID"];
	$ReworkDate=$_POST["ReworkDate"];
	// echo('数据库读取的$ReworkTime'.$ReworkTime);
	// $sql="update enginedatabase set REWORKTIME=concat(REWORKTIME,'".$ReworkTime."') where ID= '".$Reworkline."'";
	$sql="INSERT INTO dailyreworkengine VALUES"." ('".$ReworkDate."', '".$ReworkID."')";
	echo($sql);
	$data=getResult($sql);
	// echo($data);
	// echo json_encode($data,true);
}

function reworkContent_db()
{
	// echo('conduct database  search!');
	$Reworkline=$_POST["EngineID"];
	$ReworkDate=$_POST["ReworkContent"];
	// echo('数据库读取的$ReworkTime'.$ReworkTime);
	$sql="update enginedatabase set REWORKSTEP=concat(REWORKSTEP,'".$ReworkDate."') where ID= '".$Reworkline."'";
	echo($sql);
	$data=getResult($sql);
	echo($data);
	// echo json_encode($data,true);
}

function occupyStation_db()
{
	$sql="select POSITION from enginedatabase where STATE = '返修中'";
	$data=getResult($sql);
	echo json_encode($data,true);
}

function reworkRecordSearch_db()
{
	$sql="select CT_TIME from enginedatabase";
	// echo($sql);
	$data=getResult($sql);
	// echo($data);
	echo json_encode($data,true);
}



?>