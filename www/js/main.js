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
      el:'#instruction',
      name:"instruction",
      group:"main",
      cornerIcon:"curl",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#a1',
      name:"a1",
      group:"a",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#a2',
      name:"a2",
      group:"a",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({//videoPage
      module:this,
      el:'#a3',
      name:"a3",
      group:"a",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#a4',
      name:"a4",
      group:"a",
      cornerIcon:"curl",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#a5',
      name:"a5",
      group:"a",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#a6',
      name:"a6",
      group:"a",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#a7',
      name:"a7",
      group:"a",
      cornerIcon:"curl",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#a8',
      name:"a8",
      group:"a",
      cornerIcon:"cards",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#a9',
      name:"a9",
      group:"a",
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
      group:"a",
      cornerIcon:"none",
      activitiesList:[
        {
          name:"TripleChartSliderActivity",
          properties:{
            handleSelector:".ui-draggable",
            submitSelector:"#submitBtn",
            labelMax: 15,
            answerList:[13.4, 12.3, 10.3, 6.1],
          },
        }
      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#chart2',
      name:"chart2",
      group:"a",
      cornerIcon:"none",
      activitiesList:[],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b1',
      name:"b1",
      group:"b",
      cornerIcon:"curl",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b2',
      name:"b2",
      group:"b",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b3',
      name:"b3",
      group:"b",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b4',
      name:"b4",
      group:"b",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b5',
      name:"b5",
      group:"b",
      cornerIcon:"curl",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b6',
      name:"b6",
      group:"b",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b7',
      name:"b7",
      group:"b",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b8',
      name:"b8",
      group:"b",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b9',
      name:"b9",
      group:"b",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b10',
      name:"b10",
      group:"b",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#b11',
      name:"b11",
      group:"b",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#c1',
      name:"c1",
      group:"c",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#c2',
      name:"c2",
      group:"c",
      cornerIcon:"cards",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#c3',
      name:"c3",
      group:"c",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#c4',
      name:"c4",
      group:"c",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#d1',
      name:"d1",
      group:"d",
      cornerIcon:"curl",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#d2',
      name:"d2",
      group:"d",
      cornerIcon:"cards",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#d3',
      name:"d3",
      group:"d",
      cornerIcon:"cards",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#d4',
      name:"d4",
      group:"d",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#d5',
      name:"d5",
      group:"d",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#d6',
      name:"d6",
      group:"d",
      cornerIcon:"dialogue",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new TechMapPage({
      module:this,
      el:'#end',
      name:"end",
      group:"conclusion",
      cornerIcon:"none",
      activitiesList:[

      ],
      minutes: 0.001,
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
    $("#cornerIcon img").hide();
    $("#cornerIcon img").delay(500).fadeIn(1000);
    
    
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
            "default":"js/lang0.json"
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




