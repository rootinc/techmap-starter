/**
Base Module - all modules inherit
@class Module
@extends Class
@author Dan Jewett
@version 2.01
@added functions for nonlinear
@updates refactored slightly for optimization
@updates added afterDestroy event
@updates added language object for multiple text files for each language
@constructor
@param {Object} properties properties that the module uses
@param {String} properties.debug_pageName jquery string for knowing the page id the user is on
@param {String} properties.nextButton jquery string for the next button
@param {String} properties.previousButton jquery string for the previous button
@param {String} properties.helpButton jquery string string for the helpButton
@param {String} properties.helpContainer jquery string for the help container
@param {String} properties.defaultLanguage the default language to load the module up with
@param {Object} properties.language list of languages and paths to the xml ted or ned files
@param {String} properties.soundOnPath path to the audio on image
@param {String} properties.soundOffPath path to the audio off image
@param {String} properties.audioButton the jquery string for the audio button
@param {String} properties.audioPath the path to the audio files
@param {String} properties.audioPrefix the audio prefix for each audio ted file
@param {String} properties.currentPageText id of the current page container
@param {String} properties.totalPageText id of the max page container
@param {String} properties.facilitatorText id of the facilitator container
@param {String} properties.titleText id of the title container
@param {String} properties.pageClass class used to specify what divs are pages
@param {String} properties.jPlayerPath string used to reference where jplayer is at
@param {Boolean} [properties.parseWithTed=true] whether to parse the module txt files with ted or ned
@param {Boolean} [properties.muteDefault=false] whether to start the module in a muted state (mainly for developers :) )
@param {String} [properties.disabledClass="disabled"] class used to determine if somethign is disabled
@param {String} [properties.showPageClass="show"] class used to show a page
@param {String} [properties.hidePageClass="hide"] class used to hide a page
@param {String} [properties.showingPageClass="showing"] class used to transition show a page
@param {String} [properties.hidingPageClass="hiding"] class used to transition hide a page
@param {Object} debug debug properties
@param {Boolean} debug.active=true whether the module is in debug mode
@param {String} [debug.pageName] container to show current page name
@param {String} [debug.pageSelector] container to show current page el
@param {Array} [properties.languages]
@param {Dictionary} [properties.dictionary]
*/
var Module = Class.extend({
  init:function(properties) //constructor
  {
    this.$el = properties.el ? $(properties.el) : $(document);

    if (this.$el[0].compatMode !== 'CSS1Compat')
    {
      console.error('You are in Quirks mode. The module may function incorrectly and the layout will be incorrect.');
    }

    if (this.$el.find('noscript').length === 0)
    {
      console.error("Framework requires noscript for debugging clients without javascript.  You can simply have a <noscript/> tag with the text No Javascript to bypass this error. Make the text clear so if a client sees it, they can easily report to us that they don't have javascript enabled.");
    }

    /**
    current page of the module (page 0 usually indicates title page)
    @property currentPage
    @type Number
    @public
    */
    this.currentPage = 0;

    /**
    array of pages
    @property pages
    @type Array
    @public
    */
    this.pages = [];

    /**
    keeps track of what group pages belong too
    @property groups
    @type Object
    @protected
    */
    this.groups = {};

    /**
    the lang object used to contruct the dictionary
    @property langObj
    @type Object
    @protected
    */
    this.langObj = properties.language;

    /**
    the current language
    @property language
    @type String
    @public
    */
    this.language = properties.defaultLanguage;

    /**
    the available languages (gets parsed from the language object)
    @property languages
    @type Array
    @public
    */
    this.languages = properties.languages || [];

    /**
    the dictionary containing all the textIds
    @property dictionary
    @type Dictionary
    @protected
    */
    this.dictionary = properties.dictionary || new Dictionary();

    /**
    whether the module is in debug mode. recommended turning off in production (debug.active)
    whether the user can cheat in the module (swipe, arrow keys to get through pages, shift+t+d for txt ids.)  recommended turning off in production
    @property debug
    @type Object
    @public
    */
    if (typeof properties.debug === "boolean")
    {
      this.debug = {};

      if (properties.debug && properties.canCheat)
      {
        this.debug.active = true;
      }
      else if (properties.canCheat && !properties.debug)
      {
        this.debug.active = true;
      }
      else
      {
        this.debug.active = false;
      }

      this.debug.pageName = properties.debug_pageName ? $(properties.debug_pageName) : undefined;
      this.debug.pageSelector = undefined;
    }
    else
    {
      this.debug = properties.debug;
      this.debug.pageName = properties.debug.pageName ? $(properties.debug.pageName) : undefined;
      this.debug.pageSelector = properties.debug.pageSelector ? $(properties.debug.pageSelector) : undefined;
    }

    /**
    string used to reference where jplayer is at
    @property jPlayerPath
    @type String
    @protected
    */
    this.jPlayerPath = properties.jPlayerPath;

    /**
    the jquery string for the next button
    @property $nextButton
    @type jQuery
    @protected
    */
    this.$nextButton = $(properties.nextButton);
    /*if (this.$nextButton.length === 0)
    {
      throw new TypeError("No such selector "+this.$nextButton.selector);
    }*/

    /**
    the jquery string for the previous button
    @property $previousButton
    @type jQuery
    @protected
    */
    this.$previousButton = $(properties.previousButton);
    /*if (this.$previousButton.length === 0)
    {
      throw new TypeError("No such selector "+this.$previousButton.selector);
    }*/

    /**
    the jquery string for the help button
    @property $helpButton
    @type jQuery
    @protected
    */
    this.$helpButton = $(properties.helpButton);
    /*if (this.$helpButton.length === 0)
    {
      throw new TypeError("No such selector "+this.$helpButton.selector);
    }*/

    /**
    the jquery object for the help container
    @property $helpContainer
    @type jQuery
    @protected
    */
    this.$helpContainer = $(properties.helpContainer);
    /*if (this.$helpContainer.length === 0)
    {
      throw new TypeError("No such selector "+this.$helpContainer.selector);
    }*?

    /**
    path to the audio on image
    @property soundOnPath
    @type String
    @protected
    */
    this.soundOnPath = properties.soundOnPath;

    /**
    path to the audio off image
    @property soundOffPath
    @type String
    @protected
    */
    this.soundOffPath = properties.soundOffPath;

    /**
    the jquery string for the audio button
    @property $audioButton
    @type jQuery
    @protected
    */
    this.$audioButton = $(properties.audioButton);

    /**
    the path to the audio files
    @property audioPath
    @type String
    @protected
    */
    this.audioPath = properties.audioPath;

    /**
    the audio prefix for each audio facilitator file
    @property audioPrefix
    @type String
    @protected
    */
    this.audioPrefix = properties.audioPrefix;

    /**
    whether audio is currently on or off for a module
    @property audioOn
    @type Boolean
    @protected
    */
    this.audioOn = true;

    /**
    whether to start the module in a muted state (mainly for developers :) )
    @property muteDefault
    @type Boolean
    @protected
    */
    this.muteDefault = properties.muteDefault === undefined ?  false : properties.muteDefault;

    /**
    id of the current page container
    @property $currentPageText
    @type jQuery
    @protected
    */
    this.$currentPageText = properties.currentPageText ? $(properties.currentPageText) : $(properties.pageNumText);
    /*if (this.$currentPageText.length === 0)
    {
      throw new TypeError("No such selector "+this.$currentPageText.selector);
    }*/

    /**
    id of the max page container
    @property $totalPageText
    @type jQuery
    @protected
    */
    this.$totalPageText = properties.totalPageText ? $(properties.totalPageText) : $(properties.pageMaxText);
    /*if (this.$totalPageText.length === 0)
    {
      throw new TypeError("No such selector "+this.$totalPageText.selector);
    }*/

    /**
    id of the facilitator container
    @property $facilitatorText
    @type jQuery
    @protected
    */
    this.$facilitatorText = $(properties.facilitatorText);
    /*if (this.$facilitatorText.length === 0)
    {
      throw new TypeError("No such selector "+this.$facilitatorText.selector);
    }*/

    /**
    id of the title container
    @property $titleText
    @type jQuery
    @protected
    */
    this.$titleText = $(properties.titleText);
    /*if (this.$titleText.length === 0)
    {
      throw new TypeError("No such selector "+this.$titleText.selector);
    }*/

    /**
    whether the module is currently showing the ted ids.
    @property showingTextIds
    @type Boolean
    @protected
    */
    this.showingTextIds = false;

    /**
    flag used to play audio on pages.  If we are repeating a page, sometimes we dont want the audio be be reread.  This flag is for that
    @property audioPlay
    @type Boolean
    @protected
    */
    this.audioPlay = true;

    /**
    what kind of parser to use
    @property parser
    @type DataParser
    @protected
    */
    this.parser = properties.parser ? properties.parser : undefined;

    /**
    class used to determine if something is disabled
    @property disabledClass
    @type String
    @protected
    */
    this.disabledClass = properties.disabledClass === undefined ? 'disabled' : properties.disabledClass;

    /**
    class used to show a page
    @property showPageClass
    @type String
    @protected
    */
    this.showPageClass = properties.showPageClass === undefined ? 'show' : properties.showPageClass;

    /**
    class used to hide a page
    @property hidePageClass
    @type String
    @protected
    */
    this.hidePageClass = properties.hidePageClass === undefined ? 'hide' : properties.hidePageClass;

    /**
    class used to transition show a page
    @property showingPageClass
    @type String
    @protected
    */
    this.showingPageClass = properties.showingPageClass === undefined ? 'showing' : properties.showingPageClass;

    /**
    class used to transition hide a page
    @property hidingPageClass
    @type String
    @protected
    */
    this.hidingPageClass = properties.hidingPageClass === undefined ? 'hiding' : properties.hidingPageClass;

    /**
    var used for fading pages in and out
    @property _fadeTime
    @type Number
    @protected
    */
    this._fadeTime = 0;

    /**
    used to pad the text for page count
    @property _padding
    @type String
    @protected
    */
    this._padding = properties._padding || "00";

    /**
    Determined when the audio is fully initialized
    @property _audioDeferred
    @type Deferred
    @protected
    */
    this._audioDeferred = $.Deferred();

    /**
    Determined when the data is parsed
    @property _dataDeferred
    @type Deferred
    @protected
    */
    this._dataDeferred = $.Deferred();

    this.initEvents();

    this.lockPrevious(); //lock the previous button (modules start on page 0, which there is no going back to negative world)

    this.$helpContainer.hide(); //hide the help container

    this.afterInit(properties);
  },

  initEvents:function()
  {
    var that = this;

    //when a page is completed, we trigger the on page complete function
    $(this).on(Page.PAGE_COMPLETE,function(e,page){
      that.onPageComplete(page);
    });

    //if the help menu is open, and we click the screen anywhere, we should hide the help container
    this.$el.on('click touchstart',function(e){
      that._hideHelp(e);
    });

    //if help button is clicked, we show the help container
    this.$helpButton.on('click',function(e){
      that._showHelp(e);
    });

    //if mute button is clicked
    this.$audioButton.on('click',function(e){
      that._toggleAudio(e);
    });

    //if the previous button is clicked
    this.$previousButton.on('click',function(e){
      that._previousPageButton(e);
    });

    //when the next button is clicked
    this.$nextButton.on('click',function(e){
      that._nextPageButton(e);
    });

    //if we can cheat in the module (remember, this is cheating, the user won't do this)
    if (this.debug.active)
    {
      //quick previous function wrapper
      var previous = function()
      {
        //we have to unlock the previous button to trigger a click event
        that.unlockPrevious();
        that.$previousButton.trigger('click');
      };

      //quick next function wrapper
      var next = function()
      {
        //we have to unlock the next button to trigger a click event
        that.unlockNext();
        that.$nextButton.trigger('click');
      };

      if (window['Hammer'])
      {
        //cheating for mobile, swipe right goes back
        this.$el.hammer().on('swiperight',function(){
            previous();
        });

        //cheating for mobile, swipe left goes forward
        this.$el.hammer().on('swipeleft',function(){
            next();
        });

        //pinch-rotating the screen 15 degrees in mobile lets us use ted.
        var rotate = function()
        {
          that.tedit();
        };

        //here is the event for pinch-rotate
        this.$el.hammer({transform_min_rotation:15}).one('rotate',rotate);

        //release event of a pinch-rotate
        this.$el.hammer().on('release',function(e){
          if (that.showingTextIds) //if we are showing ted ids
          {
            that.untedit(); //kill them
          }
          //rebind the event
          that.$el.hammer({transform_min_rotation:15}).one('rotate',rotate);
        });
      }
      else
      {
        console.warn("You may have forgot to include Hammer plugin");
      }

      if ($.hotkeys)
      {
        //keyboard down events
        this.$el.on('keydown',null,'left',function(e){
          previous();
        });

        this.$el.on('keydown',null,'right',function(e){
          next();
        });

        this.$el.on('keydown',null,'Shift+T',function(e){
          that.$el.one('keydown.extra',null,'Shift+D',function(e){
            if (!that.showingTextIds)
            {
              that.tedit(); //call the ted cheat funciton
            }
          });

        });

        this.$el.on('keyup',null,'Shift Shift+T Shift+D',function(e){
          that.$el.off('keydown.extra');

          if (that.showingTextIds)
          {
            that.untedit(); //quit showing ted
          }
        });
      }
      else
      {
        console.warn("You may have forgot to include jquery.hotkeys plugin");
      }
    }
  },

  /**
  event ran after marge is loaded
  @event afterInit
  @protected
  */
  afterInit:function(properties)
  {
    var that = this;

    this._beginLoading();

    //BEGIN LANGUAGE
    if (this.languages.length === 0)
    {
      for (var i in this.langObj)
      {
        this.languages.push(i);
      }
    }
    else
    {
      this.onLanguageParsed(); //we already have the languages,
      this._dataDeferred.resolve(); //so resolve the xml
    }

    this.switchLanguage(this.language);

    //END LANGUAGE

    //quick private function for when the audio is ready
    var audioReady = function(){
      that.onAudioReady();
      that._audioDeferred.resolve();
    };

    //initialize our audio player
    if (Audio.ready())
    {
      audioReady();
    }
    else
    {
      //bind the events first for race condition
      $(Audio).one(Audio.MEDIA_READY,audioReady);
      $(Audio).one(Audio.ERROR,function(e){
        that._audioError(e);
      });

      Audio.init(properties.audioPlayer,properties.jPlayerPath,properties.audioExt);
    }
  },

  /**
  binds the Deffereds and calls moduleReady when they are all resolved
  @method _beginLoading
  @protected
  */
  _beginLoading:function()
  {
    var that = this;

    $.when(this._audioDeferred,this._dataDeferred).done(function(){
      setTimeout(function(){ //the audio player has a try catch block that was catching errors when we didn't want moduleReady to be catching. So this hack resets the stack so no errors are being caught in the deferreds try catches.
        that.moduleReady();
      },0);
    });
  },

  /**
  parses the xml language files using the desired xml parser
  @method _parseLanguageFiles
  @param {DataParser} parser the parser to use
  @protected
  */
  _parseLanguageFiles:function(parser)
  {
    var that = this;

    var pgs = this.langObj[this.language]; //get the xmls of the language object

    if (!pgs)
    {
      throw new TypeError("Language "+this.language+" doesn't exist in the langObj");
    }

    var length = $.map(pgs,function(n,i){return i;}).length; //see how many there are
    var count = 0; //start the count to 0

    //for each pg index
    for (var page in pgs)
    {
      var path = pgs[page];

      //parse the particular data path
      parser.parse({
        path:path,
        page:page,
        language:this.language,
        dictionary:this.dictionary,
        afterParse:function(e){
          count++; //increment the count
          that.onDataParsed(e.data.page); //we've parsed the particular page

          if (count === length) //if we have parsed all the pages
          {
            that.onLanguageParsed(); //we've parsed the language
            that._dataDeferred.resolve(); //resolve this
          }
        }
      });
    }
  },

  /**
  event to hide the help container
  @event _hideHelp
  @protected
  @param {Event} e the event object
  */
  _hideHelp:function(e)
  {
    this.$helpContainer.hide();
  },

  /**
  event to show the help container
  @event _showHelp
  @protected
  @param {Event} e the event object
  */
  _showHelp:function(e)
  {
    e.stopPropagation(); //stop propagation, otherwise we will call the event above and hide the help menu again.
    this.$helpContainer.show();
  },

  /**
  toggles the audio on and off event
  @event _toggleAudio
  @protected
  @param {Event} e the event object
  */
  _toggleAudio:function(e)
  {
    e.stopPropagation();

    if (this.audioOn) //if our internal audio property is on
    {
      //mute the audio
      this.audioOn = false;
      Audio.mute();

      this._setAudioButton(false);
    }
    else //otherwise we should turn it back on
    {
      this.audioOn = true;
      Audio.unmute();

      this._setAudioButton(true);
    }
  },

  _setAudioButton:function(on)
  {
    this.$audioButton.css('background-image',on ? this.soundOnPath : this.soundOffPath);
  },

  /**
  launches the previous page if the button is not locked
  @event _previousPageButton
  @param {Event} e the event object
  @protected
  */
  _previousPageButton:function(e)
  {
    if (!this.isPreviousLocked()) //if it is not locked
    {
      this.previousPage(); //go to the previous page
    }
  },

  /**
  launches the next page if the button is not locked
  @event _nextPageButton
  @param {Event} e the event object
  @protected
  */
  _nextPageButton:function(e)
  {
    if (!this.isNextLocked()) //if it is not lcoked
    {
      this.nextPage(); //go to the next page
    }
  },

  /**
  overrides the previous page button functionality with the function that you pass
  @event overridePreviousPageButton
  @param {Function} [func] the function to override the previous button with. If no function is passed, it will use the module's default funcitonality of the previous button
  @protected
  */
  overridePreviousPageButton:function(func)
  {
    var that = this;
    this.$previousButton.off('click'); //remove the click event of the previous button

    if (func) //if there is a funciton
    {
      this.$previousButton.on('click',function(e){ //bind the click event to the button and make it call that function
        func.call(that,e);
      });
    }
    else
    {
      this.$previousButton.on('click',function(e){ //else bind the click even tto the default behavior
        that._previousPageButton(e);
      });
    }
  },

  /**
  overrides the next page button functionality with the function that you pass
  @event overrideNextPageButton
  @param {Function} [func] the function to override the next button with. If no function is passed, it will use the module's default funcitonality of the enxt button
  @protected
  */
  overrideNextPageButton:function(func)
  {
    var that = this;
    this.$nextButton.off('click'); //remove the click event of the next button

    if (func) //if there is a function
    {
      this.$nextButton.on('click',function(e){ //bind the click event to the button and make it call that function
        func.call(that,e);
      });
    }
    else
    {
      this.$nextButton.on('click',function(e){ //else bind the click even tto the default behavior
        that._nextPageButton(e);
      });
    }
  },

  /**
  this is used as a crappy fallback if the flash audio player can't initialize
  @method _audioError
  @protected
  */
  _audioError:function()
  {
    if (!confirm("The audio player is having trouble initiating.  Would you like to complete the module with no audio (All content will still be presented to you on screen)?"))
    {
      alert("The module will now close.  If you continue experiencing this error, please update your browser.");
      this.close();
    }
    else
    {
      $(Audio).trigger(Audio.MEDIA_READY); //trick the audio player in being ready

      this.$audioButton.off('click'); //disable the mute button
      this._setAudioButton(false); //make it so the mute button is the off image
    }
  },

  /**
  tries to close the module window (only works in a popup setting) the progress container, giving the user options to retart module or continue
  @method close
  @public
  */
  close:function()
  {
    if (window)
    {
      window.close();
    }
    if (window.top)
    {
      window.top.close();
    }
    if (window.parent)
    {
      window.parent.close();
    }
  },

  /**
  when a data page is parsed
  @event onDataParsed
  @param page the data page that was parsed
  @protected
  */
  onDataParsed:function(page)
  {
    var that = this;

    //change all the nodes in the dom that have data-lang with the current language
    DOM.jWalk(this.$el[0],function(node){
      DOM.changeDataLang(node,that.dictionary,that.language,page);
    }); //walk the dom
  },

  /**
  when the language is parsed
  @event onLanguageParsed
  @protected
  */
  onLanguageParsed:function(){},

  /**
  when the audio is ready
  @event onAudioReady
  @protected
  */
  onAudioReady:function(){},

  /**
  when module is ready
  @event moduleReady
  @protected
  */
  moduleReady:function()
  {
    this.setPageGroups();

    this.hideAllPages();

    var num = this._getUrlStartPage();
    if (num > -1)
    {
      this.currentPage = num;
    }

    this.audioOn = this.muteDefault;
    this.$audioButton.trigger('click');

    //load the first page (the title page)
    this.loadPage(this.getCurrentPage());
  },

  _getUrlStartPage:function()
  {
    if ($_GET['startPage'])
    {
      var num = parseInt($_GET['startPage'],10);
      if (!isNaN(num))
      {
        return num;
      }
      else
      {
        return this.getPageIndex($_GET['startPage']);
      }
    }

    return -1;
  },

  /**
  hides all the pages with jquery
  @method hideAllPages
  @protected
  */
  hideAllPages:function()
  {
    for (var i=0;i<this.pages.length;i++) //for each page
    {
      var page = this.pages[i]; //get the page
      page.$el.addClass('hide'); //hide thep page
    }
  },

  /**
  groups the modules' pages into groups.
  @method setPageGroups
  @protected
  */
  setPageGroups:function()
  {
    for (var i=0;i<this.pages.length;i++) //for each page
    {
      var page = this.pages[i]; //get the page
      if (page === undefined) //page integrity check
      {
        throw new TypeError("Page is undefined. You either have a trailing comma or forgot to declare page");
      }

      var group = page.group; //get the page group
      if (!this.groups[group]) //if there is not a group made
      {
        this.groups[group] = []; //make an array for that group
      }

      this.groups[group].push(page); //push that page on the group
    }
  },

  /**
  when a page's activity has been completed
  @event onPageComplete
  @protected
  @param {Page} page the page that just got completed
  */
  onPageComplete:function(page)
  {
    //by default, on page complete unlocks next and previous button
    if (page === this.getCurrentPage()) //in case we've went to another page during this transition
    {
      this.unlockNextAndPrevious();
    }
  },

  /**
  changes the facilitator text to the txtId
  @method changeFacilitatorText
  @public
  @param {String} txtId the text id to to be changed
  */
  changeFacilitatorText:function(txtId)
  {
    //sets the data-lang
    this.changeNodeText(this.$facilitatorText,txtId,'default',true);
  },

  /**
  hange the title text to the txtId
  @method changeTitleText
  @public
  @param {String} txtId the text id to to be changed
  */
  changeTitleText:function(txtId)
  {
    //sets the data-lang
    this.changeNodeText(this.$titleText,txtId,'default',true);
  },

  /**
  goes to the previous page
  @method previousPage
  @public
  */
  previousPage:function()
  {
    if (!this.isPreviousLocked()) //if the previous button is not locked
    {
      this.unloadPage(this.getCurrentPage());

      //go back a page
      this.currentPage --;
      if (this.currentPage <= 0) //if it is less than 0
      {
        this.currentPage = 0; //set it to 0
      }

      this.loadPage(this.getCurrentPage()); //load the new page
    }
  },

  /**
  goes to the next page
  @method nextPage
  @public
  */
  nextPage:function()
  {
    if (!this.isNextLocked()) //if the next button is not locked
    {
      this.unloadPage(this.getCurrentPage());

      //go forward a page
      this.currentPage ++;
      if (this.currentPage >= this.pages.length-1) //if it is greater than the page length
      {
        this.currentPage = this.pages.length-1; //set it to the page length
      }

      this.loadPage(this.getCurrentPage()); //load the new page
    }
  },

  /**
  restarts the current page, noAudio disables the facilitator text from playing again
  @method restartPage
  @param {Boolean} [noAudio=false] whether to not replay auto
  @public
  */
  restartPage:function(noAudio)
  {
    if (noAudio === undefined) //if not provided, it is false by default
    {
      noAudio = false;
    }

    this.audioPlay = !noAudio; //set the flag to the attribute to be used in the goto function

    this.gotoPage(this.currentPage); //retart the current page
  },

  /**
  get the index of pages with the passed index as a page number or page name
  @method getPageIndex
  @param {Number|String} pgNum page name or page number
  @public
  */
  getPageIndex:function(pgNum)
  {
    if (typeof pgNum === "string") //if pgNum is a string, it is assume to be a name
    {
      //loop through the pages
      for (var i=0;i<this.pages.length;i++)
      {
        if (this.pages[i].name === pgNum) //if we found the page name
        {
          return i; //return the index
        }
      }

      return -1; //we could not find the page :(
    }
    else
    {
      return pgNum; //return page num
    }
  },

  /**
  get the page with the passed index as a page number or page name
  @method getPage
  @param {Number|String} pgNum page name or page number
  @public
  @return {Page}
  */
  getPage:function(pgNum)
  {
    var index = this.getPageIndex(pgNum);
    return this.pages[index];
  },

  /**
  get the current page
  @method getCurrentPage
  @public
  @return {Page}
  */
  getCurrentPage:function()
  {
    return this.pages[this.currentPage];
  },

  /**
  goto the specific page #
  @method gotoPage
  @param {Number|String} pgNum which pg number to go to
  @public
  */
  gotoPage:function(pgNum)
  {
    this.unloadPage(this.getCurrentPage());

    pgNum = this.getPageIndex(pgNum);

    this.currentPage = pgNum; //set the currentPage to the pgNum
    if (this.currentPage >= this.pages.length-1) //if currentPage is greater than the length,
    {
      this.currentPage = this.pages.length-1; //set the currentPage to the end
    }
    else if (this.currentPage <= 0) //if the currentPage is less than the beginning
    {
      this.currentPage = 0; //set the currentPage to the beginning
    }

    this.loadPage(this.getCurrentPage()); //load the page
  },

  /**
  plays the specific audio file
  @method setVoice
  @param {Number|String} txtId the id of the ted id to play back
  @public
  */
  setVoice:function(txtId)
  {
    if (txtId !== 0 && txtId !== undefined) //if it is not 0 and not undefined
    {
      Audio.stop(); //fixes audio strung together, stopping it, and stringing more audio together
      $(Audio).off(Audio.MEDIA_ENDED+".SET_VOICES");
      Audio.play(this.audioPath+this.audioPrefix+txtId+".mp3"); //play the audio file
    }
  },

  /**
  plays the specific audio files, one after another
  @method setVoices
  @param {Array} txtIds array of text ids (in number or string) to be played back
  @param {Number} [index=0] if no index defined, starts from 0
  @public
  */
  setVoices:function(txtIds,index)
  {
    var that = this;

    if (index === undefined) //if index is undefined, it is assumed to be playing the first
    {
      index = 0;
    }

    if (index < txtIds.length) //if the index is less than what is passed in
    {
      this.setVoice(txtIds[index]); //play the audio file

      $(Audio).one(Audio.MEDIA_ENDED+".SET_VOICES",function(){ //bind the ended event
        that.setVoices(txtIds,++index); //play the next txtId
      });
    }
  },

  /**
  renders the page count (bottom text)
  @method _renderPageCount
  @param {Page} page the page that we are rendering on
  @protected
  */
  _renderPageCount:function(page)
  {
    var group = this.groups[page.group]; //get the group associated with the page

    var length = group.length; //get the group length
    var currentPage = this.currentPage; //get the current page (in case it isn't in a group (which it should be))
    for (var i=0;i<group.length;i++) //for each page in the group
    {
      if (page === group[i]) //if we found the page
      {
        currentPage = i+1; //then the current page is the index+1 (ridding 0)
        break;
      }
    }

    //shows the current page text as 01/10
    var str1 = Utils.pad(currentPage,this._padding);
    var str2 = length; //only pad the current, not the length

    if (this.debug.active)
    {
      this.debug.pageName && this.debug.pageName.text(page.name);
      this.debug.pageSelector && this.debug.pageSelector.text(page.$el.attr('id'));
    }

    //set the texts
    this.$currentPageText.text(str1);
    this.$totalPageText.text(str2);
  },

  /**
  unloads the page
  @method loadPage
  @param {Page} page the page that we are loading
  @protected
  */
  unloadPage:function(page)
  {
    this.lockNextAndPrevious(); //we lock this so that we can't press the button while the page transition is happening

    page.destroy(); //destroy the current page
  },

  /**
  loads the new, current page
  @method loadPage
  @param {Page} page the page that we are loading
  @protected
  */
  loadPage:function(page)
  {
    if (!page)
    {
      throw new TypeError("You may have forgot to pass page into loadPage _super");
    }

    $(Audio).off(Audio.MEDIA_ENDED); //disable the ended event, (in case user goes to next page during a playback of many txtIds)
    Audio.stop(); //stop the current audio file

    page.created(); //call the page's created function

    //if the audioPlay flag is on
    if (this.audioPlay)
    {
      //play the facilitator text
      this.setVoices(page.facilitatorTexts);
    }

    //toggle the audioPlay flag back to true, if it was set to false
    this.audioPlay = true;

    this._renderPageCount(page);

    //unlock the previous page
    this.unlockPrevious();
  },

  /**
  checks to see if the previous button is locked
  @method isPreviousLocked
  @public
  @return {Boolean}
  */
  isPreviousLocked:function()
  {
    return this.$previousButton.hasClass(this.disabledClass);
  },

  /**
  checks to see if the lock button is locked
  @method isNextLocked
  @public
  @return {Boolean}
  */
  isNextLocked:function()
  {
    return this.$nextButton.hasClass(this.disabledClass);
  },

  /**
  locks the previous button
  @method lockPrevious
  @public
  */
  lockPrevious:function()
  {
    this.$previousButton.addClass(this.disabledClass); //locks it
  },

  /**
  locks the next button
  @method lockNext
  @public
  */
  lockNext:function()
  {
    this.$nextButton.addClass(this.disabledClass); //locks it
  },

  /**
  locks both the next and previous button
  @method lockNextAndPrevious
  @public
  */
  lockNextAndPrevious:function()
  {
    this.lockPrevious();
    this.lockNext();
  },

  /**
  unlocks the previous button
  @method unlockPrevious
  @public
  */
  unlockPrevious:function()
  {
    this.$previousButton.removeClass(this.disabledClass); //unlocks the button
  },

  /**
  unlocks the next button
  @method unlockNext
  @public
  */
  unlockNext:function()
  {
    this.$nextButton.removeClass(this.disabledClass); //unlocks the button
  },

  /**
  unlocks both the next and previous button
  @method unlockNextAndPrevious
  @public
  */
  unlockNextAndPrevious:function()
  {
    this.unlockPrevious();
    this.unlockNext();
  },

  /**
  walk the dom, changinging the ids
  @method _tedit
  @protected
  @param {Node} node node that is being manipulated
  */
  _tedit:function(node)
  {
    if ($(node).attr('data-lang') !== undefined) //if data-lang exists
    {
      var text = $(node).attr('data-lang'); //get the id

      if (text !== undefined) //if the id is not undefined
      {
        //do some fancy positioning
        var position = $(node).position();

        var left = position.left;
        var top = position.top;

        //add the span to the current node
        $(node).append('<span class="TEXT_ID" style="line-height: normal !important;padding:0px 3px !important;text-shadow: none !important;font-weight: normal !important;box-shadow:0px 0px 5px #333333 !important;border:1px solid #333333 !important;text-align:center !important;width:auto !important;font-size:14px !important;background-color:#00FF00;color:#000000;position:absolute;left:'+left+'px;top:'+top+'px;opacity:1 !important;filter:alpha(opacity=100) !important;">'+text+'</span>');
      }
    }
  },

  /**
  adds the ted ids to each node with data-lang
  @method tedit
  @public
  */
  tedit:function()
  {
    this.showingTextIds = true; //we are currently showing the ids

    DOM.jWalk(this.el[0],this._tedit);
  },

  /**
  removes the ted ids to the nodes
  @method untedit
  @public
  */
  untedit:function()
  {
    this.showingTextIds = false; //we are no longer showing the ids

    $(".TEXT_ID").remove(); //removes all the TEXT_IDS
  },

  /**
  changes a nodes text id to the specified text id
  @method changeNodeText
  @param {Element|Jquery|String} el the element to inject into
  @param {Number|String} textId the text id to be changed to
  @param {String} [data_page='default'] what page to read from the dictionary
  @param {Boolean} [data_overwrite=false] for TED, whether to get the formatting
  @public
  */
  changeNodeText:function(el,textId,data_page,data_overwrite)
  {
    data_page = data_page === undefined ? 'default' : data_page;
    data_overwrite = data_overwrite === undefined ? false : data_overwrite;

    var text = this.dictionary.getText(this.language,data_page,textId);

    DOM.injectText(el,text,textId,data_page,data_overwrite);
  },

  /**
  switches language and modifies the dom with the new text
  @method switchLanguage
  @param {String} language the new language
  @public
  */
  switchLanguage:function(language)
  {
    var that = this;

    this.language = language;

    if (this.dictionary.checkLangauge(this.language))
    {
      var pgs = this.langObj[this.language];

      //for each pg index
      for (var j in pgs)
      {
        //change all the nodes in the dom that have data-lang with the current language
        DOM.jWalk(this.el[0],function(node){
          DOM.changeDataLang(node,that.dictionary,that.language,j);
        }); //walk the dom
      }
    }
    else
    {
      this.dictionary.addLanguage(this.language); //make the language

      if (this.parser)
      {
        this._parseLanguageFiles(this.parser);
      }
      else
      {
        throw new TypeError('You need to provide a parser to parse the language files with.');
      }
    }
  }
});

//Function from Flash to Javascript
function as_2_js()
{
  try
  {
    var selector = arguments[0]; //get the selector of the arguments
    var cmd = arguments[1]; //get the cmd of the arguments

    var args = [];
    for (var i=2;i<arguments.length;i++) //then anything left over gets pushed on the args to be called
    {
      args.push(arguments[i]);
    }

    return $(selector).triggerHandler(cmd,args); //trigger the object (id, or selector) with cmd and args
  }
  catch (e)
  {
    console.error(e);
  }
}

//Function from Javascript to Flash
function js_2_as()
{
  var selector = arguments[0]; //get the selector of the arguments
  var cmd = arguments[1]; //get the cmd of the arguments

  var args = [];
  for (var i=2;i<arguments.length;i++) //then anything left over gets pushed on the args to be called
  {
    args.push(arguments[i]);
  }

  var swf = document[selector]; //get the swf object
  swf = (swf == null) ? window[selector] : swf; //<= ie8

  swf.js_2_as(cmd,args); //flash needs to addCallback to externals called js_2_as which takes at least one param cmd with optional args
}
