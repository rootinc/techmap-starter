/**
Wraps around image maps, used to have the user try to find specific things within an image
@class HideAndSeekActivity
@extends Activity
@author Dan Jewett
@constructor
@param {Object} properties properties that the activity uses
@param {Array} properties.maps the image maps used
@param {String} properties.image the image that is using the maps
@param {Array} properties.texts an item list for the user
@param {String} properties.foundClass the css class used when you find the item. It gets applied to the texts
*/
var HideAndSeekActivity = Activity.extend({
  init:function(properties) //constructor
  {
    this._super(properties);
    
    var that = this;
    
    /**
        the image maps used
        @property maps
        @type Array
        @protected
        */
    this.maps = properties.maps;
    
    /**
        the image that is using the maps
        @property image
        @type jQuery
        @protected
        */
    this.image = $(properties.image);
    
    /**
        an item list for the user
        @property texts
        @type Array
        @public
        */
    this.texts = properties.texts;
    
    /**
        the css class used when you find the item. It gets applied to the texts
        @property foundClass
        @type String
        @protected
        */
    this.foundClass = properties.foundClass;
    
    this.current = 0;
    
    //for each map
    $(this.maps.join(",")).each(function(index){
      //assign the click event to the _mapClick function
      $(that.maps[index]+" area").on('click',function(){
        that._mapClick();
      });
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
    
    this._setMap(this.current);
  },
  
  /**
    sets the image map to a different map
    @method _setMap
    @param {Number} index which map to set
    @protected
    */
  _setMap:function(index)
  {
    if (index < 0)
    {
      this.image.removeAttr('usemap');
    }
    else
    {
      this.image.attr('usemap',this.maps[index]);
    }
  },
  
  /**
    this event is fired when the map has been clicked on
    @event _mapClick
    @protected
    */
  _mapClick:function()
  {
    $(this.texts[this.current]).addClass(this.foundClass); //add the found class
    
    this.current ++; //increment the current
    
    if (this.current >= this.maps.length) //if we found them all
    {
      this.foundAll(); //trigger it
    }
    else
    {
      this._setMap(this.current); //set the new map
    }
  },
  
  /**
    when the user finds everything
    @method foundAll
    @public
    */
  foundAll:function()
  {
    this.activityComplete();
  },
  
  /**
    when the gives up
    @method gaveUp
    @public
    */
  gaveUp:function()
  {
    this.activityComplete();
  },
  
  /**
    removes the found class from the texts
    @method removeFoundClass
    @public
    */
  removeFoundClass:function()
  {
    $(this.texts.join(",")).removeClass(this.foundClass);
  }
});