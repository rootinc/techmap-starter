/*

*/
var MapDialogueModule = Module.extend({
  init:function(properties) //constructor
  {
    this._super(properties);
  },

  
  loadPage: function(page){
    this._super(page);
    // 
    var pa = page.pageCountInGroup;
    var pb = this.groups[page.group].pages.length;
    this.setGroupPageNum(pa, pb);
    //
    if (page.group != this.activeGroup){
      var $cn = $("footer #chapterNames p[data-group=" + page.group+"]")
      var cn = $cn.text();
      this.setGroupName(cn);
      this.activeGroup = page.group;
      this.startTimer(page);
    }
  },
  
  startTimer: function(page){
    var maxTime = this.groups[page.group].spentTime;
    console.log("Max time " , maxTime);
    console.log(this)
    this.chapterTime = new Date(Number(new Date()) + maxTime);
    clearInterval(this.clock);
    var that = this;
    this.clock = setInterval(function(){that.rollTimer(that)}, 80);
  },
  
  rollTimer: function(mod){
    var diff = this.chapterTime - (new Date());
    this.groups[this.activeGroup].spentTime = diff;
    diff = diff / 1000;    
    var m = Math.floor (diff / 60);
    var s = Math.floor (diff % 60);
    m = String(Math.max(0, m));
    s = String(Math.max (0, s));
    s = s.length < 2 ? "0" + s : s;
    $("footer #timeText p").text(m+":"+ s);
  },
  
  setGroupPageNum: function (a, b){
    $("footer #pageText p").text(a + " / " + b);
  },
  setGroupName: function(str){
    $("footer #groupText p").text(str);
  },
  
  /**
  override and extend!
  
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
        this.groups[group] = {
          pages:[],
          maxTime: 0,
          spentTime: 0
        };
      }

      this.groups[group].pages.push(page); //push that page on the group
      var pageDuration = page.minutes ? page.minutes : 3;
      this.groups[group].maxTime += pageDuration;
      this.groups[group].spentTime = this.groups[group].maxTime * 60 * 1000;
      page.pageCountInGroup = this.groups[group].pages.length;
    }
  },
  
  toggleChapterMenu:function(forceSetting){
    var $menu = $("section.menu")
    if (forceSetting === "true" || $menu.hasClass("hide")) {
      $menu.removeClass("hide").addClass("show");
      var lis = $menu.find("li");
      var del = 0;
      $menu.css("opacity", 0).fadeTo(500, 1, function(){console.log("Menu")});
      lis.each(function(n, el){
        var $obj = $(el);
        console.log("Top " , $obj.position())
        $obj.css("opacity", 0).delay(del * 60).fadeTo(0.5, 1, function(){});
        //animate({opacity:1,top:oldTop, y:n*-20}, 1, function(){console.log("Anim done")})
        del += 0.3;
      })
      $menu.find("#chapterBackground").css("opacity", 0).fadeTo(1, 1);
    } else{
      $menu.removeClass("show").addClass("hide");
    }
  }, 
  chapterMenuChoice:function(groupName){
    var page = this.groups[groupName].pages[0];
    var pgName = page.name;
    this.gotoPage(pgName);
    this.toggleChapterMenu(false);
  }
});