/*Requires this in the HTML & CSS:
<svg>
  <line x1="410" y1="150" 
   x2="410" y2="150" 
   stroke="#00CC00" 
   stroke-width="4"/>

  <line x1="410" y1="210" 
   x2="410" y2="210" 
   stroke="#00CC00" 
   stroke-width="4"/>

  <line x1="410" y1="270" 
   x2="410" y2="270" 
   stroke="#00CC00" 
   stroke-width="4"/>

  <line x1="410" y1="330" 
   x2="410" y2="330" 
   stroke="#00CC00" 
   stroke-width="4"/>

  <line x1="410" y1="390" 
   x2="410" y2="390" 
   stroke="#00CC00" 
   stroke-width="4"/>

  <line x1="410" y1="450" 
   x2="410" y2="450" 
   stroke="#00CC00" 
   stroke-width="4"/>
</svg>

svg{
  position:absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
*/

var LinesDragAndDropActivity = CheckDragAndDropActivity.extend({
	init: function(properties){
		this._super(properties);
    
    var that = this;
		
		this.svgEl = $(properties.svgEl);
		this.svgLines = this.svgEl.find(properties.svgLines);
		this.lineType = properties.lineType;
		
		this.drags.on('drag', function(e, ui){
			if (!ui) return;
			
			var dragLine = that._getDragLine(e.target);
			that._drawDragLine(dragLine, ui.helper);
		});
	},
	
	created: function(){
		this._super();
    
    var that = this;
		
		//draw all lines to their drag objects
		//Goals aren't positioned yet so have to do this out of the current thread
		setTimeout(function(){
			for (var i = 0; i < that.svgLines.length; i++){	
				that._drawDragLine(that.svgLines[i], that.drags[i]);
			}
		});
	},
	
	//Sets the line end point to the passed object
	_drawDragLine: function(dragLine, endEl)
  {
		dragLine = $(dragLine);
		endEl = $(endEl);
		
		if (this.lineType == 'curve'){
			return this._drawCurvedDragLine(dragLine, endEl);
		}
		else if (this.lineType = 'line'){
			var endElPos = endEl.offset();
			var svgPos = this.svgEl.offset();
			dragLine.attr({
				"x2": endElPos.left - svgPos.left + 2, //2 just helps the line touch the border on angles
				"y2": 
					endElPos.top
					- svgPos.top
					+ Math.floor(endEl.height() / 2) //middle of object's vertical left
			});
		}
	},
	
	_drawCurvedDragLine: function(dragLine, endEl){
		var endElPos = endEl.offset();
		var svgPos = this.svgEl.offset();
		
		var currentD = dragLine.attr('d');
		var dChunks = currentD.split(' ');
		var MX = parseInt(dChunks[0].substring(1,4), 10);
		var MY = parseInt(dChunks[1], 10);
		var endX = (endElPos.left - svgPos.left + 2);
		var endY = (endElPos.top - svgPos.top	+ Math.floor(endEl.height() / 2)); //middle of object's vertical left
		var anchorSegmentX = Math.floor((endX - MX) / 3);
		var anchorSegmentY = Math.floor((endY - MY) / 5);
		var anchorSetY1 = MY + anchorSegmentY;
		var anchorSetY2 = MY + (4 * anchorSegmentY);
		//M245 115 Q 52.5 10, 95 80 T 180 80
		var d = 'M' + MX + ' ' + MY + ' Q ' + 
			(MX + anchorSegmentX) + ' ' + anchorSetY1 + ', ' +
			(MX + (anchorSegmentX * 2)) + ' ' + anchorSetY2 +
			' T ' + endX + ' ' + endY;
		
		dragLine.attr('d', d);
	},
	
	_getDragLine: function(drag){
		return $(this.svgLines[$(this.drags).index(drag)]);
	},
	
	_positionO2O: function(obj,goal,goalIndex){
		//We don't call _super() here as we have to do everything that _super does
		
    var that = this;
    
		var props = {};
		//center it better                        
		var pos = this._centerPosition(obj,goal,goalIndex);
		props.left = pos.left+"px";
		props.top = pos.top+"px";
		
		var options = {};
		var dragLine = this._getDragLine(obj);
		
		options.step = function(now, tween){
			that._drawDragLine(dragLine, obj);
		};

		$(obj).addClass('dropped').animate(props, options);
	},
	
	//Had to copy this whole function because we need to modify the call to animate()
	resetPosition:function(obj)
	{
		//Copied function so don't run _super()
		
		var index = $(this.drags).index(obj); //get the index of the drag

		var props = {};

		//left and top are either 0px or what they were in our internal array
		props.left = this.startPos[index].left === "auto" ? '0px' : this.startPos[index].left;
		props.top = this.startPos[index].top === "auto" ? '0px' : this.startPos[index].top;

		var options = {};
		var dragLine = this._getDragLine(obj);
		options.duration = 300;
		options.step = function(now, tween){
			this._drawDragLine(dragLine, obj);
		}.bind(this);
		
		$(obj).animate(props,options);
	}
});