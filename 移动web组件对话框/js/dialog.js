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
	 		// width:'auto',
	 		type:'',
	 		text:'',
	 		button:[],    //按钮组
	 		btnValue:'确认', //按键名字
	 		delay:'',
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
	// 添加层级
	Dialog.zIndex = 10000;
	Dialog.prototype = {
		animated:function(){
			var self = this
			this.dialogWin.css('transform','scale(0,0)');
			setTimeout(function(){
				self.dialogWin.css('transform','scale(1,1)');
			},150)

		},
		// 创建button
		createButton:function(footer,button){
			var self = this;
			$(button).each(function(i){
				var _this_ = this
				var msg = this.msg?this.msg:'按键'+i+1
				var type = this.type?this.type:'grey'
				var btn = $('<button class='+ type+'>'+msg+'</button>')
				footer.append(btn)
				//判断是否有回调函数
				if(this.callback){
					btn.tap(function(e){
						if(_this_.callback()!=false){
							self.closeAll()
						}
						e.stopPropagation()
					})
				}else{
					btn.tap(function(e){
						self.closeAll()
						e.stopPropagation()
					})
				}

			})



		},
		closeAll:function(){
			console.log('haha',this.mask)
			this.mask.get(0).remove()

		},
		 
		create:function(){
			var self = this
			var config = this.config,
				mask = this.mask,
				dialogWin = this.dialogWin,
				winHeader = this.winHeader,
				winContent = this.winContent,
				footer = this.footer,
				body = this.body;
				// maskOpacity = this.maskOpacity
				Dialog.zIndex++
				mask.css('zIndex',Dialog.zIndex)



			if(this.isConfig){
				dialogWin.append(winHeader.addClass('waiting'))
				mask.append(dialogWin)
				body.append(mask)
			}else{
				// console.log('11')
				if(config.maskOpacity){
					this.mask.css('backgroundColor',"rgba(0,0,0,"+config.maskOpacity+")")
				}

				if(config.type&&(config.type=='waiting'||config.type=='warning'||config.type=='ok')){
					dialogWin.append(winHeader.addClass(config.type));
					console.log('11')
				}
				if(config.text) {
					winContent.html(config.text);
					dialogWin.append(winContent.html(config.text));
				}

				if(config.button){
					this.createButton(footer,config.button)
					dialogWin.append(footer);


				}
				if(config.maskClose) {
					this.mask.tap(function(){
						self.closeAll()
						
					})
				}

				if (config.effect) {
					self.animated()
				}
				
				



				if(config.delay){
					var self = this
					setTimeout(function(){
						self.closeAll()
					},config.delay)
				}
				mask.append(dialogWin)
				body.append(mask)
				}
			}


		}
	 


	window.Dialog = Dialog
})(Zepto)