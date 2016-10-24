var MargeLoader = Class.extend({
  init:function(properties)
  {
    this.el = properties.el ? $(properties.el) : $(document);
    this.attr = properties.attr ? properties.attr : "[data-marge-url]";
    this.onComplete = properties.onComplete;
    
    var that = this;
    
    var count = 0;
    var $margeUrls = this.el.find(this.attr);
    var length = $margeUrls.length;
    
    if (length === 0)
    {
      this.complete();
    }
    else
    {
      $margeUrls.each(function(){
        var $url = $(this);

        $url.load($url.attr('data-marge-url'),function(){
          count ++;
          if (count >= length)
          {
            that.complete();
          }
        });
      });
    }
  },
  complete:function()
  {
    this.onComplete();
  }
});