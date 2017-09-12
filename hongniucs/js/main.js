$(function(){
   var Main = {	iscrolls : []};
   Main.url = 'http://'+window.location.host+'/';//ajax请求地址
   Main.imgurl='http://'+window.location.host+'/Public/RedbullNight/';//加载图片请求地址
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
	$('.page_box').css('height',Main.height+'px')
	Main.scrollbool=false;	
	var href=location.href;
	if(href.indexOf('#index')>-1){
	   	$('.page_tab').hide();
		Main.indexbool=true;
	}
}
Main.On = function() {	
    
    Main.index=0; 
    $('.tan').click(function(){
	
     $(this).removeClass('hover')
	
	})
    
    	
}

//图片加载后执行
Main.loading=function(){
		if($('.page_index').length>0){
			Main.scrollbool=true;
		    Main.scrolbody();	
		}
		if(Main.indexbool==true){
			$('.page_index').addClass('current');
		}
		$('.page_box_0').addClass('current');
		//$('.page_box_0').addClass('current');
		//$(".img_3b").addClass('current');
		$('.bjtu').hide()
}
$(function(){
	
	Main.init();	
	var img=new Image();
	img.src=Main.imgurl+'images/bj.jpg';
	if(img.complete){		
		onload();				
		return ;
	}	
	img.onload=onload;
	function onload(){	
		if($(".page_load").length>0 ){
			Main.imgload();				
		}else{
		    Main.loading();			
		}			
	}	
	//Main.onplay(); 		
})

Main.imgload = function(imgs) {
	var imgs=Main.imgs;
	var length = imgs.length, index = 0;
	var loadspan=$('.num_load').find('span').get(0),loadtxt=document.getElementById('id_load_num')	
	//var svgForStroke=$('#svgForStroke')
	function load(){
		var img=new Image();
		img.src=Main.imgurl+imgs[index];
		if(img.complete){			
			setTimeout(function(){
				onload();
			},20)
			return ;
		}
		img.onload=function(){
			setTimeout(function(){
				onload();
			},20)
		};		
		function onload(){
			index++;			
			var a = Math.floor(100 / length * index);						
			//修改进度
			loadspan.style.width=a+'%';
		    loadtxt.innerHTML=a+'%'	
		    a=250/100*a;	
		   // svgForStroke.attr('style','stroke-dasharray:'+a+'% 250%')	
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
Main.imgs=['images/bj.jpg','images/anjingling_03.png','images/img_bei_5.png','images/img_4_03.png','images/img_3_03.png','images/img_2_03.png','images/fhhh_03.png','images/fhhh_zi_03.png','images/img_bei_2.png'];
/*tab切换*/   
   $('.choice .tab .win img').eq(1).css('width','10%')
   $('.choice .tab .win img').eq(1).css('marginTop','-6%')
   $('.tab2 .win img').eq(1).show()
   var index = 1;
   $('.choice .tab,.hua').on('swipeleft',function(){
		$('.choice .tab .win').animate({'left':-48+'%'},300,function(){
		$('.choice .tab .win').children().first().appendTo('.choice .tab .win')
		$('.choice .tab .win').css('left',-10+'%')
		$('.choice .tab .win img').eq(1).css('width','10%').siblings().css('width','4%')
		$('.choice .tab .win img').eq(1).css('marginTop','-6%').siblings().css('marginTop','0')
			})
		
		if(index<7){
		  index++
		  $('.tab2 .win img').eq(index).show().siblings().hide()
		}else{
		  index=0;
		  $('.tab2 .win img').eq(0).show().siblings().hide()
		}
		
	})
	$('.choice .tab,.hua').on('swiperight',function(){
		$('.choice .tab .win').children().last().prependTo('.choice .tab .win')
		$('.choice .tab .win').css('left',-46+'%')
		$('.choice .tab .win').animate({'left':-8+'%'},300,function(){
		  $('.choice .tab .win img').eq(1).css('marginTop','-6%').siblings().css('marginTop','0')	
		$('.choice .tab .win img').eq(1).css('width','10%').siblings().css('width','4%')	
		})	
		if(index>0){
		  index--
		  $('.tab2 .win img').eq(index).show().siblings().hide()
		}else{
		  index=7;
		  $('.tab2 .win img').eq(7).show().siblings().hide()
		}
	})
/*第三页解析*/	
	var sex = 0;
	var num=[
	         '约会前可花些心思装扮，提升自我魅力，不过预计好的行程恐有突发状况，宜保持稳定的情绪，安然面对。',
	         '恋爱运不错，多花心思在情感的经营，给自己与对方充足的安全感，关心会更稳定，争吵也会减少。',
	         '贵人从中协助，无论相亲或是自由联谊都能遇到好良缘，可多展现幽默感和亲和力，幸福就在掌握之中。',
			 '开始感受到一些示好的眼神，记住不要太急躁，从小细节去观察对方，平淡中培养属于你们的默契。',
			 '在爱情上容易疑神疑鬼，不容易遇到真心的对象，建议你还是放慢脚步，被骗的几率才会下降。',
			 '爱情本就充满变化性，想要追求幸福，一直停在现状是不够的，与其担心害怕，不如与对方手牵手共同面对。',
			 '感情如鱼得水，有伴者爱情满分，值得用心经营；单身者在工作上大放异彩时也容易吸引不少异性爱慕的眼光。',
			 '人力飙升，使你眉开眼笑，更显魅力，无论是结交朋友或是寻求伴侣，都能遇上绝佳的对象，感受爱情的甜蜜滋味。',
			 ]
	var num2=[
	         '你近期爱情运势很不错哟!洒脱阳光的气息感染身边每个人!尤其是在异性较多的公众场合会引来纷纷投注的目光!',
	         '想男人来疼爱呵护你珍惜你之前，你要先学会宠爱自己!虽近期的情路有些挫折坎坷，只要跨过这个坎，磨练识人的眼光，之后的前景是一片光明滴!',
	         '收敛下平日张扬的个性，魅惑指数可达高标哦!然而要维系一段长久的恋情，只一味高调主控对方可会事与愿违唷，涵养淑女的气质吧!',
			 '只需剪断昔日不必要的纠葛，重整行囊上路，风景终归美好!要接受“年年岁岁花相似，岁岁年年人不同”的俗世现实!',
			 '你近期的桃花运特别的旺呀，很容易遇上不适合你的烂桃花!但不管怎样，告白的勇士可是N多哟，各类型皆有呢!',
			 '克服怯懦，抛弃一切自卑的消极情绪!那个潜伏在暗处默默注视你很久，早已对你心存意思的感性男人会神秘的现身你面前直言对你告白哦!',
			 '很可能会有年纪较长的异性主动追求表白，其中若出现稳重男性，与之交往，说不定会有全新的恋爱考验和刺激的事情发生呢!',
			 '你近期的爱情运势就像是春风吹拂过大地，舒心又称意!也许会同时遇到几位异性向你示爱唷，总之是桃花遍地开!',
			 ]
/*点击男*/
	$('.main .img_3').click(function(){
		 ga('send','event','Man','man','click');
	    $('.main').hide()
		$('.choice').show()
		sex=1;
		
	})
/*点击女*/
	$('.main .img_4').click(function(){
		ga('send','event','Weman','weman','click');
		
	    $('.main').hide()
		$('.choice').show()
		sex=2;
	})
/*点击测试*/
	$('.choice .anniu').click(function(){
		 ga('send','event','Choose','Choose','click');
		 
		$('.analytical .img_bei').attr('src','images/img_bei_'+index+'.png')
		
		if(sex==1){
			var val = num[index]
		    $('.analytical p').html(val)
		}
		if(sex==2){
			if(index==0){
			   index=8;  
			}
			var val = num2[index-1]
			
		    $('.analytical p').html(val)
		}
	    $('.choice').hide()
		$('.analytical').show()
		
	})  
	$('.analytical .anniu4').click(function(){
		ga('send','event','Return','Renturn-frist','click');
        location.reload();
    })
	$('.analytical .anniu3').click(function(){
		setTimeout(function(){
	     $('.tanc').show()
		},500)
		
    })
	$('.tanc').click(function(){
	    $(this).hide()
	})
	$('body').bind("touchmove", function(e) {     e.preventDefault();});
})
