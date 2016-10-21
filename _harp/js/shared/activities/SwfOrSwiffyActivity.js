/**
Used as a wrapper around Swiffy or a Swf
Requires the swf
@class SwfOrSwiffyActivity
@extends SwiffyActivity
@author Dan Jewett
@version 0.4
@constructor
@param {Object} properties properties that the activity uses
@param {String} properties.swf string path to the swf
*/
var SwfOrSwiffyActivity = SwiffyActivity.extend({
  init:function(properties) //constructor
  {
    this._super(properties);
    
    /**
        string path to the swf
        @property swiffyId
        @type String
        @public
        */
    this.swf = properties.swf;
    
    /**
        whether the browser supports svg
        @property _supportsSVG
        @type Boolean
        @protected
        */
    this._supportsSVG = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
  },
  
  /**
    calls the _createStage or _createSwf function
    @method _begin
    @protected
    @override
    */
  _begin:function()
  {
    if (this._supportsSVG)
    {
      this._createStage();
    }
    else
    {
      this._createSwf();
    }
  },
  
  _createSwf:function()
  {
    this.container.html(
    '<object type="application/x-shockwave-flash" style="width: 100%; height: 100%;">\n\
        <param name="wmode" value="transparent">\n\
        <param name="movie" value="'+this.swf+'">\n\
        <param name="allowScriptAccess" value="always">\n\
      </object>'
    );
  },
  
  /**
    calls the _destroyStage or _destroySwf function
    @method _end
    @protected
    @override
    */
  _end:function()
  {
    if (this._supportsSVG)
    {
      this._destroyStage();
    }
    else
    {
      this._destroySwf();
    }
  },
  
  _destroySwf:function()
  {
    this.container.empty();
  }
});