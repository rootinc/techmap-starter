var DropInteraction = Interaction.extend({
  init:function(properties)
  {
    this._super(properties);
  },
  checkOverlaps:function($drag)
  {
    var shortest = null;
    var $currentDrop = null;

    this.$el.each(function(){
      var $drop = $(this);

      if (overlaps($drag,$drop))
      {
        var dist = distance($drag,$drop); //if so get the distance
        if (!shortest || dist < shortest)
        {
          shortest=dist;
          $currentDrop=$drop;
        }
      }
    });

    return $currentDrop;
  },
  centerPosition:function($drag, $drop)
  {
    var props = {};

    var pos = $drop.offset(); //the goal position //parse whole dom
    var pos2 = $drag.offset(); //the current drag position //parse whole dom

    var pos3 = { //the relative starting position of the drag
      left:parseInt($drag.css('left'), 10),
      top:parseInt($drag.css('top'), 10)
    };

    pos3.left = isNaN(pos3.left) ? 0 : pos3.left;
    pos3.top = isNaN(pos3.top) ? 0 : pos3.top;

    props.left = pos.left-pos2.left+pos3.left; //goal position - current drag position + start offset
    props.top= pos.top-pos2.top+pos3.top;

    props.left = props.left+"px";
    props.top = props.top+"px";

    return props;
  }
});
