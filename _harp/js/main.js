var TechMap = MapDialogueModule.extend({
  init:function(properties) //constructor
  {
    this.loader = $("#main .loader");

    this._super(properties);
    this.$currentPageText.addClass('hide');
    this.$totalPageText.addClass('hide');
  },
  moduleReady:function()
  {
    var that = this;

    this.loader.hide();

    this.pages = [
    new TechMapPage({
      module:this,
      el:'#first',
      name:"first",
      group:"main",
      cornerIcon:"curl",
      activitiesList:[
      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#second',
      name:"second",
      group:"main",
      cornerIcon:"none",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#third',
      name:"third",
      group:"main",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({//videoPage
      module:this,
      el:'#fourth',
      name:"fourth",
      group:"main",
      cornerIcon:"cards",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#fifth',
      name:"fifth",
      group:"main",
      cornerIcon:"curl",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#chart',
      name:"chart",
      group:"main",
      cornerIcon:"none",
      activitiesList:[
          {
            name:"HorizontalSimpleSliderActivity",
            properties:{
              slider:"#chart .area1",
              handle:".handle",
              level:".level",
              percentage:".percentage",
              startLevel:.2,
              answer:.55,
              range:.05,
              sender:'pastyears-1'
            }
          },

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#end',
      name:"end",
      group:"main",
      cornerIcon:"none",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    })
    ];
    this._super();
  
    $("footer #groupTitle").on("click", function(evt){
      that.toggleChapterMenu();
    });
    $("section.menu div#chapterBackground").on("click", function(evt){
      that.toggleChapterMenu();
    })
    $("section.menu li").on("click", function(evt){
      var group = $(this).data("group");
      that.chapterMenuChoice(group);
    })
    console.log("End module ready.");
  }, // end module Ready.
  loadPage:function(page)
  {
    
    this._super(page);
    // set interface corner icon.
    console.log("Load page " , page);
    $("#cornerIcon img").attr("src", "img/icons/" + page.cornerIcon+".png");
    
    // fade in new pages.
    if (page.name != "start"){
      var pageObj = $("#"+ page.name);
      pageObj.fadeTo(0, 0, function(obj){
        $(this).fadeTo(200, 1);
      });
	   }
    /*
    if (page.group == "start" || page.group == "main"){
      $("footer").hide();
    } else {
      $("footer").show();
    }
    */
    $(".footerTitle").hide();
    $(".footerTitle[data-group='" + page.group +"']").show();
    //
    if (this.currentPage <= 1)
    {
      this.$previousButton.css('visibility','hidden');
    }
    else
    {
      this.$previousButton.css('visibility','visible');
    }

    if (this.currentPage === this.pages.length-1)
    {
      this.$nextButton.css('visibility','hidden');

    }
    else
    {
      this.$nextButton.css('visibility','visible');
    }
  },
  _beginProgress:function(e)
  {
    switch ($(e.target).index()) //get which li is clicked
    {
    case 0:
      this.unlockAndGo(e.data.pageNum); //goes to the specific page and unlocks all the pages before it
      break;
    case 1:
      this.lockAndStay(); //stay on page 1
      break;
    }
  },
  
});

$(window).load(function(){
  $.support.cors = true;

  var margeLoader = new MargeLoader({
    onComplete:function(){
      var myModule = new TechMap({
        DBIName:'Scorm12DBI',
        audioPlayer:"#audioPlayer",
        jPlayerPath:"./swf/Jplayer.swf",
        audioExt: "mp3",
        audioButton:"#audioButton",
        soundOnPath:"img/soundOn.png",
        soundOffPath:"img/soundOff.png",
        muteDefault:$_GET['mute'] === undefined ? false : String.toBool($_GET['mute']),
        parser:NedJSONParser,
        defaultLanguage:"en",
        language:{
          en:{
            "default":"https://ned-production.herokuapp.com/api/project/57bb84d05cbb3e1600b08110/export/json/en/"
          }
        },
        helpButton:"#help",
        helpContainer:"#helpContainer",
        progressContainer:"#progressContainer",
        nextButton:"#nextButton",
        previousButton:"#previousButton",
        facilitatorText:"#bottomText",
        titleText:"#titleSection",
        currentPageText:"#currentPage",
        totalPageText:"#totalPages",
        audioPath:'../audio/',
        audioPrefix:'',
        disabledClass:'disabled',
        showPageClass:'show',
        hidePageClass:'hide',
        debug:{
          active:$_GET['debug'] === undefined ? false : String.toBool($_GET['debug']),
          pageSelector:"#pageSelector"
        },
        lmsPrefill:true
      });
    }
  });
});




