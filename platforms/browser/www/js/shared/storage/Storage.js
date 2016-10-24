/**
Storage - generic storage object that wraps around localstorage
@class Storage
@extends Class
@author Dan Jewett
@version 1.0
@constructor
*/
var Storage = Class.extend({
  init:function(properties)
  {
    /**
    Internal property for storing the languages
    @property data
    @type Object
    @protected
    */
    this.data = window['localStorage'] || window['sessionStorage'] || {};
    
    /**
    Internal property for namespacing the keys
    @property namespace
    @type String
    @protected
    */
    this.namespace = properties.namespace || location.pathname;
    
    this.namespace = this.namespace.substr(-1,1) === "/" ? this.namespace : this.namespace + "/";
  },
  
  /**
  Get a value from the storage
  @method getData
  @public
  @param {String} key the key to get
  @return {String} a string to return
  */
  getData:function(key)
  {
    return this.data[this.namespace+key] !== undefined ? this.data[this.namespace+key] : "";
  },
  
  /**
  Set a value to the storage
  @method setData
  @public
  @param {String} key the key to set
  @param {String} value the value to set with the key
  */
  setData:function(key,value)
  {
    this.data[this.namespace+key] = value;
  }
});