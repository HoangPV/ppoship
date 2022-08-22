/*
===============================
============MNFIXED============
===============================
      Version: 1.0
       Author: Hoang Minh Ngoc
Date Publish : 29/03/2017
*/
(function($){
  class mnfixed{
    constructor(ele,opt){
      this.ele = ele;
      this.defaults = {
        limit:'',
        top:0,
        break:0
      };
      this.options = $.extend({},this.defaults,opt);
      this.init();
      this.run();
    }
  }
  mnfixed.prototype.init = function(){
    var _ = this;
    // console.log(_.options);
    _.ele.wrap("<div class='mnfixed_wrap'></div>");
    _.ele.parents(".mnfixed_wrap").wrap("<div class='mnfixed_height'></div>");

    _.self = _.ele.parents(".mnfixed_wrap");
    _.self_limit=$(_.options.limit);
    // console.log(_.options.limit);

    var sl_ = $(_.options.limit);
    if (sl_.length <= 0) return false;

    _.self.css({
      "width":_.self.parents(".mnfixed_height").outerWidth()
    });
    _.self.parents(".mnfixed_height").css({
      "position":"relative",
      "height": $(_.self).outerHeight()
    });
    _.b=_.self.parents(".mnfixed_height").offset().top - _.options.top;
    _.self.css({"z-index":"101"});
  }
  mnfixed.prototype.run = function(){
    var _ = this;
    $(window).bind("scroll", function(){
      if($(window).innerWidth() > _.options.break){
        _.a=$(window).scrollTop();
        if(_.a>=_.b){
          _.A();
        }
        else{
          _.B();
        }
        if(typeof _.self_limit.offset()=="object"){
          _.c=_.self_limit.offset().top + _.self_limit.outerHeight();
          _.d=$(window).scrollTop() + _.self.outerHeight();
          if(_.d>=_.c){
            _.C()
          }
          else{
            _.D();
          }
        }
      }
      else{
        _.E();
      }
    });
    $(window).resize(function(){
      _.b=_.ele.parents(".mnfixed_height").offset().top;
      _.ele.css({
        "width":_.ele.parents(".mnfixed_height").outerWidth()
      });
      _.ele.parents(".mnfixed_height").css({
        "position":"relative",
        "height": $(_).parents(".mnfixed_wrap").outerHeight()
      });
      _.self.css({
        "width":_.self.parents(".mnfixed_height").outerWidth()
      });
      if($(window).innerWidth() > _.options.break){
        _.self.parents(".mnfixed_height").css({
          "position":"relative",
          "height": $(_.self).outerHeight()
        });
        if(_.ele.hasClass("mnfixed_fixed")){
          _.A();
        }
        else if(_.ele.hasClass("mnfixed_fixed_fixed")){
          _.D();
        }
      }
      else{
        _.E();
      }
    });
  }
  mnfixed.prototype.A = function(){
    var _ = this;
    _.ele.addClass("mnfixed_fixed");
    _.self.css({
      "position":"fixed",
      "top":0 + _.options.top,
      "left":_.self.parents(".mnfixed_height").offset().left
    });
  }
  mnfixed.prototype.B = function(){
    var _ = this;
    _.ele.removeClass("mnfixed_fixed");
    _.self.css({
      "position":"initial",
    });
  }
  mnfixed.prototype.C = function(){
    var _ = this;
    _.self.removeClass("mnfixed_fixed");
    _.self.addClass("mnfixed_fixed_fixed");
    _.self.css({
      "position":"absolute",
      "top":_.c - _.b - _.self.outerHeight(),
      "left":0,
    });
  }
  mnfixed.prototype.D = function(){
    var _ = this;
    _.self.removeClass("mnfixed_fixed_fixed");
    _.self.addClass("mnfixed_fixed");
  }
  mnfixed.prototype.E = function(){
    var _ = this;
    _.ele.removeClass("mnfixed_fixed");
    _.ele.removeClass("mnfixed_fixed_fixed");
    _.self.removeClass("mnfixed_fixed");
    _.self.removeClass("mnfixed_fixed_fixed");
    _.self.css({
      "position":"initial",
      "left":"initial",
      "width":"initial",
      "top":"initial"
    });
    _.self.parents(".mnfixed_height").css({
      "position":"initial",
      "height": "initial"
    });
  }
  $.prototype.mnfixed = function(options) {
    var _ = this;
    var opt = arguments[0];
    _ = new mnfixed(_, opt);
  }
})(jQuery);
