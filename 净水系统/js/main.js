var Main = {	iscrolls : []};
Main.url = '';//ajax请求地址
Main.imgurl=''//加载图片请求地址
Main.init = function() {	
	Main.ortchange(); 		  
	window.onresize = function() {		
		//Main.ortchange();	
	}	
	$(document.body).on('touchmove',function(e){
		//e.preventDefault?e.preventDefault():window.event.returnValue = false; 	
	})	
	//旋转	
	/*window.addEventListener('orientationchange',function(){
		//alert(window.orientation)
		// window.orientation  0 正着  左转90  右转-90
	})*/
	Main.On();		
}
Main.ortchange = function(bool) {
	Main.width = $(window).width()
	Main.height = $(window).height();	
	Main.scrollbool=false;
	$('.page_box').css('height',Main.height+'px')
	/*Main.id_audio=$('#id_audio').attr('src','images/bb.mp3?v=1.'+Math.random()*9999).get(0);
	a = navigator.userAgent.toLowerCase();    
    if(/android/ig.test(a)){
    	Main.id_audio.play(); 
    }else{
    	c()    	
    }	
	function c(){
		$('html').one('touchstart',function(){			  
		   Main.id_audio.play();		    			
	    })
	}	*/
}
Main.On = function() {	
    Main.index=0,curbool=true;
	
	/*$(".audio_mp3").on('touchstart',function(e){
		if(Main.id_audio.paused==false){
			Main.id_audio.pause();
			$(this).removeClass('play')			
		}else{
			Main.id_audio.play();
			$(this).addClass('play')			
		}
	})	*/
	$('.page_f').on('touchstart',function(e){
		$(this).hide();	
		e.preventDefault();
	})	
	$('.img_17').on('click',function(){
		$(".page_f").show();
	})	
	$('.img_12').on('click touchstart',function(){
		$('.img_21').transition({scale:1,opacity:1},200)
		setTimeout(function(){
			$('.img_21').trigger('click')
		},1000)
	})
	$('.img_21').on('click',function(){
		$(this).transition({scale:3,opacity:0},1000);
		setTimeout(function(){
			location.href="http://www.oppein.cn/oppein/edmsys/index.php?r=site/mapp&c=wxdjj20150304"
		},1000)
	})
	//手机验证
	//if(!/^1[34589]\d{9}$/.test(tel))
}

