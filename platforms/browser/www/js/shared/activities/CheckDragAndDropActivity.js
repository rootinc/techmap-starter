/**
Lets you check if the drags are in the correct goal
@class CheckDragAndDropActivity
@extends DragAndDropActivity
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties properties that the activity uses 
@param {String} properties.checkAnswersButton check answers button jquery selector
@param {Array} properties.answers answers 2d array of drag indexes
@param {String} properties.correctResponse correct response jquery selector
@param {String} properties.incorrectResponse incorrect response jquery selector
@param {String} [properties.tries=1] max tries (-1 means until they get it right)
@param {String} [properties.tryAgain] jquery try again container
*/
var CheckDragAndDropActivity = DragAndDropActivity.extend({
    init:function(properties) //constructor
    {
        this._super(properties);

        /**
        check answers button jquery selector
        @property type
        @type jQuery
        @protected
        */
        this.checkAnswersButton = $(properties.checkAnswersButton);
        
        /**
        answers 2d array of drag indexes
        @property answers
        @type Array
        @protected
        */
        this.answers = properties.answers;
        
        /**
        correct response jquery selector
        @property correctResponse
        @type jQuery
        @protected
        */
        this.correctResponse = $(properties.correctResponse);
        
        /**
        incorrect response jquery selector
        @property incorrectResponse
        @type jQuery
        @protected
        */
        this.incorrectResponse = $(properties.incorrectResponse);
		
		/**
        jquery try again container
        @property tryAgain
        @type jQuery
        @protected
        */
        this.tryAgain = properties.tryAgain ? $(properties.tryAgain) : undefined;
		
		/**
        how many attempts the user has tried
        @property type
        @type Number
        @protected
        */
        this.attempts = 1;
        
        /**
        max tries (-1 means until they get it right)
        @property type
        @type Number
        @protected
        */
        this.tries = properties.tries === undefined ? 1 : properties.tries;
		
		var that = this;
		
		this.checkAnswersButton.on('click',function(){
            that._clickButton();
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
        
        //hide button
        this.checkAnswersButton.hide();
        
        this.hideResponses();
    },
        
    /**
    prefills the activity to appear completed
    @method prefill
    @public
    @override
    */
    prefill:function()
    {        
        this.autoCorrect();
    },
            
    /**
    called when the check answers button has been clicked
    @event _clickButton
    @protected
    */
    _clickButton:function()
    {
        this.checkAnswersButton.hide();
        this.hideResponses();
        
        //if tries is unlimited or attempts is less than tries
        if (this.tries === -1 || this.attempts < this.tries)
        {
            //if the answers are correct
            if (this.checkAnswers())
            {
                //show you are awesome text
                this.correctResponse.show();
                this.killDrags();
                this.activityComplete();
            }
            else
            {
                //show you are an idiot text
                this.tryAgain && this.tryAgain.show();
                this.resetBad();
            }
            
            this.attempts ++;
        }
        else
        {
            //if the answers are correct
            if (this.checkAnswers())
            {
                this.correctResponse.show(); //show you are awesome text
            }
            else
            {
                this.incorrectResponse.show(); //show you are an idiot text
            }

            this.killDrags(); //can't drag any more
            this.autoCorrect(); //autocorrect the positions
            this.activityComplete(); //we are done
        }
    },
            
    /**
    returns true if all the drags are in the right goals (assumes all the drags are in collisions)
    @method checkAnswers
    @public
    @return {Boolean}
    */
    checkAnswers:function()
    {
        //for each goal
        for (var i=0;i<this.collisions.length;i++)
        {
            //for each drag
            for (var j=0;j<this.collisions[i].length;j++)
            {
                //get the drag index
                var dragIndex = this.drags.index( $(this.collisions[i][j]) );
                
                //if it is not in the answers array
                if (!this._inAnswers(i,j,dragIndex))
                {
                    return false;
                }
            }
        }
        
        return true;
    },
            
    /**
    if the drag index is in the answers array
    @method _inAnswers
    @param {Number} outerIndex outer index of the 2d array
    @param {Number} innerIndex inner index of the 2d array
    @param {Number} dragIndex drag index of the internal drag array
    @protected
    @return {Boolean}
    */
    _inAnswers:function(outerIndex,innerIndex,dragIndex)
    {
        if (this.type === DragAndDropActivity.ONE_TO_ONE)
        {
            //if one to one, the answer must be the drag
            return this.answers[outerIndex][innerIndex] === dragIndex;
        }
        else if (this.type === DragAndDropActivity.MANY_TO_ONE)
        {
            //if many to one, as the as the drag is somewhere in the array, we are good
            var arr = this.answers[outerIndex];
            
            //for each answers
            for (var i=0;i<arr.length;i++)
            {
                //if the answer is there
                if (arr[i] === dragIndex)
                {
                    return true;
                }
            }
            
            return false;
        }
        else
        {
            return false;
        }
    },
            
    /**
    returns where the drag SHOULD exists in the internal answers array
    @method _belongsWhere
    @param {dragIndex} dragIndex index of the drag
    @protected
    @return {Object|Null}
    */
    _belongsWhere:function(dragIndex)
    {
        for (var i=0;i<this.answers.length;i++)
        {
            for (var j=0;j<this.answers[i].length;j++)
            {
                if (this.answers[i][j] === dragIndex)
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
    moves the drags to the correct goals
    @method autoCorrect
    @public
    */
    autoCorrect:function()
    {       
		var that = this;
		
		this.drags.each(function(dragIndex){
			var indexes = that._belongsWhere(dragIndex);
			
			if (that.collisions[indexes.outerIndex][indexes.innerIndex] !== this)
			{
				that.collisions[indexes.outerIndex].splice(indexes.innerIndex,1); //remove the drag
				
				that.collisions[indexes.outerIndex].push(this); //put the drag where it is supposed to be internally

				if (that.type === DragAndDropActivity.ONE_TO_ONE) //if it is one to one
				{
					$(that.drags[dragIndex]).removeClass('dropped');
					that._positionO2O(this,that.goals[indexes.outerIndex],indexes.outerIndex); //reposition drag
				}
			}
		});
        
        //after all the interal refactoring, if many to one
        if (this.type === DragAndDropActivity.MANY_TO_ONE)
        {
            //go through each goal and refactor bad drags
            for (var i=0;i<this.collisions.length;i++)
            {
                this._refactorPositionsM2O(i);
            }
        }
    },
            
    /**
    override stop drag with some new stuff
    @method stopDrag
    @param {Node} obj the drag object
    @public
    @override
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
        
        if (this.inValidState()) //if it is in a valid state
        {
            this.checkAnswersButton.show();
        }
        else //we removed it off the goal
        {
            this.checkAnswersButton.hide();
        }
        
        this.page.module.canSwipe = true; //start the cheating swipe again
    },
            
    /**
    hides all the responses
    @method hideResponses
    @public
    */
    hideResponses:function()
    {
        this.correctResponse.hide();
        this.incorrectResponse.hide();
		
		this.tryAgain && this.tryAgain.hide();
    },
            
    /**
    resets the drags that are not in the correct spot to their original spot
    @method resetBad
    @public
    */
    resetBad:function()
    {
		var that = this;
		
		this.drags.each(function(dragIndex){
			var indexes = that._belongsWhere(dragIndex);
			
			if (that.collisions[indexes.outerIndex][indexes.innerIndex] !== this)
			{
				//remove the drag from the interal array
				that.collisions[indexes.outerIndex].splice(indexes.innerIndex,1);

				$(this).removeClass('dropped');

				//reset position
				that.resetPosition(this);
			}
		});
        
        //after all the interal reseting, if many to one
        if (this.type === DragAndDropActivity.MANY_TO_ONE)
        {
            //go through each goal and refactor bad drags
            for (var i=0;i<this.collisions.length;i++)
            {
                this._refactorPositionsM2O(i);
            }
        }
    }
});