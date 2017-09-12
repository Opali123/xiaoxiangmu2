/**
 *	作者：微笑
 *	QQ：904835003
 *	邮箱：904835003@qq.com
 *	支持原创、关注JquerySchool网站
 *	http://www.jq-school.com
 *	编写时间：2013-02-25
    var water=new WaterFull('.pubucon','#pubu','.box',2,'<div class="box boxload"> <div class="pic"><img src="<%=image%>"></div></div>',true,'json.html',{},'spage',1,'.watermore_load','.waterpage');
    water.getData(callback);//请求的回调函数
 */
(function(){
	
//oubucon:包含pubu外的标识   pubu:包含ul的标识   box:循环的标识   colsume:一列的个数  template:模板内容
//resizebool: 当发生resize事件是否绑定函数  
//url:请求的址地  data:请求时传递的参数对象   pagename:请求第几页时的属性名  pageindex:默认请求的页数  watermore_load:正在加载标识  waterpage:加载更多标识
function WaterFull(pubucon,pubu,box,colsnum,template,resizebool,url,data,pagename,pageindex,watermore_load,waterpage){
	var that=this;
	this.pubucon=$(pubucon);
	this.pubu=$(pubu);
	this.box=box;
	this.num=colsnum;
	this.template=_.template(template);
	this.getStartNum=0;
	this.bindbool=true;//是否可以继续加载更多的
	this.url=url;//请求地址
	this.data=data;//请求data对象
	this.pagename=pagename || 'spage';//请求page分布的属性名
	this.pageindex=pageindex ||1;//请求page的初始值	
	this.data[this.pagename]=this.pageindex;
	//console.log(this.data);
	this.date=[];//请求返回的数组保存
	this.allHeight=[];//保存高度数据
	this.watermore=$(waterpage);//加载更多
	this.watermore_load=$(watermore_load);//loading
	if(resizebool===true){//判断是否要绑定resize事件
		this.resize();
	}
	this.watermore.on('click',function(){
		that.getData();
	})
}
//无数据时执行
WaterFull.prototype.morehide=function(){
	this.watermore.hide();
	this.watermore_load.hide();
}
//绑定加载数据
WaterFull.prototype.getData=function(callback){	
	var that=this;
	if(this.bindbool==false){//判断是否允许请求加载
		return ;
	}
	if(typeof callback=='function'){
		that.callback=callback;
	}
	this.moretoggle();
	this.bindbool=false;//设置不可加载，在渲染完标签并计算完后会设置为true
	$.ajax({
		type:'get',
		url:this.url,
		dataType:'jsonp',
		data:this.data,
		success:function(data){
			//console.log(data);			
			if(data.err==0 && data.date!=null){
				that.setdate(data.date);//设置返回数据和页数，还原索引index为0		
			}else{
				that.morehide();
			}
		},error:function(){
			console.log('请求错误')
		}		
	})
}
//保存返回date 设置页数，还原索引index=0  
WaterFull.prototype.setdate=function(date){
	this.date=date;
	this.data[this.pagename]+=1;	
	this.index=0;
	//console.log(this.data);
	//console.log(this.date);
	this.append();//请求append渲染页面
}
//请求append渲染页面 加载图片并计算
WaterFull.prototype.append=function(){
	var html=this.template(this.date[this.index])
	//console.log(html);
	this.pubu.append(html);//渲染
	this.boxload=$('.boxload').last();//设置当前box
	this.imgload(this.date[this.index].image);//加载图片	
}
//计算位置 并请求append 循环数据
WaterFull.prototype.jiheight=function(){
	//console.log('可以计算了');	
	//循环执行append
	this.pubu.css('height','auto')
	if(this.date.length>++this.index){
		this.append();
	}else{	//循环完后再计算每个的位置
		
		var boxloads=$('.boxload');		
		var width=boxloads.eq(0).outerWidth();
		console.log('width:'+width)
		for(var i=0;i<boxloads.length;i++){
			if(this.allHeight.length<this.num){//当保存高度数组小于列num时		
				this.allHeight.push(boxloads.eq(i).outerHeight())
			}else{
				var min=Math.min.apply({},this.allHeight);//获取最高度最小的那个值
				var sy=this.getarrindex(min,this.allHeight);// 获取数组中最小值的索引
				boxloads.eq(i).css({top:min,left:sy*width,position:'absolute'});
				this.allHeight[sy]+=boxloads.eq(i).outerHeight();
			}
		}
		var max=Math.max.apply({},this.allHeight);
		if(max>$(window).height() && this.scrollbool!=true){//当页面高度高于浏览器时会有滚动条，这时需重新计算下位置			
			this.scrollbool=true;
			this.calculate(true);				
		}
		this.pubu.css('height',Math.max.apply({},this.allHeight));	
		boxloads.fadeIn().removeClass('boxload').addClass('transition_5');
		this.bindbool=true;//全部计算完成可以再次请求加载了
		if(!!this.callback){
			this.callback();
		}
		this.moretoggle();		
	}
}
//正在加载中和加载更多切换
WaterFull.prototype.moretoggle=function(){
	this.watermore.toggle();
	this.watermore_load.toggle();		
}
//图片加载
WaterFull.prototype.imgload=function(url){
	var that=this;
	var img=new Image();
	img.onload=function(){
		that.jiheight();//加载完图片后计算
	}
	img.onerror=function(){
		//console.log('图片加载失败')
		that.boxload.find('img').attr('src','images/default_img.jpg');
		that.jiheight();//加载完图片后计算
	}
	img.src=url;
	
}
//初始化计算或绑定resize事件计算
WaterFull.prototype.calculate=function(bool){
	//this.pubu.width(this.pubucon.width());
	this.moretoggle();
	this.allHeight=[],box=$(this.box);
	for(var i=0;i<box.length;i++){
		if(i<this.num){
			this.allHeight[i]=box.eq(i).outerHeight();			
		}else{
			var minHeight=Math.min.apply({},this.allHeight);//获取数据中最小的值
			var sy=this.getarrindex(minHeight,this.allHeight);// 获取数组中最小值的索引
			this.getStyle(box.eq(i),minHeight,sy*box.eq(i).outerWidth(),i,bool);
			this.allHeight[sy]+=box.eq(i).outerHeight();
		}
	}
	this.pubu.css('height',Math.max.apply({},this.allHeight));
	this.moretoggle();
}
//修改对应box位置
WaterFull.prototype.getStyle=function(box,top,left,index,bool){
	if(bool==undefined){
		if(this.getStartNum>=index){
			return;
		}
	}
	box.css('position','absolute');
	box.css({top:top,left:left});
	this.getStartNum=index;
	box.removeClass('boxload').fadeIn();
}
//绑定resize事件，重新计算box位置
WaterFull.prototype.resize=function(){
	var that=this;
	 $(window).on('resize',function(){
    	that.calculate(true);   	
    })
}
//获取数组指定值的索引
WaterFull.prototype.getarrindex=function(val,arr){
	for(sy in arr){
		if(arr[sy]==val){
			return sy;
		}
	}	
}
window.WaterFull=WaterFull;


}(window));
