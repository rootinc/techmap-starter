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
    // for each handle clip....
    handles.each(function (n, o){
      var handle = $(o);
      handle.draggable({
        axis: "x", 
        containment:"parent",
        drag:function(e, ui){
          // find the handle, and the "bar" associated with it.
          var active_handle = $(e.target);
          var level = active_handle.parent().find(".level");
          // Find left, and original left (which is max)
          var left = ui.position.left;
          var oleft = active_handle.parent().width() - active_handle.width();
          // Find values for the blue bar.
          var level_width = oleft - left;
          var level_perc = Math.floor(level_width / oleft*100)/100;
          level.css("width", level_width);
        },
        start:function(e, ui){
          // find the bar, and the instructions associated with it.
          var active_handle = $(e.target);
          var instruct = active_handle.parent().find(".instruct");
          // prevent page advancing.
          that.page.module.canSwipe = false;
          instruct.fadeOut(100);
        },
        stop:function(){
          that.submitButton.show();
          // turn page advancing back on.
          that.page.module.canSwipe = true;
         } 
      })
    })
    this.submitButton.on("click", function(){
      that.submitButton.fadeOut(100).delay(100).hide();
      //
      // make sure all the instruction are hidden - 
      // even if not all the bars were moved.
      var instructs = that.page.$el.find(".instruct");
      instructs.fadeOut(100);
      //
      // animate the handles to the correct positions.
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
