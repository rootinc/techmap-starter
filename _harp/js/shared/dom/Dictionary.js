/**
Used to store languages
@class Dictionary
@extends Class
@author Dan Jewett
@version 1.0
@constructor
*/
var Dictionary = Class.extend({
  init:function()
  {
    /**
    Internal property for storing the languages
    @property storage
    @type Object
    @protected
    */
    this.storage = {};
  },
  
  /**
  Add a language to the dictionary
  @method addLanguage
  @param {String} lang the language to add
  @public
  */
  addLanguage:function(lang)
  {
    this.storage[lang] = {};
  },
  
  /**
  returns true if a language exists in the dictionary
  @method checkLangauge
  @param {String} lang the language to check
  @public
  @return {Boolean}
  */
  checkLangauge:function(lang)
  {
    return this.storage[lang] !== undefined;
  },
  
  /**
  Add a page to the language to the dictionary
  @method addPage
  @param {String} lang the language to index
  @param {String} page the page to add
  @public
  */
  addPage:function(lang,page)
  {
    this.storage[lang][page] = {};
  },
  
  /**
  Add a language to the dictionary
  @method addTextId
  @param {String} lang the language index
  @param {String} page the page index
  @param {String} id the id to index
  @param {String} text the text to add
  @public
  */
  addTextId:function(lang,page,id,text)
  {
    this.storage[lang][page][id] = text;
  },
  
  /**
  Add a language to the dictionary
  @method getText
  @param {String} lang the language
  @param {String} page the page
  @param {String} id the id
  @public
  @return {String} the text in the dictionary
  */
  getText:function(lang,page,id)
  {
    return this.storage[lang][page][id];
  }
});