
var TechMapPage = Page.extend({
  init:function(properties) //constructor
  {     
    this._super(properties);
    this.cornerIcon = properties.cornerIcon;
    this.minutes = properties.minutes;
  },
  destroy: function(){
    console.log("Destroy " , this);
    // stop any videos.
    var videosOnPage = this.$el.find("video")
    if (videosOnPage.length > 0){
      videosOnPage[0].pause();
    }
    this._super();
  }
});