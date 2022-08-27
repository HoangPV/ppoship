$(document).ready(function() {
  console.log('hello world')
  $(".searchTop .icon").click(function(){
    if(!$(this).parents(".searchTop").hasClass("active")){
      $(this).parents(".searchTop").addClass("active");
    }
    else{
      $(this).parents(".searchTop").removeClass("active");
    }
  });

  var stopLoadTime;
  var stopSearchAjax;
  var loadOverlay = 0;
  $(".searchTop .box_search input").keyup(function(e) {
    var keyword = $(this).val();
    var mydata = "keyword="+keyword+"&lang="+lang;

    if (loadOverlay == 0) {
      $(".ajax_search").html('<div class="suggess"><div class="suggessWrap"><ul><li></li></ul></div></div>');
    }

    // if (keyword) {
    var _search = 0;
    clearTimeout(stopLoadTime);
    clearTimeout(stopSearchAjax);

    if (loadOverlay == 0) {
      $(".ajax_search .suggess").addClass('loadOverlay loadOverlay-40');
    }
    loadOverlay = 1;

    // Xử lý gõ xong mới gọi ajax
    stopLoadTime = setTimeout(function(){
      _search = 1;
    }, 1000);

    stopSearchAjax = setTimeout(function(){
      if (_search == 1) {
        $.ajax({
          url: ROOT + '/load_ajax.php?do=product_search',
          type: 'POST',
          dataType: 'json',
          data: mydata,
          beforeSend: function(){},
        })
          .done(function(data) {
            $(".ajax_search").show();
            $(".ajax_search").html(data.html);
          })
          .fail(function() { })
          .always(function() {
            $(".ajax_search .suggess").removeClass('loadOverlay loadOverlay-40');
            loadOverlay = 0;
          });
      }
    }, 1100);
    // }
  });
});

//click ra ngoai box
jQuery(document).bind('click', function (e) {
  var clicked = jQuery(e.target);
  if (!clicked.parents().hasClass("searchTop")) {
    $('.searchTop').removeClass('active');
  }
});
