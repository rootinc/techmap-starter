var DragInteraction = Interaction.extend({
  init:function(properties)
  {
    var that=this;
    
    this._super(properties);

    for (var i=0;i<this.$el.length;i++)
    {
      var $drag = $(this.$el[i]);

      var left = $drag.css("left");
      var top = $drag.css("top");

      $drag.data("left-start", left === "auto" ? "0px" : left);
      $drag.data("top-start", top === "auto" ? "0px" : top);
    }

    this.$el.draggable({
      //snap:?
      snapMode:"inner",
      zIndex:10,
      start:function()
      {
        var $drag=$(this);
        that.startDrag($drag);
        $drag.trigger("startDrag");
      },
      stop:function()
      {
        var $drag=$(this);
        that.stopDrag($drag);
        $drag.trigger("stopDrag");
      }
    }).each(function(){
      if ($(this).has('img'))
      {
        $(this).find('img').on('dragstart', function(event) { event.preventDefault(); }); //very stupid internet explorer preventing drag
      }
    });

    this.dropInteraction = new DropInteraction({
      el:properties.dropEl
    });
  },
  startDrag:function($drag)
  {
    var $drop = $drag.data("drop");
    
    if ($drop)
    {
      this.unlinkDragAndDrop($drag,$drop);
    }
    
    $drag.removeClass('dropped').addClass('dragged');

    //this.page.module.canSwipe = false; //stop the cheating swipe for now
  },
  stopDrag:function($drag)
  {
    $drag.removeClass('dragged');

    var $drop = this.dropInteraction.checkOverlaps($drag);
    
    /*if we dont have a drop or the droppable object already has a draggable object within it then we reset the position*/
    if(!$drop || $drop.data("drag"))
    {
      this.resetPosition($drag); //reset the drags pos
    }
    else
    {
      this.linkDragAndDrop($drag, $drop);
      this.setPosition($drag, $drop);
    }

    //this.page.module.canSwipe = true; //start the cheating swipe again
  },
  linkDragAndDrop:function($drag, $drop)
  {
    //a drag object now contains a drop object & vice versa
    $drag.data("drop", $drop);
    $drop.data("drag", $drag);
  },
  unlinkDragAndDrop:function($drag, $drop)
  {
    $drop.removeData("drag");
    $drag.removeData("drop");
  },
  setPosition:function($drag, $drop)
  {
    //making things look nice
    var props = this.dropInteraction.centerPosition($drag, $drop);
    $drag.animate(props).addClass('dropped');
  },
  resetPositions:function()
  {
    var that = this;
    
    this.$el.each(function(){
      var $drag = $(this);
      that.resetPosition($drag);
    });
  },
  resetPosition:function($drag)
  {
    var props = {};

    props.left = $drag.data("left-start");
    props.top = $drag.data("top-start");

    $drag.animate(props,300);
    
    if ($drag.data("drop"))
    {
      this.unlinkDragAndDrop($drag,$drag.data("drop"));
    }
  },
  dragsAllDropped:function()
  {
    var allDropped = true;
    
    this.$el.each(function(){
      var $el = $(this);
      
      if (!$el.data("drop"))
      {
        allDropped = false;
        return false;
      }
    });
    
    return allDropped;
  }
});
