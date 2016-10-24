/**
Used to subtitle things
Everything is in seconds
@class Subtitler
@extends Class
@author Dan Jewett
@version 1.0
@constructor
*/
var Subtitler = Class.extend({
    init:function(properties)
    {
		var that = this;
		
		this.currentIndex = 0;
		
		this.showTimes = [];
		this.hideTimes = [];
		
		this.showTimeouts = [];
		this.hideTimeouts = [];
		
		this.endTime = properties.endTime;
		
		this.el = $(properties.el);
		
		this.xml = properties.xml;
		this.data = [];
		
		SubtitleXMLParser.parse(this.xml,this.data,function(e){
			that.afterParse();
		});			
    },
	
	/**
    Called after the xml is parsed
    @method afterParse
    @protected
    */
	afterParse:function()
	{
		var totalStartDelay = 0;
		var totalEndDelay = 0;

		//for each animator
		for (var i=0;i<this.data.length;i++)
		{
			var div = $('<div/>');
			div.text(this.data[i].text);
			div.attr('this.data-id',this.data[i].id);

			this.el.append(div);

			totalStartDelay += (this.data[i].startTime*1000) - totalStartDelay;

			if (this.data[i].endTime)
			{
				totalEndDelay += (this.data[i].endTime*1000) - totalEndDelay;
			}
			else if (this.data[i+1])
			{
				totalEndDelay += (this.data[i+1].startTime*1000) - totalEndDelay;
			}
			else
			{
				totalEndDelay += (this.finalEndTime*1000) - totalEndDelay;
			}
			
			this.showTimes.push(totalStartDelay);
			this.hideTimes.push(totalEndDelay);
		}

		var divs = this.el.find('div');
		divs.hide();
		
		$(this).trigger(Subtitler.READY);
	},
	
	/**
    main play function
    @method play
    @param {Number} [startFrom] where to start playing from
    @public
    */
	play:function(startFrom)
	{
		this.el.find('div').hide();
		
		this.killDelays();
		this.setDelays(startFrom);
	},
	
	/**
    main stop function
    @method stop
    @public
    */
	stop:function()
	{
		this.el.find('div').hide();
		
		this.killDelays();
	},
	
	/**
    main stop function
    @method pause
    @public
    */
	pause:function()
	{		
		this.killDelays();
	},
	
	/**
    Kills all the internal timers
    @method killDelays
    @protected
    */
	killDelays:function()
	{
		while (this.showTimeouts.length > 0)
		{
			clearTimeout(this.showTimeouts.shift());
			clearTimeout(this.hideTimes.shift());
		}
	},
	
	/**
    Starts the internal timers
    @method setDelays
    @param {Number} [startFrom] where to start delays from
    @protected
    */
	setDelays:function(startFrom)
	{
		if (startFrom === undefined) startFrom = 0;
		
		var that = this;
		
		var found = false;
		
		for (var i=0;i<this.showTimes.length;i++)
		{
			if (this.showTimes[i] >= startFrom)
			{
				if  (!found)
				{
					this.currentIndex = i;
					found = true;
				}
				
				//push the timeout on the timeouts queue.
				this.showTimeouts.push(
					setTimeout(function(){
						that._show();

						that.showTimeouts.shift();
					},this.showTimes[i])
				);

				//push the timeout on the timeouts queue.
				this.hideTimeouts.push(
					setTimeout(function(){
						that._hide();

						that.currentIndex ++; //increment the index
						that.hideTimeouts.shift();
					},this.hideTimes[i])
				);
			}
		}
	},
	
	/**
    Show method
    @method _show
    @protected
    */
	_show:function()
	{
		var divs = this.el.find('div');
		var div = $(divs[this.currentIndex]);
		div.fadeIn();
	},
	
	/**
    Hide method
    @method _hide
    @protected
    */
	_hide:function()
	{
		var divs = this.el.find('div');
		var div = $(divs[this.currentIndex]);
		div.fadeOut();
	}
});

/**
Used to bind when Subtitler is ready
@static
@const READY
@type {String}
*/
Subtitler.READY = 'READY';