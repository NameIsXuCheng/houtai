$(document).ready(function(e) {
	$(".timeline-years__full-line").css("width","100%");
	
	var autoTime=5000;//自动播放时间间隔
    var length=$(".timeline-years__year").length;
	var minlength=4.4;
	var nowind=0;
	var stoped=1;
	for(i=0;i<length;i++){
		(function(){
			var ind=i;
			$(".timeline-years__year").eq(i).click(function(){
				nowind=ind;
				$(".timeline-years__year").removeClass("active");
				$(this).addClass("active");
				$(".timeline-years__active-line").css({"width":(minlength+(ind*3*minlength))+"%"});
				
				$(".slick-track .slick-slider").removeClass("slick-active");
				$(".slick-track .slick-slider").eq(ind).addClass("slick-active");
				stoped=0;
			})
		})()
	}
	
	$(".slick-prev").click(function(){
		nowind--;
		if(nowind<0) nowind=length-1;
		$(".timeline-years__year").removeClass("active");
		$(".timeline-years__year").eq(nowind).addClass("active");
		$(".timeline-years__active-line").css({"width":(minlength+(nowind*3*minlength))+"%"});
		
		$(".slick-track .slick-slider").removeClass("slick-active");
		$(".slick-track .slick-slider").eq(nowind).addClass("slick-active");
		stoped=0;
	})
	$(".slick-next").click(function(){
		nowind++;
		if(nowind>length-1) nowind=0;
		$(".timeline-years__year").removeClass("active");
		$(".timeline-years__year").eq(nowind).addClass("active");
		$(".timeline-years__active-line").css({"width":(minlength+(nowind*3*minlength))+"%"});
		
		$(".slick-track .slick-slider").removeClass("slick-active");
		$(".slick-track .slick-slider").eq(nowind).addClass("slick-active");
		stoped=0;
	})
	
	setInterval(autoplay,autoTime);
	function autoplay(){
		if(stoped==0){
			stoped=1;
			return;
		}
		nowind++;
		if(nowind>length-1) nowind=0;
		$(".timeline-years__year").removeClass("active");
		$(".timeline-years__year").eq(nowind).addClass("active");
		$(".timeline-years__active-line").css({"width":(minlength+(nowind*3*minlength))+"%"});
		
		$(".slick-track .slick-slider").removeClass("slick-active");
		$(".slick-track .slick-slider").eq(nowind).addClass("slick-active");
	}
});