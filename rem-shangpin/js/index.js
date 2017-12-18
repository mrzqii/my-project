// var swiper = new Swiper('.swiper-container', {
//   pagination: '.swiper-pagination',
//   prevButton: '.swiper-button-prev',
//   nextButton: '.swiper-button-next',
//   initialSlide :1,
//   paginationClickable: true,
//   loop: true,
//   autoplay:3000,
//   autoplayDisableOnInteraction:false
// });

  var mySwiper = new Swiper ('#swiper2', {
    // direction: 'vertical',
    loop: true,
    autoplay: 2000,
    freeMode: true,
    
    // 如果需要分页器
    pagination: '.swiper-pagination',
     paginationClickable: true,
    
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    
    // 如果需要滚动条
    // scrollbar: '.swiper-scrollbar',
    autoplayDisableOnInteraction:false,
    parallax: true
  });

  var swiper1 = new Swiper('#swiper1',{
    direction: 'vertical',
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      autoplay: true,
      speed: 3000,
      loop: true
    });



  var timer = document.getElementById("timer");
  function leftTimer(year,month,day,hour,minute,second){ 
    var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数 
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
    days = checkTime(days); 
    hours = checkTime(hours); 
    minutes = checkTime(minutes); 
    seconds = checkTime(seconds); 
    // document.getElementById("timer").innerHTML = days+"天" + hours+"小时" + minutes+"分"+seconds+"秒"; 
    timer.innerHTML ='<span>'+hours+'</span>'+'<span>'+minutes+'</span>'+'<span>'+seconds+'</span>'; 
  } 

  
  
  function checkTime(i){  
    if(i<10) 
    { 
     i = "0" + i; 
    } 
     return i; 
    } 

  setInterval("leftTimer(2017,12,29,11,11,11)",1000); 