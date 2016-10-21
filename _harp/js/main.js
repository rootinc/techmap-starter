var TechMap = Module.extend({
  init:function(properties) //constructor
  {
    this.loader = $("#main .loader");

    this._super(properties);
  },
  moduleReady:function()
  {
    var that = this;

    this.loader.hide();

    this.pages = [
    new Page({//startPage
      module:this,
      el:'#first',
      name:"first",
      group:"intro",
      activitiesList:[
        {
          name:"StartActivity",
          properties:{
            button:"#startButton"
          }
        }
      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new Page({//clickRevealPage
      module:this,
      el:'#second',
      name:"second",
      group:"main",
      activitiesList:[

      ],
      facilitatorTexts:[40],
      titleTexts:[0]
    }),
    new Page({//accordionPage
      module:this,
      el:'#third',
      name:"third",
      group:"main",
      activitiesList:[
        {
          name:"AccordionActivity",
          properties:{
            clicks:[
              "#accordionPage .accordion h3:nth-child(1)",
              "#accordionPage .accordion h3:nth-child(3)",
              "#accordionPage .accordion h3:nth-child(5)",
              "#accordionPage .accordion h3:nth-child(7)",
              "#accordionPage .accordion h3:nth-child(9)"
            ],
            reveals:[
              "#accordionPage .accordion div:nth-child(2)",
              "#accordionPage .accordion div:nth-child(4)",
              "#accordionPage .accordion div:nth-child(6)",
              "#accordionPage .accordion div:nth-child(8)",
              "#accordionPage .accordion div:nth-child(10)"
            ]
          }
        }
      ],
      facilitatorTexts:[41],
      titleTexts:[0]
    }),
    new Page({//videoPage
      module:this,
      el:'#fourth',
      name:"fourth",
      group:"main",
      activitiesList:[

      ],
      facilitatorTexts:[0],
      titleTexts:[0]
    }),
    new Page({
      module:this,
      el:'#fifth',
      name:"fifth",
      group:"main",
      activitiesList:[

      ],
      facilitatorTexts:[43],
      titleTexts:[0]
    })
    ];

    this._super();
  },
  loadPage:function(page)
  {
    this._super(page);

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

      this.setLocation();
      this.setTime();
      this.setStatus("completed");
      this.setScore(100);
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
  }
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
            "default":"https://ned.rootinc.tools/api/project/57bb84d05cbb3e1600b08110/export/json/en/"
          }
        },
        helpButton:"#help",
        helpContainer:"#helpContainer",
        progressContainer:"#progressContainer",
        nextButton:"",
        previousButton:"",
        facilitatorText:"#bottomText",
        titleText:"#titleSection",
        currentPageText:"#progessCounter .current",
        totalPageText:"#progessCounter .total",
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
