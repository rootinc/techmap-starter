var HorizontalSimpleSliderActivity = SimpleSliderActivity.extend({
  init:function(properties)
  {
    console.log("Start horizo");
    properties.axis = "x";
    
    this._super(properties);
  },
  start:function()
  {
    var start = this.startLevel*this.totalWidth;
    
    this.drag({position:{left:start}});
    
    this.$handle.css('left',start+'px');
    console.log("start Horiz");
  },
  drag:function(ui)
  {
    this.cap(ui);
    
    var rawPer = ui.position.left/this.totalWidth;
    
    this.toText(rawPer);
    console.log("Drag says raw " + rawPer);
    this.$level.width(rawPer*this.totalWidth);
    
    this.correct = this.isCorrect();

  },
  cap:function(ui)
  {
    var rawPer = ui.position.left/this.totalWidth;
    
    if (rawPer < 0)
    {
      ui.position.left = 0;
    }
    else if (rawPer > 1)
    {
      ui.position.left = this.totalWidth;
    }
  },
});