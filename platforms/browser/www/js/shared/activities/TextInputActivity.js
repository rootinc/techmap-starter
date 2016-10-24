/**
type in information and have it saved automatically
@class TextInputActivity
@extends Activity
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties properties that the activity uses
@param {String} properties.textInputs jquery selector to the textarea or input text
@param {String} properties.submitButton jquery selector to the submit button
@param {String} [properties.response] jquery selector to the response text when you click on submit
@param {Function} [properties.onSubmit] callback when submit button has been clicked
@param {Function} [properties.onFocus] callback when the text input has a focus event
@param {Function} [properties.onKeyUp] callback when the text input has a key up event
@param {String} [properties.lmsName] lms key used for storing the lms data
*/
var TextInputActivity = Activity.extend({
  init: function(properties){
    this._super(properties);
    var that = this;
    
    /**
        the jquery object of the text input or text area
        @property textInput
        @type jQuery
        @protected
        */
    this.textInputs = $(properties.textInputs);
    
    /**
        the jquery object of the submit button
        @property submitButton
        @type jQuery
        @protected
        */
    this.submitButton = $(properties.submitButton);
    
    /**
        the jquery object of response
        @property response
        @type jQuery|undefined
        @protected
        */
    this.response = properties.response ? $(properties.response) : undefined;
    
    /**
        function called after submit button is pressed
        @property onSubmit
        @type Function|undefined
        @protected
        */
    this.onSubmit = properties.onSubmit || undefined;
    
    /**
        function called when input is focused
        @property onFocus
        @type Function|undefined
        @protected
        */
    this.onFocus = properties.onFocus || undefined;
    
    /**
        function called after key up happens
        @property onKeyUp
        @type Function|undefined
        @protected
        */
    this.onKeyUp = properties.onKeyUp || undefined;
    
    /**
        lms key used for storing the lms data
        @property lmsName
        @type String|undefined
        @protected
        */
    this.lmsName = properties.lmsName || undefined;
    
    /**
        an object hash used to temporarily store the text from the input
        @property tempStorage
        @type Array
        @protected
        */
    this.tempStorage = [];
    
    //focus event
    this.textInputs.on('focus', function(e){
      that._focus(e,$(this));
      if (that.onFocus){
        that.onFocus.call(that,e,$(this));
      }
    });
    
    //key up event
    this.textInputs.on('keyup' , function(e){
      that._keyUp(e,$(this));
      if (that.onKeyUp){
        that.onKeyUp.call(that,e,$(this));
      }
    });
    
    //submit button event
    this.submitButton.on('click', function(e){
      that._submit(e);
      if (that.onSubmit){
        that.onSubmit.call(that,e);
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
    
    this._hideSubmitButton();
    this._hideResponse();
  },
  
  /**
    prefills the activity to appear completed
    @method prefill
    @public
    @override
    */
  prefill:function()
  {
    //if there is an lms name, and the lms is active, and there is data in the suspend data object
    if (this.lmsName)
    {
      var vals = this.loadData(this.lmsName); //get the vals
      if (vals !== undefined) //if there are vals
      {
        for (var i=0;i<vals.length;i++) //for each vals
        {
          var val = vals[i];
          this.tempStorage[i] = val;
          $(this.textInputs[i]).val(val); //set the input to the data in the supsend data object
        }
      }
    }
  },
  
  /**
    called when the the text input is focused
    @event _focus
    @protected
    @param {Event} e event object
    @param {jQuery} el the jquery object
    */
  _focus:function(e,el)
  {
    var index = this.textInputs.index(el);
    
    //if there is an lms name, and the lms is active, and there is data in the suspend data object
    //or there is something in the temp storage var
    if (this.tempStorage[index])
    {
      this._showSubmitButton(); //we will show the submit button (for resubmission)
      this._hideResponse(); //and just hide the response
    }
    else
    {
      el.val(''); //it is assumed to be the first time clicking on the input, clear the "watermark"
    }
  },
  
  /**
    called when the keyboard up event happens
    @event _keyUp
    @protected
    @param {Event} e event object
    @param {jQuery} el the jquery object
    */
  _keyUp:function(e,el)
  {
    if (this._checkInputsFilled()) //if there is something in the all the inputs
    {
      this._showSubmitButton(); //show the button
    }
    else //otherwise
    {
      this._hideSubmitButton(); //hide the button
    }
  },
  
  /**
    called when the submit button is pressed
    @event _submit
    @protected
    @param {Event} e event object
    */
  _submit:function(e)
  {
    this._hideSubmitButton(); //hide the submit button
    this._showResponse(); //show the response
    
    this._saveInputs(); //set the tempStorage var to the input values
    
    if (this.lmsName) //if the lms is active and there is a lms key
    {
      //.slice creates a copy of it, so we don't have messy pointer issues
      this.saveData(this.lmsName,this.tempStorage.slice()); //set the suspend data object to the temp storage var
    }
    
    this.activityComplete(); //complete the acitivty
  },
  
  /**
    shows the submit button
    @method _showSubmitButton
    @protected
    */
  _showSubmitButton:function()
  {
    this.submitButton.show();
  },
  
  /**
    shows the submit button
    @method _hideSubmitButton
    @protected
    */
  _hideSubmitButton:function()
  {
    this.submitButton.hide();
  },
  
  /**
    shows the response
    @method _showResponse
    @protected
    */
  _showResponse:function()
  {
    if (this.response)
    {
      this.response.show();
    }
  },
  
  /**
    hides the response
    @method _hideResponse
    @protected
    */
  _hideResponse:function()
  {
    if (this.response)
    {
      this.response.hide();
    }
  },
  
  /**
    returns true if all the inputs have something in it
    @method _checkInputsFilled
    @protected
    @return {Boolean}
    */
  _checkInputsFilled:function()
  {
    for (var i=0;i<this.textInputs.length;i++)
    {
      if ($(this.textInputs[i]).val().length === 0)
      {
        return false;
      }
    }
    
    return true;
  },
  
  /**
    saves the inputs into the temp storage which will later be saved out to the lms if it iexists
    @method _saveInputs
    @protected
    */
  _saveInputs:function()
  {
    for (var i=0;i<this.textInputs.length;i++)
    {
      this.tempStorage[i] = $(this.textInputs[i]).val();
    }
  }
});