$(document).ready(function(){
  // SELECT J
  $(".select-j .title").click(function(){
    if(!$(this).parents(".select-j").hasClass("active")){
      $(this).parents(".select-j").addClass("active");
      $(this).parents(".select-j").find(".content").stop().slideDown();
    }
    else{
      $(this).parents(".select-j").removeClass("active");
      $(this).parents(".select-j").find(".content").stop().slideUp();
    }
  });
  // LANGUAGE
  $(".languageMobile .icon").click(function(){
    if(!$(this).parents(".languageMobile").hasClass("active")){
      $(this).parents(".languageMobile").addClass("active");
      $('html').addClass("openmenu1");
      $(".popupLanguage").stop().slideDown(200);
    }
    else{
      $(this).parents(".languageMobile").removeClass("active");
      $('html').removeClass("openmenu1");
      $(".popupLanguage").stop().slideUp(200,function(){
        $(this).css({"height":"auto"});
      });
    }
  });
  // MENUAFFIX
  $(".menuAffix > ul > .sa > a").click(function(){
    if(!$(this).parents("li.sa").hasClass("active")){
      $(this).parents("li.sa").addClass("active");
    }
    else{
      $(this).parents("li.sa").removeClass("active");
    }
    return false;
  });
  $(window).bind("click",function(e){
    var target=e.target;
    if(!$(target).parents("li.sa").hasClass("active")){
      $(".menuAffix ul li.sa").removeClass("active");
    }
  });
  $(".menuAffix > ul > .ha > a").click(function(){
    if(!$(this).parents("li.ha").hasClass("active")){
      $(this).parents("li.ha").addClass("active");
    }
    else{
      $(this).parents("li.ha").removeClass("active");
    }
    return false;
  });
  $(".menuAffix .hotlineAffix .d_close a").click(function(){
    $(this).parents("li.ha").removeClass("active");
    return false;
  });
  $(window).bind("click",function(e){
    var target=e.target;
    if(!$(target).parents("li.ha").hasClass("active")){
      $(".menuAffix ul li.ha").removeClass("active");
    }
  });
  // SLIDE
  $("#vnt-slide").slick({
    speed:800,
    autoplaySpeed:4000,
    autoplay:true,
  });
  // MMHOTLINE
  $(".mmButton a.b").fancybox({
    padding     : 0,
    maxWidth    : 480,
    width       : '100%' ,
    fitToView   : false,
    autoSize    : true,
    autoHeight  : true,
    autoWidth   : true,
    wrapCSS     : 'popup_hotline',
    closeBtn    : false,
    afterShow   : function(){
      $(".popup_hotline .d_close a").click(function(){
        jQuery.fancybox.close();
      });
    },
  });
});
function registerMaillist ()
{
  var femail = $("#femail").val();
  var ok_send = 1;

  if(!vnTRUST.is_email(femail)) {
    jAlert('Vui lòng nhập Email chính xác','Thông báo' );
    ok_send=0;
  }
  if (ok_send){
    var mydata = "email="+femail;
    $.ajax({
      async: true,
      dataType: 'json',
      url: ROOT+'load_ajax.php?do=regMaillist',
      type: 'POST',
      data: mydata ,
      success: function (data) {
        jAlert(data.mess,js_lang['announce']);
      }
    }) ;
    return false;
  }
  return false;
}
/*---------- LoadAjaxProduct ----------*/
function Load_Port(ext,country) {
  $('#resultForm').html('');
  $.ajax({
    async: true,
    dataType: 'json',
    url: ROOT+'load_ajax.php?do=load_port',
    type: 'POST',
    data: 'country='+country+'&lang='+lang,
    success: function (data){
      $('#'+ext).html(data.port_list);
    }
  });
}
