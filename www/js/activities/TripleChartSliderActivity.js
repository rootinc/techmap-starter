/**
Used for quizzes
@class QuizActivity
@extends Activity
@constructor
*/
var TripleChartSliderActivity = Activity.extend({
  init: function (properties) //constructor
    {
      var that = this;
      this._super(properties); //call parent
      this.handleSelector = properties.handleSelector;
      this.labelMax = properties.labelMax;
      this.submitButton = this.page.$el.find(properties.submitSelector);
      this.answerList = properties.answerList;
      this.isComplete=false;

    },
  created: function () //when quiz is created
    {
      this._super(); //call parent
      this._create();
    },
  _create: function () {
    var that = this;
    this.isComplete=false;
    var handles = this.page.$el.find(this.handleSelector);
    // for each handle clip....
    handles.each(function (n, o) {
      var handle = $(o);
      handle.data("index", n + 1);
      handle.draggable({
        axis: "x",
        containment: "parent",
        drag: function (e, ui) {
          // find the handle, and the "bar" associated with it.
          var $handle = $(e.target);
          var $level = $handle.parent().find(".level");
          var label_selector = ".value.row" + $handle.data("index")
          var $label = that.page.$el.find(label_selector);
          // Find left, and original left (which is max)
          var left = ui.position.left;
          var oleft = $handle.parent().width() - $handle.width();
          // Find values for the blue bar.
          var level_width = oleft - left;
          var level_perc = Math.floor(level_width / oleft * 100) / 100;
          var level_val = level_perc * that.labelMax;

          level_val = Math.round(level_val * 10) / 10;
          $label.text(level_val);
          $level.css("width", level_width);
        },
        start: function (e, ui) {
          // find the bar, and the instructions associated with it.
          var $handle = $(e.target);
          var instruct = $handle.parent().find(".instruct");
          // prevent page advancing.
          that.page.module.canSwipe = false;
          instruct.fadeOut(100);
        },
        stop: function () {
          that.submitButton.show();
          // turn page advancing back on.
          that.page.module.canSwipe = true;
        }
      })
    })
    this.submitButton.on("click", function () {
      that.submitButton.fadeOut(100).delay(100).hide();
      //
      // make sure all the instruction are hidden - 
      // even if not all the bars were moved.
      var instructs = that.page.$el.find(".instruct");
      instructs.fadeOut(100);
      //
      // animate the handles to the correct positions.
      handles.each(function (n, o) {
        var $handle = $(o);
        var $level = $handle.parent().find(".level");
        // the manually set final answer.
        var answer = that.answerList[n];
        // the max left position
        var oleft = $handle.parent().width() - $handle.width();
        // the relative left position of the given answer.
        var answerPos = oleft - ((answer / that.labelMax) * oleft);
        // the width of the blue bar for that handle position.
        var level_width = oleft - answerPos;
        // the field with the text display of the value.
        var $label = that.page.$el.find(".value.row" + $handle.data("index"));
        
        $level.animate({
          width: level_width,
        }, 2000);
        $handle.animate({
            left: answerPos,
          },{
            duration:2000,
            step: function () {
              that.updateValueLabels();
            },
            complete: function(){
              var $handle = $(this);
              $handle.draggable("disable");
              $handle.fadeTo(1000, 0);
              var $label = that.page.$el.find(".value.row" + $handle.data("index"));
              var end_value = that.answerList[$handle.data("index")-1]
              $label.text(end_value);
              if (!that.isComplete){
                that.isComplete = true;
                console.log("One complete");
                var resp = that.page.$el.find(".response");
                console.log(resp);
                resp.removeClass("hide").addClass("show");
              }
            }
          }
        );
      });
    })
  },
  updateValueLabels:function(){
    var that = this;
    var handles = this.page.$el.find(this.handleSelector);
    // for each handle clip....
    handles.each(function (n, o) {
      var $handle = $(o);
      var label_selector = ".value.row" + $handle.data("index")
      var $label = that.page.$el.find(label_selector);
      // Find left, and original left (which is max)
      var left = $handle.position().left;
      var oleft = $handle.parent().width() - $handle.width();
      // Find values for the blue bar.
      var level_width = oleft - left;
      var level_perc = Math.floor(level_width / oleft * 100) / 100;
      var level_val = level_perc * that.labelMax;
      level_val = Math.round(level_val * 10) / 10;
      $label.text(level_val);
    });
  }
});
