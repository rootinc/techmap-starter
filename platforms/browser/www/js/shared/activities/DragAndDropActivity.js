/**
Lets you drag things around
DON'T USE IMAGES DIRECTLY. WRAP THEM IN A DIV OR USE THEM AS A BACKGROUND IMAGE
Make sure drags are display inline-block or block
@class DragAndDropActivity
@extends Activity
@author Dan Jewett
@version 1.4
@fixed - _refactorPositionsM2O
@updates added autoPosition
@updates using offset for whole dom experience
@constructor
@param {Object} properties properties that the activity uses 
@param {String} properties.type the type the drag and drop is, either one to one or many to one (drags to goals)
@param {Boolean} properties.moveBack whether to revert the drag back if missed
@param {Boolean} properties.fitDrags whether to size the drag the same as the goal
@param {String} properties.drags the drags jquery selector
@param {String} properties.goals the goals jquery selector
@param {Boolean} properties.clone whether to clone the element
@param {Number} properties.maxBucketSize for many to one, how many drags can be put into goals
@param {Function} [properties.onDragStart] callback for when drag starts
@param {Function} [properties.onDragStop] callback for when drag stops
*/
var DragAndDropActivity = Activity.extend({
    init:function(properties) //constructor
    {
        this._super(properties);
        
        /**
        the type the drag and drop is, either one to one or many to one (drags to goals)
        @property type
        @type String
        @protected
        */
        this.type = properties.type;

        /**
        whether to revert the drag back if missed
        @property moveBack
        @type Boolean
        @protected
        */
        this.moveBack = properties.moveBack;
        
        /**
        whether to size the drag the same as the goal
        @property fitDrags
        @type Boolean
        @protected
        */
        this.fitDrags = properties.fitDrags;
        
        /**
        the drags jquery selector
        @property drags
        @type jQuery
        @protected
        */
        this.drags = $(properties.drags);
        
        /**
        the goals jquery selector
        @property goals
        @type jQuery
        @protected
        */
        this.goals = $(properties.goals);
        
        /**
        whether to clone the element
        @property clone
        @type Boolean
        @protected
        */
        this.clone = properties.clone;
        
        /**
        for many to one, how many drags can be put into goals
        @property maxBucketSize
        @type Number
        @protected
        */
        this.maxBucketSize = properties.maxBucketSize === undefined ? 1 : properties.maxBucketSize;
		
		/**
        Callback for when draggging starts
        @property onDragStart
        @type Function
        @protected
        */
        this.onDragStart = properties.onDragStart || undefined;
		
		/**
        Callback for when draggging stops
        @property onDragStop
        @type Function
        @protected
        */
        this.onDragStop = properties.onDragStop || undefined;
		
		/**
        Positions the drag on the goal nicely
        @property autoPosition
        @type Boolean
        @protected
        */
		this.autoPosition = properties.autoPosition === undefined ? true : properties.autoPosition;
        
        /**
        internal 2d array of where the drags are at
        @property collisions
        @type Array
        @protected
        */
        this.collisions = [];
        
        /**
        internal starting positions of drags
        @property startPos
        @type Array
        @protected
        */
        this.startPos = [];
        
        var len1 = this.drags.length;
        
        for (var i=0;i<len1;i++)
        {
            var $drag = $(this.drags[i]);
            
            //put the starting position of the drag in the internal startPos array
            this.startPos.push({
                left:$drag.css('left'),
                top:$drag.css('top')
            });
        }
        
        var len2 = this.goals.length;

        for (var i=0;i<len2;i++)
        {
            //push empty arrays in the collision array
            this.collisions.push([]);
        }
        
        this._initDrags();
    },
            
    _initDrags:function()
    {
        var that = this;

        //set all the draggable objects
        this.drags.draggable({
            snap:this.goals, //snap to the goal object
            snapMode:"inner",
            helper:this.clone ? "clone" : "original",
            zIndex: 10,
            start:function(){
                that.startDrag(this);
				that.onDragStart && that.onDragStart.call(that,this);
            },
            stop:function(){//when the thing stops dragging
                that.stopDrag(this);
				that.onDragStop && that.onDragStop.call(that,this);
            }
        }).prop(
            'draggable',true
        );

        this.drags.each(function(){
            if ($(this).has('img'))
            {
                $(this).find('img').on('dragstart', function(event) { event.preventDefault(); }); //very stupid internet explorer preventing drag
            }
        });
    },
            
    /**
    first function called when activity is created
    @event created
    @protected
    @override
    */
    created:function()
	{
		this._super();
        
        if (this.complete)
        {
            this.killDrags();
        }
    },
          
    /**
    prefills the activity to appear completed
    @method prefill
    @public
    @override
    */
    prefill:function()
    {
        this._super();
        
        var that = this;
        
        var dragCount = 0;
        var goalIndex = 0;
        
        this.drags.each(function(index){
            that.startDrag(this);
            
            if (that.type === DragAndDropActivity.ONE_TO_ONE)
            {
                var pos = that._centerPosition(this,$(that.goals)[index],index);
                $(this).css('left',pos.left).css('top',pos.top);
            }
            else if (that.type === DragAndDropActivity.MANY_TO_ONE)
            {
                var pos = that._centerPosition(this,$(that.goals)[goalIndex],goalIndex);
                $(this).css('left',pos.left).css('top',pos.top);
                
                dragCount ++;
                if (dragCount >= that.maxBucketSize)
                {
                    dragCount = 0;
                    goalIndex++;
                }
            }
            
            that.stopDrag(this);
        });
    },
            
    /**
    use this function if you need to do more stuff when you start a drag
    @method startDrag
    @param {Node} obj the drag object
    @public
    */
    startDrag:function(obj)
    {
        //clone check here
        
        $(obj).removeClass('dropped').addClass('dragged');
        
        this.page.module.canSwipe = false; //stop the cheating swipe for now
    },
            
    /**
    use this function if you need to do more stuff when you stop a drag
    @method stopDrag
    @param {Node} obj the drag object
    @public
    */
    stopDrag:function(obj)
    {
        $(obj).removeClass('dragged');
        
        if (!this.checkOverlaps(obj)) //if we are not overlapping the goals
        {
            if (this.moveBack) //and we are reverting
            {
                this.resetPosition(obj); //reset the drags pos
            }
        }
        
        if (this.inValidState()) //if all the drags are valid
        {
            this.killDrags(); //stop dragging everything
            this.activityComplete(); //complete activity
        }
        
        this.page.module.canSwipe = true; //start the cheating swipe again
    },
            
    /**
    resets a drag position
    @method resetPosition
    @param {Node} obj the drag object
    @public
    */
    resetPosition:function(obj)
    {
        var index = this.drags.index(obj); //get the index of the drag
        
        var props = {};
        
        //left and top are either 0px or what they were in our internal array
        props.left = this.startPos[index].left === "auto" ? '0px' : this.startPos[index].left;
        props.top = this.startPos[index].top === "auto" ? '0px' : this.startPos[index].top;

        $(obj).animate(props,300);
    },
            
    _centerPosition:function(obj,goal,goalIndex)
    {
        var props = {};
        
        var pos = $(goal).offset(); //the goal position //parse whole dom
        var pos2 = $(obj).offset(); //the current drag position //parse whole dom
        var pos3 = {left:parseInt($(obj).css('left')),top:parseInt($(obj).css('top'))}; //the relative starting position of the drag
        pos3.left = isNaN(pos3.left) ? 0 : pos3.left;
        pos3.top = isNaN(pos3.top) ? 0 : pos3.top;

        props.left = pos.left-pos2.left+pos3.left; //goal position - current drag position + start offset
        props.top = pos.top-pos2.top+pos3.top;

        return props;
    },
            
    /**
    position the one to one drag on the goal
    @method _positionO2O
    @param {Node} obj the drag object
    @param {Node} goal the goal object
    @param {Number} goalIndex the goal index that the drag hit
    @protected
    */
    _positionO2O:function(obj,goal,goalIndex)
    {
		if (this.autoPosition)
		{
			var props = {};

			//if we are supposed to fit it
			if (this.fitDrags)
			{
				//make the size of the drag the size of the goal
				props.width = $(goal).innerWidth();
				props.height = $(goal).innerHeight();
			}

			//center it better                        
			var pos = this._centerPosition(obj,goal,goalIndex);
			props.left = pos.left+"px";
			props.top = pos.top+"px";

			$(obj).animate(props).addClass('dropped');
		}
		else
		{
			$(obj).addClass('dropped');
		}
    },
            
    /**
    position the many to one drag on the goal
    @method _positionM2O
    @param {Node} obj the drag object
    @param {Node} goal the goal object
    @param {Number} goalIndex the goal index that the drag hit
    @protected
    */
    _positionM2O:function(obj,goal,goalIndex)
    {
		if (this.autoPosition)
		{
			//get how many drags are there
			var len = this.collisions[goalIndex].length;

			//get how wide the goal is
			var goalWidth = $(goal).width();

			//we position the drags in a row col way
			var row = 0;
			var col = 0;

			//for each drag
			for (var i=0;i<len;i++)
			{
				//get the next drag
				var next = this.collisions[goalIndex][i];

				//get the drag width
				var nextWidth = $(next).outerWidth(true);

				//increment col
				col ++;

				//if the col*width is greater than the goal width
				if (nextWidth*col > goalWidth)
				{
					row ++; //we need a new row
					col = 0;
				}
			}

			//normal stuff

			var props = {};

			//if we are supposed to fit it
			if (this.fitDrags)
			{
				//make the size of the drag the size of the goal
				props.width = $(goal).innerWidth();
				props.height = $(goal).innerHeight();
			}

			//center it better                        
			var pos = this._centerPosition(obj,goal,goalIndex);
			var left = pos.left;
			var top = pos.top;

			//get the width and height of the new drag
			var objWidth = $(obj).outerWidth(true);
			var objHeight = $(obj).outerHeight(true);

			//get positions of where to put the object
			var innerX = col*objWidth;
			var innerY = row*objHeight;

			props.left = innerX + left+'px'; //goal position - current drag position + start offset
			props.top = innerY + top+'px';

			$(obj).animate(props).addClass('dropped');
		}
		else
		{
			$(obj).addClass('dropped');
		}
    },
            
    /**
    refactor all the many to one positions of the drags
    @method _refactorPositionsM2O
    @param {Number} goalIndex which goal to refactor
    @protected
    */
    _refactorPositionsM2O:function(goalIndex)
    {
        var len = this.collisions[goalIndex].length; //get the number of drags
        
        //get the goals
        var goalWidth = $(this.goals[goalIndex]).width();
        
        //for each drag
        for (var i=0;i<len;i++)
        {
			//we position the drags in a row col way
			var row = 0;
			var col = 0;

			//for each drag so far
			for (var j=0;j<i;j++)
			{
				//get the next drag
				var next = this.collisions[goalIndex][j];

				//get the drag width
				var nextWidth = $(next).outerWidth(true);

				//increment col
				col ++;

				//if the col*width is greater than the goal width
				if (nextWidth*col > goalWidth)
				{
					row ++; //we need a new row
					col = 0;
				}
			}
			
            var obj = this.collisions[goalIndex][i]; //get the drag
			
			$(obj).removeClass('dropped').addClass('dragged');
			
            var pos = this._centerPosition(obj,this.goals[goalIndex],goalIndex);
            var left = pos.left;
            var top = pos.top;
            
            //get the width and height of the drag
            var objWidth = $(obj).outerWidth(true);
            var objHeight = $(obj).outerHeight(true);
            
            //get the x and y pos
            var innerX = col*objWidth;
            var innerY = row*objHeight;

            var props = {};
            props.left = innerX + left+'px'; //goal position - current drag position + start offset
            props.top = innerY + top+'px';
            
            $(obj).removeClass('dragged').animate(props).addClass('dropped');
        }
    },
            
    /**
    returns where the drag exists in the internal collisions array
    @method _existsWhere
    @param {Node} obj draggable to check
    @protected
    @return {Object|Null}
    */
    _existsWhere:function(obj)
    {
        //for each collision object, see if the drag is on it and if it is
        for (var i=0;i<this.collisions.length;i++)
        {
            for (var j=0;j<this.collisions[i].length;j++)
            {
                //if the drag internall is the obj
                if (this.collisions[i][j] === obj)
                {
                    return {
                        outerIndex:i,
                        innerIndex:j
                    };
                }
            }
        }
        
        return null;
    },
            
    /**
    checks to see if the drag overlaps with a goal
    @method checkOverlaps
    @param {Node} obj draggable to remove
    @public
    @return {Boolean}
    */
    checkOverlaps:function(obj)
    {
        var indexes = this._existsWhere(obj); //indexes of the drag
        
        if (indexes !== null) //if the drag exists some where
        {
            this.collisions[indexes.outerIndex].splice(indexes.innerIndex,1); //remove it because we are moving the drag
                            
            if (this.type === DragAndDropActivity.MANY_TO_ONE) //if the type is many to one
            {
                this._refactorPositionsM2O(indexes.outerIndex); //refactor all the drags in the goal so there are not gaps.
            }
        }

        var shortest = null;

        //for each goal object
        for (var i=0;i<this.goals.length;i++)
        {
            //if the drag overlaps the goal
				var dragOverlaps = 
					(
						(this.type === DragAndDropActivity.MANY_TO_ONE && this.collisions[i].length < this.maxBucketSize)
						|| (this.type === DragAndDropActivity.ONE_TO_ONE && this.collisions[i].length === 0)
					)
					&& overlaps(obj,this.goals[i]);
				
            if (dragOverlaps)
            {
                var dist = distance(obj,this.goals[i]); //if so get the distance
                
                if (shortest === null) //if we don't have one yet
                {
                    //this is now the shortest
                    shortest = {
                        index:i,
                        dist:dist
                    };
                }
                else
                {
                    if (dist < shortest.dist) //if the new distance is the shortest
                    {
                        //this is now the shortest
                        shortest = {
                            index:i,
                            dist:dist
                        };
                    }
                }
            }
        }

        if (shortest !== null) //if we found the shortest
        {
            var index = shortest.index;
            
            if (this.type === DragAndDropActivity.ONE_TO_ONE)
            {
                this._positionO2O(obj,this.goals[index],index);
            }
            else if (this.type === DragAndDropActivity.MANY_TO_ONE)
            {
                this._positionM2O(obj,this.goals[index],index);
            }

            this.collisions[index].push(obj); //set the collision index equal to the drag index

            return true;
        }

        return false;
    },
            
    /**
    returns true if all the drags have been placed on goals
    @method inValidState
    @public
    @return {Boolean}
    */
    inValidState:function()
    {
        //for each drag
        for (var i=0;i<this.drags.length;i++)
        {
            if (!$(this.drags[i]).hasClass('dropped')) //if the drag has not been dropped
            {
                return false;
            }
        }
        
        return true;
    },
            
    /**
    removes the draggables from jquery ui
    @method killDrags
    @public
    */
    killDrags:function()
    {
        var that = this;
        
        this.drags.each(function(){
            that.killDrag(this);
        });
    },
            
    /**
    removes a draggable from jquery ui
    @method killDrag
    @param {Node} obj draggable to remove
    @public
    */
    killDrag:function(obj)
    {
        if ($(obj).prop('draggable'))
        {
            $(obj).draggable("destroy").prop('draggable',false);
            
            if ($(obj).has('img'))
            {
                $(obj).find('img').off('dragstart');
            }
        }
    }
});
DragAndDropActivity.ONE_TO_ONE = "ONE_TO_ONE"; //One drag to one goal
DragAndDropActivity.MANY_TO_ONE = "MANY_TO_ONE"; //Many drags to one goal