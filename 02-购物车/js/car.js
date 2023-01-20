$(function(){
	// 1.全选 全选功能模块
	// 就是把全选按钮（checkall）的状态赋值给三个小按钮（j-checkbox）就可以了
	// s事件可以是哟共change
	$(".checkall").change(function(){
		var a= $(this).prop("checked");
		$(".j-checkbox,.checkall").prop("checked",a)//并集选择器 自己也选上
		if($(this).prop("checked")){
			// 让所有商品添加check-cart-item类名
			$(".cart-item").addClass("check-cart-item");
		}else{
			// check-cart-item移除
			$(".cart-item").removeClass("check-cart-item")
		}
	})
	// 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
	$(".j-checkbox").change(function(){
		// console.log($(".j-checkbox:checked").length)  所有小复选框的个数
		if($(".j-checkbox:checked").length===$(".j-checkbox").length){
			$(".checkall").prop("checked",true)
		}else{
			$(".checkall").prop("checked",false)
		}
		if($(this).prop("checked")){
			// 让所有商品添加check-cart-item类名
			$(this).parents(".cart-item").addClass("check-cart-item");
		}else{
			// check-cart-item移除
			$(this).parents(".cart-item").removeClass("check-cart-item")
		}
	});
	// 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
	$(".increment").click(function(){
		// 得到当地兄弟文本框的值 现在的值为1
		var n=$(this).siblings(".itxt").val();
		// console.log(n)
		n++;
		$(this).siblings(".itxt").val(n)
		// 每次点击+号或者-号，根据文本框的值 乘以 当前商品的价格  就是 商品的小计
		// var p=$(this).parent().parent().siblings(".p-price").text().substr(1)*n;
		var p=$(this).parents(".p-num").siblings(".p-price").text().substr(1)*n
		// console.log(p)
		// 小计模块
		// $(this).parent().parent().siblings(".p-sum").html("￥"+p)
		$(this).parents(".p-num").siblings(".p-sum").html("￥"+p.toFixed(2))
		getSum();
	})
	// 减法
	$(".decrement").click(function(){
		// 得到当地兄弟文本框的值 现在的值为1
		var n=$(this).siblings(".itxt").val();
		// console.log(n)
	
		if(n==1){
			return false;
		}
			n--;
			$(this).siblings(".itxt").val(n)
			// var p=$(this).parents(".p-num").siblings(".p-price").text().substr(1)*n;
			 var p = $(this).parents(".p-num").siblings(".p-price").html();
			// console.log(p)
			 p = p.substr(1)
			// 小计模块
			 $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
			getSum();
		// $(this).siblings(".itxt").val(n)
	})
	// 4.用户修改文本框的值 计算 小计模块
	$(".itxt").change(function(){
		// 用最新的表单内的值 乘以 单价即可  但是还是当前商品小计
		n=$(this).val();
		var p=$(this).parents(".p-num").siblings(".p-price").text().substr(1)*n
		$(this).parents(".p-num").siblings(".p-sum").html("￥"+p.toFixed(2))
		getSum();
	})
	// 5.计算总计和总额模块
	getSum();
	function getSum(){
		var count=0;//计算总计数
		var money=0;//计算总价钱
		$(".itxt").each(function(i,ele){
			count+=parseInt($(ele).val());
		})
		$(".amount-sum em").text(count)
		$(".p-sum").each(function(i,ele){
			money+=parseInt($(ele).text().substr(1));
		})
		$(".price-sum em").text("￥"+money.toFixed(2))//.text(money)就是修改为我们的money
	}
	// 6.删除商品模块
	// 商品后面的删除按钮
	$(".p-action a").click(function(){
		// 删除的是当前的商品
		$(this).parents(".cart-item").remove();
		getSum();
	})
	// 删除选中的商品
	$(".remove-batch").click(function(){
		$(".j-checkbox:checked").parents(".cart-item").remove();
		getSum();
	})
	// 清空购物车 删除全部商品
	$(".clear-all").click(function(){
		$(".cart-item").remove();
		getSum();
	})
})