//SIM Activity - simulations from flash repurposed for html (NEEDS LITTLE MORE REFACTORING)
/*
* @author Dan Jewett
* @version 1.0
*/
var SIMActivity = Activity.extend({
  init:function(properties){ //constructor
    this._super(properties);
    
    this.simTextXML = properties.textXML; //text xml object
    this.simTreeXML = properties.treeXML; //tee xml object
    
    this.simReady = false; //when the sim has parsed and constructed
    
    this.current = null; //what node we are currently on in the tree
    
    this.simIDs = {}; //all the ids of the texts or html

    this.simTree = {}; //tree object from xml.  Contains the linked list
    
    this.bubbleTime = properties.bubbleTime; //how long to fade in and out the chat bubble
    
    this.simPrefix = properties.simPrefix; //set the jquery prefix
    
    this.slideTime = properties.slideTime; //slide time
    this.oneAtATime = properties.onAtATime; //displaying the options one at a time
    
    this.pathToAudio = properties.pathToAudio; //path to the audio files
    this.pathToMod = properties.pathToMod; //path to the module images
    this.pathToActors = properties.pathToActors; //path to the actors images
    
    this.extraId = "";
    
    this.actors = {}; //actors object, in this format:
    //actorName:{
    //  path:'',
    //  emotions:{
    //      'emotion1':[
    //          'image1.png',
    //          'image2.png'
    //      ],
    //      'emotion2':[
    //          'image1.png'
    //      ]
    //  },
    //  emotionsIndex:{
    //      'emotion1':0,
    //      'emotion2':0
    //  }
    //}
    
    this.feedback = []; //feedback array from user taking sim
    this.score = 0; //score from the user taking sim
    
    this.timeout_nextNode = [];
    this.timeout_loadImage = [];
    this.timeout_reactionCase = [];

    SimTextXMLParser.parse(this.simTextXML,[this.simIDs],[this,this.afterTextParse]); //parse the text
  },
  created:function()
  {
    this._super();
    
    this.score = 0;
    this.feedback = [];
  },
  afterTextParse:function() //called after the sim text is parsed
  {
    SimXMLParser.parse(this.simTreeXML,[],[this,this.afterSimParse]); //parse the tree
  },
  afterSimParse:function(sim) //called after the sim tree is parsed
  {
    this.constructSim(sim,this.simTree,sim[0]); //takes the simTree object and links it up
  },
  preloadImages:function() //preloads and caches the images for a seamless transition of animations
  {
    var preload = [];

    for (var i in this.actors) //for each after
    {
      for (var j in this.actors[i].emotions) //for each emotion
      {
        for (var k=0;k<this.actors[i].emotions[j].length;k++) //for each image in emotion
        {
          preload.push(this.actors[i].path+j+'/'+this.actors[i].emotions[j][k]); //make the paths to the images
        }
      }
    }

    $(preload).preloadImages(); //call the jquery util
  },
  playAudio:function(path,filename) //plays an audio file
  {
    Audio.play(path,filename);
  },
  loadImage:function(actor,emo,forceDelay) //loads an image into the actor
  {
    var that = this; //hack this
    
    if (forceDelay == undefined) //if no delay specified
    {
      forceDelay = false; //it is false
    }
    
    if (this.actors[actor]) //if the actor exists
    {            
      var path = this.actors[actor].path; //get the actors path

      var emotions = this.actors[actor].emotions[emo]; //get the actors emotion images
      var emotionsIndex = this.actors[actor].emotionsIndex[emo]; //get the actors emotion index (for cycling)

      path += emo+'/'+emotions[emotionsIndex]; //construct the path

      this.actors[actor].emotionsIndex[emo]++; //increment the index
      if (this.actors[actor].emotionsIndex[emo] >= emotions.length) //if index is greater than length
      {
        this.actors[actor].emotionsIndex[emo] = 0; //it is now 0
      }

      if (forceDelay) //if there is a delay
      {                
        var id = setTimeout(function(){
          $(that.simPrefix+"actor_"+actor).css('background-image','url("'+path+'")'); //load image after bubbletime
          that.timeout_loadImage.shift();
        },this.bubbleTime);
        
        this.timeout_loadImage.push(id);
      }
      else
      {
        $(this.simPrefix+"actor_"+actor).css('background-image','url("'+path+'")'); //load iamge
      }
    }
  },
  constructSim:function(sim,tree,node) //takes an sim xml object and constructs the linked list tree
  {
    if (node == undefined)
    {
      return;
    }

    tree[node.id] = node; //link it up

    switch (node.type)
    {
    case 'scene':
    case 'reaction':
    case 'option':
    case 'feedback':
      this.constructSim(sim,tree[node.id],sim[node.nextNode]); //recurse some more!
      break;

    case 'optionSet':
      for (var i=0;i<node.options.length;i++) //for each option
      {
        this.constructSim(sim,tree[node.id],sim[node.options[i].next]); //recurse some more!
      }
      break;
    }
  },
  bootSim:function() //extend in another class
  {
    /*
        $(this.simPrefix+"actor_bg").show(); //hide actor simbg
        $(this.simPrefix+"actor_coaching").hide(); //show the coaching actor
        
        this.loadImage('bg','neutral'); //load actor bg with the neutral emotion
        this.loadImage('customer','neutral'); //load actor customer with the neutral emotion

        $(this.simPrefix+"actor_customer").show().animate({left:'0px'},1000); //show the actor and push the actor from left to right
        $(this.simPrefix+"right").delay(1000).fadeIn(1000); //fade in the right box
        
        $(this.simPrefix+"continue").hide();
        */
  }, 
  shutdownSim:function() //extend in another class
  { 
    /*
        $(this.simPrefix+"actor_bg").hide(); //hide actor simbg
        $(this.simPrefix+"actor_coaching").show(); //show the coaching actor
        
        $(this.simPrefix+"feedback").empty();

        for (var i=0;i<this.feedback.length;i++) //for each feeback
        {
            $(this.simPrefix+"feedback").append(this.feedback[i].html); //append the html to the feedback container
        }
        
        $(this.simPrefix+"tips").empty().append(this.simIDs[ this.extraId ]);

        $(this.simPrefix+"score").text(((this.score/5)*100)+"%"); //show the text
        */
  }, 
  runSim:function(node) //basic runSim method.  May change based on needs in an extended class
  {
    if (node == undefined) //if the node is not passed, it is assumed to be the first time,
    {
      node = this.simTree[0]; //so get the first element of the simTree
    }
    
    this.current = node; //current is equal to current node

    if (node.actor != undefined) //if actor is in the node
    {
      this.actorFunc(node); //call the simplier actor func

      switch (node.type)
      {
      case 'reaction':
        this.reactionCase(node); //call the simplier reacion case
        break;
      case 'feedback':
        this.feedbackCase(node); //call the simplier feedback case
        break;
      }
    }

    if (node.nextNode != undefined) //if next node is in the node
    {
      this.nextNode(node); //call the simplier next node
    }
    else if (node.type == "optionSet") //else if type is in the node
    {
      this.optionSet(node); //call the simplier option set
    }
  },
  actorFunc:function(node) //basic actor func
  {
    if (node.emo != undefined) //if node has an emo
    {
      this.loadImage(node.actor,node.emo,true); //load the new image for the actor
    }
  },
  reactionCase:function(node) //basic reaction case
  {
    if (node.textId != undefined && node.textId != 0) //if node has a textId and the textId is not 0
    {
      this.playAudio(this.pathToAudio,node.textId); //play the audio

      $(this.simPrefix+"response_"+node.actor).empty().append(this.simIDs[ node.textId ]).attr('data-lang', node.textId).show(); //make the actor talk
    }
  },
  /*
    reactionCase:function(node) //extending reaction case
    {
        var that = this; //hack this
        
        var ids=node.textId.split("."); //usually everything should be in ids[0], but the last case has ids[1] too

        if (ids[0] != undefined && ids[0] != 0) //if node has a textId and the textId is not 0
        {
            if (ids.length == 1) //get around the undefined audio playing at the end
            {
                this.playAudio(this.pathToAudio,"usada_nikki"+ids[0]); //play the audio file
            }

            if ($(this.simPrefix+"response_"+node.actor).is(':visible')) //if the text is already showing
            {
                //fade it out
                $(this.simPrefix+"response_"+node.actor).fadeOut(this.bubbleTime,function(){
                    $(this).attr('data-lang', ids[0]).empty().append( that.simIDs[ ids[0] ] ).fadeIn(that.bubbleTime); //then fade the text in
                })
            }
            else
            {
                var id = setTimeout(function(){
                    $(that.simPrefix+"response_"+node.actor).attr('data-lang', ids[0]).empty().append( that.simIDs[ ids[0] ] ).fadeIn(that.bubbleTime); //then show the text
                    that.timeout_reactionCase.shift();
                },this.bubbleTime);
                
                this.timeout_reactionCase.push(id);
            }
        }
        
        if (ids[1] != undefined && ids[1] != 0)
        {
            this.extraId = ids[1];
            
            $(this.simPrefix+"final_pic").attr('src',this.actors.customer.path+'/end/end'+ids[0]+'.png');
        }
    },
    */
  feedbackCase:function(node) //basic feedback case
  {        
    //push onto the feedback array a textid, text, html and actor
    this.feedback.push({
      textid:node.textId,
      text: $(this.simIDs[ node.textId ]).text(),
      html:this.simIDs[ node.textId ],
      actor:node.actor
    });
  },
  nextNode:function(node) //basic next node
  {
    var that = this; //hack this
    
    if (node.nextNode == 'end') //if the next node is the last one
    {
      if (node.emo == 'setDone')
      {
        this.activityComplete();
      }
      
      $(this.simPrefix+"continue").show();
      
      $(this.simPrefix+"continue").addClass('pointer').one('click',function(){
        $(this).removeClass('pointer');
        that.shutdownSim(); //shut 'er down
      });
    }

    if (node.duration == 0 || node.duration == undefined) //if the next nodes duraction is 0 or undefined
    {
      this.runSim(node[node.nextNode]); //run the next node
    }
    else
    {
      var id = setTimeout(function(){
        that.runSim(node[node.nextNode]); //run the next node of a dealy of duration
        that.timeout_nextNode.shift();
      },node.duration*1000);
      
      this.timeout_nextNode.push(id);
    }
  },
  optionSet:function(node) //basic option set
  {
    var that = this; //hack this
    
    $(this.simPrefix+"options li").remove(); //remove all the options

    for (var i=0;i<node.options.length;i++) //for each option
    {
      var txtId = node[node.options[i].next].textId;
      
      $(this.simPrefix+"options").append('<li id="'+this.simPrefix.substr(1)+'option'+i+'" data-lang="'+txtId+'">'+$(this.simIDs[ txtId ]).text()+'</li>'); //append an li option
      $(this.simPrefix+"option"+i).addClass('pointer').one('click',function(){ //when clicked
        $(this).removeClass('pointer');
        
        var i = $(this).attr('id').substring(that.simPrefix.length+5); //get the index

        that.score += parseFloat(node.options[i].score); //add the score

        that.runSim(node[node.options[i].next]); //run the next node that the user clicked on
      });
    }
  },
  /*
    optionSet:function(node) //extending option set
    {
        var that = this; //hack this
        
        $(this.simPrefix+"options li").remove(); //remove all the previous options
        
        for (var i=0;i<node.options.length;i++) //for each new option
        {
            var txtId = node[node.options[i].next].textId;
            
            $(this.simPrefix+"options").append('<li id="'+this.simPrefix.substr(1)+'option'+i+'" data-lang="'+txtId+'"/>'); //append a new option
            $(this.simPrefix+"option"+i).append(this.simIDs[ txtId ]);
            
            $(this.simPrefix+"option"+i).addClass('pointer').one('click',function(){ //when clicked
                var i = $(this).attr('id').substring(that.simPrefix.length+5); //get the index
                
                $(this).removeClass('pointer');

                that.score += parseFloat(node.options[i].score); //add the new score

                //fancy animation
                $(that.simPrefix+"options li").each(function(){ //for each option
                    if ($(this).attr('id').substring(that.simPrefix.length+5) != i) //if the option is not i
                    {
                        $(this).slideToggle(that.slideTime,function(){ //slide it
                            $(this).remove(); //remove it when it is done sliding
                        });
                    }
                });

                that.runSim(node[node.options[i].next]); //run the next node
            });
        }

        $(this.simPrefix+"options li").hide(); //hide the options

        //show each li one at a time
        $(this.simPrefix+"options li").each(function(index){
            $(this).delay((index+1)*that.oneAtATime).fadeIn(that.oneAtATime);
        });
    },*/
  resetEmotions:function() //sets all the emotions back to 0
  {
    for (var i in this.actors.customer.emotionsIndex) //for each actors emotion
    {
      this.actors.customer.emotionsIndex[i] = 0; //set it to 0
    }
  },
  destroy:function() //called when the page is destroyed
  {
    this._super(); //call parent function
    
    //clear all the timeouts
    while (this.timeout_nextNode.length > 0)
    {
      clearTimeout(this.timeout_nextNode.shift());
    }
    while (this.timeout_loadImage.length > 0)
    {
      clearTimeout(this.timeout_loadImage.shift());
    }
    while (this.timeout_reactionCase.length > 0)
    {
      clearTimeout(this.timeout_reactionCase.shift());
    }
    
    $(this.simPrefix+"options").removeClass(this.module.pointerClass).off('click'); //remove the pointerClass and click event
    
    $(this.simPrefix+"continue").off('click');
  }
});