$(function() {
	load();
	// 1. toDoList 按下回车把新数据添加到本地存储里面
	// load()//开始前调用，是把数据显示在页面上
	$("#title").on("keydown",function(e){
		
		if(e.keyCode===13){
			if($(this).val()===""){
				alert("内容为空")
			}else{
				// 先读取本地存储原来的数据
					var local=getDate();
					console.log(local);
					// 把local数组进行更新数据 把最新的数据追加给local数组
					local.push({title:$(this).val(),done:false});
					// 把这个数组local存储到本地存储
					saveDate(local);//local是局部变量，传递给saveData()并且保存数据
					//  2.toDoList 本地存储数据渲染加载到页面
					load();
				}
				$(this).val("");
			}
		
	})
	// 3.toDolist删除操作
	$("ol,ul").on("click","a",function(){
		// 先获取本地元素
		var data = getDate();
		console.log(data);
		// 修改数据
		var index = $(this).attr("id");
		console.log(index);
		data.splice(index, 1);
		// 存储数据
		saveDate(data)
		// 重新渲染
		load()
	})
	// 4.toDoList  正在进行和已完成选项操作
	$("ol,ul").on("click","input",function(){
		// alert(1)
		// 先获取本地元素
		var data=getDate();
		// 修改数据
		var index = $(this).siblings("a").attr("id");
		data[index].done=$(this).prop("checked")
		console.log(data);
		// 存储数据
		saveDate(data)
		// 重新渲染
		load()
	})
	// 读取本地存储的数据
	function getDate(){
		var data = localStorage.getItem("todolist");
		    if (data !== null) {
		        // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
		        return JSON.parse(data);
		    } else {
		        return [];
		    }
		}
	// 保存本地存储数据
	function saveDate(data){
		localStorage.setItem("todolist",JSON.stringify(data))
	}
	
	// 渲染加载数据
	function load(){
		var data=getDate();
		console.log(data);
		// 遍历之前要清空ol里面的元素内容，不然会打印俩次
		$("ol,ul").empty();
		var todoCount=0;//正在进行的个数
		var doneCount=0;//已经完成的个数
		// 遍历数据
		$.each(data,function(i,n){
			if(n.done){
				$("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
				doneCount++;
			}else{
				$("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
				todoCount++;
			}
			// console.log(n);
			// $("ol").prepend("<li><input type='checkbox'>"+n.title+"<p></p><a href='javascript:;' id="+i+"></a></li>")
			// $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
		})
		$("#todocount").text(todoCount);
		$("#donecount").text(doneCount);
	}
})