//图片加载后执行
Main.loading=function(){	
		if($('.page_index').length>0){			
		    Main.scrolbody();	
		}
		$('.page_box_0').addClass('current');
		setTimeout(function(){
			//$('.img_33').css('display','block');
		},3500)
		setTimeout(function(){
			Main.scrollbool=true;
			//$('.img_3').transition({opacity:1},300)
		},200)
}
$(function(){
	//Main.id_audio=$('#id_audio').attr('src','images/bb.mp3?v=1.'+Math.random()*9999).get(0);
	
	Main.init();	
	var img=new Image();
	img.src=Main.imgurl+'images/u1b_03.png';
	if(img.complete){		
		onload();				
		return ;
	}
	img.onload=onload;
	function onload(){	
			Main.imgload();		
	}		 		
})
Main.imgload = function(imgs) {
	var imgs=Main.imgs;
	var length = imgs.length, index = 0;
	var loadspan=document.getElementById('loadspan'),loadtxt=document.getElementById('id_load_num')	
	function load(){
		var img=new Image();
		img.src=Main.imgurl+imgs[index];
		if(img.complete){			
			setTimeout(function(){
				onload();
			},10)
			return ;
		}
		img.onload=function(){
			setTimeout(function(){
				onload();
			},10)
		};		
		function onload(){
			index++;
			var a = Math.floor(100 / length * index);						
			//修改进度
			//loadspan.style.width=a+'%';
		   // loadtxt.innerHTML=a+'%'			
			if (index == length) {	
				//进度改成100%
				$('.page_load').addClass('current');
				setTimeout(function(){
					Main.loading();			
				},200)
					
			}else{
				load();
			}		
		}
	}
	load();
}
Main.imgs=['images/u1_02.png'];
//滑动
var y,y2=0,index=0;
Main.scrolbody=function(){			
	$(document.body).get(0).addEventListener('touchstart',function(e){
		if(Main.scrollbool==false){
			y=y2=0;
			return ;
		}
		y=e.touches[0].pageY;
		//console.log(y);
	},false);
	$(document.body).get(0).addEventListener('touchmove',function(e){
		e.preventDefault();	
		if(Main.scrollbool==false){
			y=y2=0;
			return ;
		}
		y2=e.touches[0].pageY;
	},false)
	$(document.body).get(0).addEventListener('touchend',function(e){	
		if(Main.scrollbool==false || y2==0  ){
			y=y2=0;
			$('.page_con').css({y:-Main.index*Main.height+'px'});
			return ;
		}	
		if(y-y2>5 &&  Main.index<5 ){
		    Main.index+=1;			    
			$('.page_con').transition({y:-Main.index*Main.height+'px'},400);
			$('.page_box_'+Main.index).addClass('current');
			$('.page_box_'+(Main.index-1)).removeClass('current');
			Main.scrollbool=false;
			setTimeout(function(){
				Main.scrollbool=true;
			},200)
		}else 		if(y2-y>5 &&  Main.index>0 ){
			 Main.index-=1;
			$('.page_con').transition({y:-Main.index*Main.height+'px'},400);	
			$('.page_box_'+Main.index).addClass('current');
			$('.page_box_'+(Main.index+1)).removeClass('current');		
			Main.scrollbool=false;
			setTimeout(function(){
				Main.scrollbool=true;
			},200)
			if(Main.index<8){		    	
		    	$('.img_12').transition({y:'20px',opacity:0},0)		   
			}
		}else{
			$('.page_con').css({y:-Main.index*Main.height+'px'});
		}	
		if(Main.index>=5){
			$('.img_33').hide();
		}			
		y=y2=0;			
	},false);		
}
//摇一摇
Main.yao=function(){
	Main.last_update=new Date().getTime();
	var obj={x:0,y:0,z:0,last_x:0,last_y:0,last_z:0}	
	window.addEventListener('devicemotion',deviceMotionHandler, false); 
	function deviceMotionHandler(eventData){	
		if(Main.yaobool==false){
			return ;
		}	
		var acceleration =eventData.accelerationIncludingGravity;  	 
        var curTime = new Date().getTime();    
        var a=curTime - Main.last_update;       
        if (a> 100) {         	     	
		    var diffTime = curTime -Main.last_update;    
		    Main.last_update = curTime;        
		    obj.x = acceleration.x; 
		    obj.y = acceleration.y;   
		    obj.z = acceleration.z;   
		    var speed = Math.abs(obj.x +obj.y + obj.z - obj.last_x - obj.last_y - obj.last_z) / diffTime * 10000; 			   
		    if (speed > 3000) {    
			     Main.yaoindex++;
        	     if(Main.yaoindex<3){
        		     return ;
        	     }  else{
        	     	//成功后执行方法 
        	     	//window.removeEventListener('devicemotion',deviceMotionHandler,false)
        	     	Main.yaobool=false;
        	     }
		    }    
		    obj.last_x = obj.x;    
		    obj.last_y = obj.y;    
		    obj.last_z = obj.z;    
		}      
	}	
}
/*-----------------------------------微信分享  页面分享--------------------------*/
//渲染结构    jquery标签     模板    数据
Main.temp=function(dom,temp,obj){
	var temp=_.template(temp);
	var txt=temp(obj);
	dom.html(txt);
}
//jquery 擦除
Main.eraser=function(){
	var redux=document.getElementById('redux');
	//redux.style.width=document.documentElement.clientWidth+'px';
	//redux.style.height=document.documentElement.clientHeight+'px';
	//绑定执行，传递擦去80%时回调
	$("#redux").eraser({completeRatio:0.6,completeFunction:function(){
		console.log('60%')			
	}})
}
//加密  需加载 calcMd5   base64类库
Main.jimi=function(str){
   var  key = calcMD5('PGZ6Cz40Z1JCWCYNR');   
   var b=new Base64();
   var string=b.encode(str);
   var  len = key.length;   
   var code = '';  
   for (i = 0; i < string.length; i++) {   
      k = i % len;   
      code += String.fromCharCode(string.charCodeAt(i) ^ key.charCodeAt(k));   
   }  
   str=b.encode(code)
   console.log(encodeURIComponent(str)+'')   
   return encodeURIComponent(str);
}


