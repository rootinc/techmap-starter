/**
Used for quizzes
@class QuizActivity
@extends Activity
@author Dan Jewett
@constructor
*/
var TripleChartSliderActivity = Activity.extend({
  init:function(properties) //constructor
  {
    var that = this;
    this._super(properties); //call parent
    this.handleSelector = properties.handleSelector;
    this.submitButton = this.page.$el.find(properties.submitSelector);
    this.answerList = properties.answerList;

  },
  created:function() //when quiz is created
  {
    this._super(); //call parent
    this._create();
  },
  _create:function()
  {
    var that = this;
    var handles = this.page.$el.find(this.handleSelector);
    handles.each(function (n, o){
      console.log(" Handle " , o);
      var handle = $(o);
      handle.draggable({
        axis: "x", 
        containment:"parent",
        start:function(){
          
        },
        drag:function(e, ui){
          var active_handle = $(e.target);
          var level = active_handle.parent().find(".level");
          var left = ui.position.left;
          var max = active_handle.parent().width() - active_handle.width();
          var oleft = max;
          /*
          if (active_handle.data("oleft")){
            oleft = active_handle.data("oleft");
          } else {
            active_handle.data("oleft", ui.originalPosition.left);
            oleft = active_handle.data("oleft");
          }
          console.log("\nLevel:",level);
          console.log(left , " / " , oleft)
          console.log("Dragging " , e, " : " , ui)
          */
          var level_width = oleft - left;
          var level_perc = Math.floor(level_width / oleft*100)/100;
          level.css("width", level_width);
        },
        start:function(e, ui){
          var active_handle = $(e.target);
          var instruct = active_handle.parent().find(".instruct");
          instruct.fadeOut(100);
        },
        stop:function(){
          that.submitButton.show();
        }
      })
    })
    this.submitButton.on("click", function(){
      that.submitButton.fadeOut(100).delay(100).hide();
      //
      var instructs = that.page.$el.find(".instruct");
      instructs.fadeOut(100);
      //
      handles.each(function (n, o){
        console.log(" Handle " , o);
        var active_handle = $(o);
        var level = active_handle.parent().find(".level");
        var answer = that.answerList[n];
          var max = active_handle.parent().width() - active_handle.width();
          var oleft = max;
          var level_width = oleft - answer;
        level.animate({
          width: level_width,
        },2000);
        active_handle.animate({
          left: answer,
        },2000);
      });
      
    })
  },
});
