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
  },
  stopDrag:function($drag)
  {
    $drag.removeClass('dragged');

    var $drop = this.dropInteraction.checkOverlaps($drag);

    //if we dont have a drop or the droppable object already has a draggable object within it then we reset the position
    if(!$drop || $drop.data("drag"))
    {
      this.resetPosition($drag); //reset the drags pos
    }
    else
    {
      this.setPosition($drag, $drop);
    }
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
    //prevents "doubling" up
    if ($drag.data('drop') && $drag.data('drop')[0] !== $drop[0]) //but only reset if the drag is not the drop
    {
      this.resetPosition($drag);
    }
    
    //prevents "doubling" up
    if ($drop.data('drag') && $drop.data('drag')[0] !== $drag[0]) //but only reset if the drop is not the drag
    {
      this.resetPosition($drop.data('drag'));
    }
    
    this.linkDragAndDrop($drag, $drop);

    //making things look nice
    var props = this.dropInteraction.centerPosition($drag, $drop);
    $drag.stop(true).animate(props).addClass('dropped'); //stop is used for reset/set animations
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

    $drag.stop(true).animate(props,300); //stop is used for reset/set animations

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
  },
  dropsAllDragged:function()
  {
    return this.dropInteraction.dropsAllDragged();
  },
  enable:function()
  {
    this.$el.draggable("enable");
  },
  disable:function()
  {
    this.$el.draggable("disable");
  },
  delete:function()
  {
    this.$el.draggable("destroy");
  }
});