//zepto/jquery get
Main.get = function(url, data, success) {
	$.ajax({
		type : 'get',
		url : Main.url+url,
		dataType : 'jsonp',
		data : data,
		success : function(response) {
			console.log(response);
			if(response.err==99){
				location.href=response.url
				return ;
			}
			success(response);
		}
	})
}
/*
 * post 用于post大量数据不包括文件，执行后会返回数据
 * 如写成jsonp会默认为get方式，固服务器不需要接受callback
 *
 */
Main.post = function(url, obj, call) {
	if (!/^http/.test(url)) {
		url = Backbone.url + url;
	}
	$.post(url, obj, function(response) {
		//console.log(response);
		if (call) {
			call(response)
		}
	}, 'json')
}
//获取指定对象的id并返回对象
Main.getdata=function(id){
	console.log(id);
	for(var i=0;i<Main.datas.length;i++){
		if(Main.datas[i].id==id){
			console.log(Main.datas[i])
			return Main.datas[i];
		}
	}
}
//字符串转换成数组
Main.getarr=function(str){
	var a=str.split(',');
    var arr=[];
    for(var i=0;i<a.length;i++){
    	arr.push({title:a[i].split(':')[0],url:a[i].split(':')[1]})
    }
    return arr;
}
//生成两次不重复的随机数 参数为最大值。
Main.Random=function(num){
	var a=Main.randomnum
	 var i=Math.round(Math.random()*num);	 
	 if(Main.randomnum==i){
	 	Main.randomnum= i==num?(i-1):(i+1)
	 }else{
	 	Main.randomnum=i;
	 }		 
}
Main.random=function(num){
	var i=Math.round(Math.random()*num);
	return i;
}

//------------------------------------------------------------------------------------------------------------miniset app ui
Main.tip = function(title, time) {
	var divtip = $('.divtip')
	divtip.html(title)
	divtip.addClass('divtip_an')
	var time = time || 1000;
	setTimeout(function() {
		divtip.removeClass('divtip_an')
	}, time)
}
/*alert 提示窗
 * id:弹出divid
 * ti:提示标题
 * con:内容
 * botton_vlaue ：按钮文字
 * bool:是否有背影
 * but_display:按钮的显隐
 * callback:点击确定后的回调
 * Main.alert('a','标题','内容',null,true,true,null)
 */
