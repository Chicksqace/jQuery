$(function(){
	// 当我们点击了小li此时不需要执行 页面滚动事件里面的li的背景选择 添加current
	var flag=true;
	// 显示隐藏电梯导航
	var toolTop=$(".recommend").offset().top;
	toggleTool();
	function toggleTool(){
		if($(document).scrollTop()>=toolTop){
			$(".fixedtool").show()
		}else{
			$(".fixedtool").hide()
		}
	}
	$(window).scroll(function(){
		toggleTool();
		// 3.当我们页面滚动到内容区域某个模块， 左侧电梯导航，相对应的小li模块，也会添加current类， 兄弟移除current类。
		if(flag){
		$(".floor .w").each(function(i,ele){
			if($(document).scrollTop()>=$(ele).offset().top){
				$(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current")
			}
		})
		}
	})
	
	// 2.点击电梯导航页面就可以滚动到响应内容区域
	$(".fixedtool li").click(function(){
		flag=false;	
		// 当我们点击小li就要计算前往的位置
		// 选出对应索引号的内容区的盒子 计算它的。offset().top值
		var current=$(".floor .w").eq($(this).index()).offset().top;
		// 页面动画滚动效果
		$("body,html").stop().animate({
			scrollTop:current
		},function(){
			flag=true
		})
		// 点击之后，让当前小li添加current类名，姐妹移除current类名
		$(this).addClass("current").siblings().removeClass("current")
	})
})