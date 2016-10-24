var Interaction = Class.extend({
  init:function(properties)
  {
    this.$el = $(properties.el);
    
    this.events = properties.events;
    
    for(var key in this.events)
    {
      this.on(key, this.events[key]);
    }
  },
  enable:function()
  {
    //extend it yourself
  },
  disable:function()
  {
    //extend it yourself
  },
  delete:function()
  {
    for(var key in this.events)
    {
      this.off(key);
    }
  },
  on:function(event, func)
  {
    this.$el.on(event, func);
  },
  off:function(event)
  {
    this.$el.off(event);
  }
});