Main.alert = function(id, ti, con, botton_value, bool, but_display, callback) {
	var that = this;
	this.bool = bool;
	this.but_display = but_display != 'none' ? 'inline' : but_display;
	var ti = ti != undefined ? ti : '提示';
	var con = con != undefined ? con : '成功';
	var botton_value = botton_value != undefined ? botton_value : '确定';
	this.divalert = '<div class="divalert" id=' + id + '><span class="divalertti">' + ti + '</span><div class="divalertcon">' + con + '</div>	<div class="divalertfooter">';
	this.divalert += '<button cat="alertbutton" style="display:' + this.but_display + '">' + botton_value + '</button></div></div>';
	$(document.body).append(this.divalert);
	this.divalert = $('#' + id)
	if (this.bool == true) {
		this.divalertbg = '<div class="divalertbg"  id=' + id + '_bg></div>'
		$(document.body).append(this.divalertbg);
		this.divalertbg = $('#' + id + '_bg');
		this.divalertbg.css('display', 'block')
		this.divalertbg.animate({
			opacity : 0.4
		}, 0.5, 'linear')
	}
	this.divalert.css('display', 'block')
	this.divalert.animate({
		translate3d : '0,0px,0',
		opacity : 1
	}, 0.3, 'linear');
	this.divalert.on('touchstart', 'button', function(e) {
		e.preventDefault?e.preventDefault():window.event.returnValue = false; 	
		that.hide();
		return ;
	})
	this.hide = function() {
		if (that.bool == true) {
			that.divalertbg.animate({
				opacity : 0
			}, 0.5, 'linear', function() {
				that.divalertbg.css('display', 'none')
			})
		}
		that.divalert.animate({
			translate3d : '0,-50px,0',
			opacity : 0
		}, 0.3, 'linear', function() {
			that.divalert.remove();
			if (that.bool == true) {
				that.divalertbg.remove();
			}
		});
		if (callback) {			
			callback();			
		}
	}
	return this;
}
/*确定confirm
 * id,ti:标题,con:内容,bool:是否有透明背景，success_vlaue:确定按钮文字,error_value:取消按钮文字，success_fn:确定回调函数，error_fn:取消回调函数  ,tool当点击确定时是否隐藏弹出
 * var c=new Main.layerConfirm('id_3','confimr标题','确定要删除吗?',true,function(){alert('点击了成功')},function(){alert('点击了取消')},false)
 */

Main.layerConfirm = function(id, ti, con, bool, success_fn, error_fn, success_value, error_value, boolclear) {
	var that = this;
	this.id = 'layerconfirm_' + id;
	this.idbg = this.id + "_bg";
	this.ti = ti;
	this.con = con;
	this.success_vlaue = !!success_value ? success_value : '确定';
	this.error_value = !!error_value ? error_value : '取消';
	this.su_fn = !!success_fn ? success_fn : null;
	this.er_fn = !!error_fn ? error_fn : null;
	this.bool = bool ? bool : false;
	this.boolclear = boolclear;
	var txt = '<div class="layerconfirm" id="' + this.id + '"><span class="layerconfirm_ti">' + this.ti + '</span><div class="layerconfirm_con">' + this.con + '</div><div class="layerconfirm_footer">';
	txt += '	<button cat="confirm_success" class="success">' + this.success_vlaue + '</button><button cat="confirm_cancel" class="cancel">' + this.error_value + '</button>	</div></div><div class="layerconfirmbg" id="' + this.idbg + '"></div>';
	$(document.body).append(txt);
	this.el = $('#' + this.id);
	this.bg = $('#' + this.idbg);

	this.show = function() {
		this.bg.css('display', 'block')
		if (this.bool == true) {
			this.bg.animate({
				opacity : 0.2
			}, 0.5, 'linear')
		} else {
			this.bg.animate({
				opacity : 0
			}, 0.5, 'linear')
		}
	}
	this.hide = function() {
		that.bg.animate({
			opacity : 0
		}, 0.5, 'linear', function() {
			that.bg.css('display', 'none')
		})
		that.el.animate({
			translate3d : '0,-50px,0',
			opacity : 0
		}, 0.3, 'linear', function() {
			that.el.remove();
			that.bg.remove();
		});
	}
	this.show();
	this.el.css('display', 'block')
	this.el.animate({
		translate3d : '0,50px,0',
		opacity : 1
	}, 0.3, 'linear');
	this.el.on('click', 'button[cat="confirm_success"]', function() {
		if (!!that.su_fn) {
			that.su_fn(that.el);
		}
		if (that.boolclear != false) {
			that.hide();
		}

	}).on('click', 'button[cat="confirm_cancel"]', function() {
		if (!!that.er_fn) {
			that.er_fn(that.el);
		}
		that.hide();
	})
}

/*图片切换特效
 * 内置了window.onresize事件，用于在改变窗口大小时自动修改宽度
 * data:2013-9-10
 */
