### 使用方法 ###
演示：[点击](https://mrzqii.github.io/myproject/)

	$("button").tap(function(){
	new Dialog({
		  //配置选项
		  type:"ok", //对话框类型('ok','warning','waiting')
		  buttons:null,//配置按钮个数，颜色，按钮名
		  delay:null,//弹出框多久关闭(2000)
		  text:null,//对话框提示信息  
		  maskOpacity:null,//对话框遮罩透明度(0.5)
		  effect:null,//对话框出现动画(true)
		  delayCallback:null,//延时关闭的回调函数
		  maskClose:null//点击遮罩层是否可以关闭(true)
		})
    });

### 封装思路 ###
面向对象的思路进行开发，使用常见插件开发的模式，使用zepto

- 首先使用html和css编写好静态效果，使用了部分css3，方便快捷
- 开始编写js逻辑，下面列出主要逻辑

    	;(function($){
			var Dialog = function(config) {
				this.mask = $('<div class="dialog-mask">');
				this.dialogWin = $('<div class="dialog-win">');
				this.winHeader = $('<div class="win-header"></div>')
				this.winContent = $('<div class="win-content">')
				this.footer = $('<div class="win-footer">')
				this.body = $('body')
			 	//默认配置信息
			 	this.config = {
			 		type:null,
			 		text:null,
			 		button:null,//按钮组
			 		delay:null,
			 		delayCallback:null,
			 		maskClose:null,//点击遮罩关闭弹出框
			 		maskOpacity:null,
			 		effect:null,
		
		 		}
		 		//根据传入的数据 扩展配置
			 	if (config) {
			 		$.extend(this.config,config)
			 	}else{
			 		// 当没有传任何配置的时候
			 		this.isConfig = true
			 	}
			 		this.create()
				}


				//添加方法
				Dialog.prototype = {

					animated:function(){//弹出框的动画实现},
					
					createButton:function(footer,button){
						// 创建button 这个稍微麻烦 单独一个方法
					},
					closeAll:function(){//关闭弹出框},
					 
					create:function(){//根据config来创建DOM结构}
					}

				window.Dialog = Dialog
				})(Zepto)