Main.Slider = function(slider, bool) {
	if (Main.width == undefined) {
		Main.width = $(window).width();
	}
	var that = this;
	this.data = {
		index : 0,
		time : 200,
		pageX : 0,
		pageXend : 0
	};
	this.slider = $('#' + slider)
	this.ul = this.slider.find('ul');
	this.ulid = this.ul.get(0);
	this.sliderid = this.slider.get(0);
	//this.len=this.slider.find('ul li').css({width:Main.width+'px'}).length;
	this.len = this.slider.find('ul li').length;
	this.plist = this.slider.find('p.plist').empty();
	this.width = this.ul.find('li').width()
	this.ul.css('width', this.len + '00%')
	for (var i = 0; i < this.len; i++) {
		i == 0 ? this.plist.append("<b class='current'></b>") : this.plist.append("<b></b>")
	}

	function _eventHandler(e) {
		switch(e.type) {
			case 'touchstart':
				that._touchstart(e)
				break;
			case 'touchmove':
				that._touchmove(e)
				break;
			case 'touchend':
				that._touchend(e)
				break;
			case 'touchcancel':
				break;
		}
	}


	this._touchstart = function(e) {
		//e.stopPropagation();
		e.preventDefault();
		that.data.pageX = e.touches[0].pageX;
		// alert(that.data.pageX)
		that.ulid.style.webkitTransitionDuration = '0ms';
	}
	this._touchmove = function(e) {
		e.stopPropagation();
		e.preventDefault();
		var x = e.touches[0].pageX - that.data.pageX;
		that.data.pageXend = e.touches[0].pageX;
		//that.ulid.style.left = '' + x +'px';
		that.ulid.style.webkitTransform = 'translate3d(' + (x - that.data.index * Main.width) + 'px,0,0)';

	}
	this._touchend = function(e) {
		var x = that.data.pageXend - that.data.pageX;
		that.ulid.style.webkitTransitionDuration = '0.5s';
		if (that.data.pageXend == 0) {
			/* var obj = e.srcElement ? e.srcElement:e.target;
			 alert($(this).html())
			 if(obj.tagName.toLowerCase()=="img"){
			 var href=$(obj)[0].src();
			 alert(href);
			 }*/
			if (Main.datahref != undefined && Main.datahref != '') {
				location.href = Main.datahref;
				Main.datahref = '';
			}
			//alert(Main.datahref)
		} else if (x < -20) {
			if (that.data.index < (that.len - 1)) {
				that.data.index++;
			}
			//that.ulid.style.left= -that.data.index * Main.width+ 'px;';
			//that.ul.css('left',-Number(that.data.index)*Main.width)
			that.ulid.style.cssText += '-webkit-transition:' + that.data.time + 'ms;-webkit-transform:translate3d(-' + Number(that.data.index) * Main.width + 'px,0,0);';

		} else if (x > 20) {
			if (that.data.index > 0) {
				that.data.index--;
			}
			//that.ulid.style.left =  -that.data.index * Main.width + 'px;';
			//that.ul.css('left',-that.data.index*Main.width)
			that.ulid.style.cssText += '-webkit-transition:' + that.data.time + 'ms;-webkit-transform:translate3d(-' + Number(that.data.index) * Main.width + 'px,0,0);';

		}
		that.plist.find('b').removeClass('current');
		that.plist.find('b').eq(that.data.index).addClass('current')
		that.data.pageXend = 0;
		that.data.pageX = 0;
	}
	//this.slider.on('touchstart touchmove touchend touchcancel',_eventHandler);
	document.getElementById(slider).addEventListener('touchstart', that._touchstart, false)
	document.getElementById(slider).addEventListener('touchmove', that._touchmove, false)
	document.getElementById(slider).addEventListener('touchend', that._touchend, false)

	//绑定窗口修改
	$(window).on('resize', function() {
		that.width = that.ul.find('li').width();
		that.ulid.style.cssText += '-webkit-transition:0ms;-webkit-transform:translate3d(-' + that.data.index * that.width + 'px,0,0);';
	});
}


/*--------------------工具---------------*/
//返回浏览器类型里css3用的前缀如-ms-
Main.getBrowser=function(){
   if(Main.cssbrowser !=undefined && Main.cssbrowser!=null ){
   	  return Main.cssbrowser
   }
   if(navigator.userAgent.indexOf("MSIE")>0) { 
   	   Main.cssbrowser="-ms-"; 
   }else  if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
   	   Main.cssbrowser="-moz-"; 
   }else if(isSafari=navigator.userAgent.indexOf("Safari")>0) { 
   	   Main.cssbrowser="-webkit-"; 
   } else{
   	   Main.cssbrowser="";
   }   
   return Main.cssbrowser;
}
//translate3d 修改, obj:$的对象  val:值 如  90%,0,0
Main.translate3d=function(obj,val,bool){	
	if(!bool){
		obj.get(0).style.cssText+=Main.browser+'transition:200ms;'+Main.browser+'transform:translate3d('+val+');';	
	}else{
		obj.get(0).style.cssText+=Main.browser+'transition:0ms;'+Main.browser+'transform:translate3d('+val+');';	
	}	
}
//判断浏览器
Main.browse=function(){
	Main.sys={};
	if(/msie/ig.test(navigator.userAgent)){
		Main.sys.name='ie';  		
	    var b_version=navigator.appVersion
	    var version=b_version.split(";");
	    var trim_Version=version[1].replace(/[ ]/g,"");	
        Main.sys.version=trim_Version;
        return ;
	}else if(navigator.userAgent.indexOf("Firefox")>0){
		Main.sys.name='firefox';
		return ;
	}else if(window.MessageEvent && !document.getBoxObjectFor && navigator.userAgent.indexOf("Chrome")>0){
		Main.sys.name='chrome';
		return ;
	}else if(window.openDatabase && navigator.userAgent.indexOf("Safari")>0){
		Main.sys.name='safari';
		return ;
	}	
}
Main.Unicode=function (str) {
                return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
}
Main.NUnicode=function (str) {
                return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
}
Main.addEvent=function (obj,type,fun){	
    if(obj.addEventListener){  
        obj.addEventListener(type,fun,false);  
    }else if(obj.attachEvent){  
        obj.attachEvent(type,fun);  
    }
};

/*-----------------sessionStorage -------------------*
 *timie:2013-10-24
 * 用于保存获取删除local数据 
 */
Main.sessionget=function(name){
	if(window.sessionStorage){
		return sessionStorage.getItem(name)
	}else{
		//console.log('不支持sessionStorage')
		return '';
	}
}
Main.sessionset=function(name,value){
	if(window.sessionStorage){
		sessionStorage.setItem(name,value);
	}else{
		//console.log('不支持sessionStorage')
		return false;
	}
	
}
Main.sessionremove=function(name){
	if(window.sessionStorage){
		sessionStorage.removeItem(name);
	}else{
		//console.log('不支持sessionStorage')
		return '';
	}
}/*-----------------localStorage -------------------*
 *timie:2013-10-24
 * 用于保存获取删除local数据 
 */
Main.localget=function(name){
	if(window.localStorage){
		return localStorage.getItem(name)
	}else{
		//console.log('不支持localStorage')
		return '';
	}
}
Main.localset=function(name,value){
	if(window.localStorage){
		localStorage.setItem(name,value);
	}else{
		//console.log('不支持localStorage')
		return false;
	}
	
}
Main.localremove=function(name){
	if(window.localStorage){
		localStorage.removeItem(name);
	}else{
		//console.log('不支持localStorage')
		return '';
	}
}
/*
 * cookie 设置
 * data:2013-9-24
 */
Main.getCookie=function(name){
	var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对     
    var cookie=new Object();     
    for (var i=0;i<cookieArray.length;i++){   
        var arr=cookieArray[i].split("=");       //将名和值分开      
        if(arr[0]==name)return unescape(arr[1]);  //如果是指定的cookie，则返回它的值      
    } 
    return "";  
} 
Main.delCookie=function (name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
Main.setCookie=function(name,value,Days)
{
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
