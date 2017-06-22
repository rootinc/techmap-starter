/**
A refactored quiz to account for different interactions per question.
Some of the parameters that are not passed globally must be passed per question.  Others are optional
TODO - don't use indexes for answers
@class Quiz2Activity
@extends Activity
@author Dan Jewett and Alex Strand
@version 0.1
@constructor
@param {Object} properties properties that the activity uses
@param {String} [properties.selectedClass="selected"] css class that 'selects' the choice
@param {Object} [properties.choices=""] object hash representing the interactions of a question
@param {String} [properties.correctResponse] container representing the correct response
@param {String} [properties.incorrectResponse] container representing the incorrect response
@param {String} [properties.tryAgainResponse] container representing the try again response
@param {String} [properties.nextButton] button used to move on to the next question
@param {String} [properties.submitButton] button used to submit a question
@param {String} [properties.interactionType] string used to represent what question type it is
@param {Array} [properties.qaList] list of questions in a certain format
@param {Number} [properties.passPercentage=0] percentage to get right to "pass" the quiz
@param {Number} [properties.attemptMax=1] number of times to attempt a question
*/
var Quiz2Activity = Activity.extend({
  init:function(properties)
  {
    this._super(properties);

    /**
    css class that 'selects' the choice
    @property selectedClass
    @type String
    @protected
    */
    this.selectedClass = properties.selectedClass || "selected";
    
    /**
    object hash representing the interactions of a question
    @property choices
    @type Object
    @protected
    */
    this.choices = properties.choices || undefined;
    
    /**
    container representing the correct response
    @property correctResponse
    @type String
    @protected
    */
    this.correctResponse = properties.correctResponse || undefined;
    
    /**
    container representing the incorrect response
    @property incorrectResponse
    @type String
    @protected
    */
    this.incorrectResponse = properties.incorrectResponse || undefined;
    
    /**
    container representing the try again response
    @property tryAgainResponse
    @type String
    @protected
    */
    this.tryAgainResponse = properties.tryAgainResponse || undefined;
    
    /**
    button used to move on to the next question
    @property nextButton
    @type String
    @protected
    */
    this.nextButton = properties.nextButton || undefined;
    
    /**
    button used to submit a question
    @property submitButton
    @type String
    @protected
    */
    this.submitButton = properties.submitButton || undefined;
    
    /**
    string used to represent what question type it is
    @property interactionType
    @type String
    @protected
    */
    this.interactionType = properties.interactionType || undefined;

    /**
    list of questions in a this format (? are optional):
    [
      {
        question:"selector", //this question is the container
        text:"selector",
        answer:index || array of indexes,
        ?choices:{
          //example click interaction 
          clicks:"selector",
          //example drag interaction
          drags:"selector",
          drops:"selector"
        },
        ?nextButton:"selector",
        ?submitButton:"selector",
        ?quizResults:"selector",
        ?tryAgainButton:"selector",
        ?correctResponse:"selector",
        ?incorrectResponse:"selector",
        ?tryAgainResponse:"selector",
        ?interactionType:"string"
      },
      ...
    ]
    @property qaList
    @type Array
    @protected
    */
    this.qaList = properties.qaList;

    /**
    percentage to get right to "pass" the quiz
    @property passPercentage
    @type String
    @protected
    */
    this.passPercentage = properties.passPercentage || 0;
    
    /**
    what question we are on
    @property questionIndex
    @type Number
    @protected
    */
    this.questionIndex = 0;

    /**
    how many questions that we've got correct
    @property correctCount
    @type Number
    @protected
    */
    this.correctCount = 0;

    /**
    how many times a question has been attempted
    @property attemptIndex
    @type Number
    @protected
    */
    this.attemptIndex = 0;
    
    /**
    number of times to attempt a question
    @property attemptMax
    @type Number
    @protected
    */
    this.attemptMax = properties.attemptMax || 1;

    /**
    The current interaction of the quiz
    @property currentInteraction
    @type Interaction
    @protected
    */
    this.currentInteraction = null;

    this.createAnswers(); //create the answers
  },
  
  /**
  first function called when activity is created
  @event created
  @protected
  @override
  */
  created:function()
  {
    this._super();

    //start the quiz
    this.start();
  },
  
  /**
  starts or resets the quiz
  @method start
  @protected
  */
  start:function()
  {
    //reset question, attempt and correct counts/indexes
    this.questionIndex = 0;
    this.attemptIndex = 0;
    this.correctCount = 0;

    //hide all the questions and responses
    this.hideQuestions();
    this.hideAllResponses();

    //hide the next and submit buttons
    this.hideNextButton();
    this.hideSubmitButton();

    //bind and show current questions
    this.showCurrentQuestion();
    this.bindCurrentQuestion();
  },

  /**
  helper function to get objects of a question this stops us from writing the same code over and over with different variables therefore making debugging easier(less variables to keep tracck of)
  @method _getQuestionObject
  @param {String} key what key we are trying to get out
  @param {Number} index which question (if indexed not passed, assume the current questino)
  @protected
  */
  _getQuestionObject:function(key, index)
  {
    //get the obj
    var qa = this.qaList[index === undefined ? this.questionIndex : index];

    //if no key, return the whole obj
    if(!key)
    {
      return qa;
    }
    else //else return the key of that obj
    {
      return qa[key];
    }
  },
  
  /**
  modifys the dom and injects correct answers
  @method createAnswers
  @protected
  */
  createAnswers:function()
  {
    //dynamically set up answers
    //for each question
    for (var i=0;i<this.qaList.length;i++)
    {
      var answers = this.getAnswers(i); //get the answers of the question

      var interactionType = this.getInteractionType(i); //get the interaction type of the question

      switch (interactionType)
      {
        case "click":
          var $clicks = this.getClicks(i); //get the clicks

          //an answers of array type for click type question means you can select more than one choice
          if (answers instanceof Array)
          {
            //basically set the data-correct if the index is in the array
            $clicks.filter(function(index){
              return answers.indexOf(index) > -1;
            }).attr('data-correct','');
          }
          else
          {
            //basically set the data-correct to be the correct index
            $clicks.filter(function(index){
              return index === answers;
            }).attr('data-correct','');
          }

          break;

        case "drag":
          var obj = this.getDragsAndDrops(i); //get the drag and drops

          //for each drag
          obj.$drags.each(function(index,el){
            var $el = $(el);
            $el.attr('data-correct',answers[index]); //set the correct index to what it should be
          });

          break;

        default:
          throw new Error(interactionType + " is not supported");

          break;
      }
    }
  },
  
  /**
  hides every question
  @method hideQuestions
  @protected
  */
  hideQuestions:function()
  {
    //for each question
    for (var i=0;i<this.qaList.length;i++)
    {
      var $question = $(this._getQuestionObject("question", i)); //get the question container
      $question.hide(); //hide it
    }
  },
  
  /**
  hides all the responses
  @method hideAllResponses
  @protected
  */
  hideAllResponses:function()
  {
    //for each question
    for (var i=0;i<this.qaList.length;i++)
    {
      var $correctResponse = $(this._getQuestionObject("correctResponse",i) || this.correctResponse); //get correct response
      var $incorrectResponse = $(this._getQuestionObject("incorrectResponse",i) || this.incorrectResponse); //get incorrect response
      var $tryAgainResponse = $(this._getQuestionObject("tryAgainResponse",i) || this.tryAgainResponse); //get try again response

      //hide them all
      $correctResponse.hide();
      $incorrectResponse.hide();
      $tryAgainResponse.hide();
    }
  },
  
  /**
  hides current questions' responses
  @method hideCurrentResponses
  @protected
  */
  hideCurrentResponses:function()
  {
    this.hideCorrectResponse();
    this.hideIncorrectResponse();
    this.hideTryAgainResponse();
  },
  
  /**
  shows the current question
  @method showCurrentQuestion
  @protected
  */
  showCurrentQuestion:function()
  {
    var $currentQuestion = $(this._getQuestionObject("question"));
    $currentQuestion.show();
  },
  
  /**
  hides the current question
  @method hideCurrentQuestion
  @protected
  */
  hideCurrentQuestion:function()
  {
    var $currentQuestion = $(this._getQuestionObject("question"));
    $currentQuestion.hide();
  },
  
  /**
  gets the answers of a question
  @method getAnswers
  @param {Number} index question index to pull from
  @protected
  @return {Number|Array}
  */
  getAnswers:function(index)
  {
    var answers = this._getQuestionObject("answers",index); //get answers
    if (answers === undefined) //throw error if we don't have answers
    {
      throw new Error("Answers must be defined as an integer or array of integers");
    }

    return answers;
  },
  
  /**
  gets the interaction type of a question
  @method getInteractionType
  @param {Number} index question index to pull from
  @protected
  @return {Number|Array}
  */
  getInteractionType:function(index)
  {
    var interactionType = this._getQuestionObject("interactionType",index) || this.interactionType; //get interaction type
    if(!interactionType) //throw error if we don't have an interactino type
    {
      throw new Error("You must supply an interaction type for each question");
    }

    return interactionType;
  },
  
  /**
  for interaction type clicks, get the clicks
  @method getClicks
  @param {Number} index question index to pull from
  @protected
  @return {jQuery}
  */
  getClicks:function(index)
  {
    var choices = this._getQuestionObject("choices",index) || this.choices; //get the choices
    if (!choices) //throw error if choices not defined
    {
      throw new Error("Choices is not defined for this question.  This needs to be defined in the question or global instance.");
    }

    var $clicks = $(choices.clicks);
    if ($clicks.length === 0) //if no choices in the selector, throw an error
    {
      throw new Error("Choices selector for clicks return nothing.  Make sure the selector is correct.");
    }

    return $clicks;
  },
  
  /**
  for interaction type drags, get the drags
  @method getDragsAndDrops
  @param {Number} index question index to pull from
  @protected
  @return {Object}
  */
  getDragsAndDrops:function(index)
  {
    var choices = this._getQuestionObject("choices",index) || this.choices; //get the choices
    if (!choices) //throw error if choices not defined
    {
      throw new Error("Choices is not defined for this question.  This needs to be defined in the question or global instance.");
    }

    var $drags = $(choices.drags);
    if ($drags.length === 0) //if no choices in the selector, throw an error
    {
      throw new Error("Choices selector for drags return nothing.  Make sure the selector is correct.");
    }

    var $drops = $(choices.drops);
    if ($drops.length === 0) //if no choices in the selector, throw an error
    {
      throw new Error("Choices selector for drops return nothing.  Make sure the selector is correct.");
    }

    return {
      $drags:$drags,
      $drops:$drops
    };
  },
  
  /**
  sets up the interactions based on the interaction type
  @method bindCurrentQuestion
  @protected
  */
  bindCurrentQuestion:function()
  {
    var interactionType = this.getInteractionType(); //we bind the question based on the interaction type

    switch (interactionType)
    {
      case "click":
        this.createClickInteraction(this.getClicks()); //if question is click interaction type, create clicks

        break;

      case "drag":
        var obj = this.getDragsAndDrops();

        this.createDragInteraction(obj.$drags,obj.$drops); //if question is drag interaction type, create drags

        break;

      default:
        throw new Error(interactionType + " is not supported");

        break;
    }

    //bind the submit and next buttons as well
    this.bindSubmitButton();
    this.bindNextButton();
  },
  
  /**
  sets up click event for the submit button
  @method bindSubmitButton
  @protected
  */
  bindSubmitButton:function()
  {
    var that = this;

    var $submitButton = $(this._getQuestionObject("submitButton") || this.submitButton); //get the submit button
    if ($submitButton.length > 0) //since submit button is optional, if we have it
    {
      //then bind the event to it
      $submitButton.one("click", function(e){
        that.startFlow(e, $submitButton, 1);
      });
    }
  },
  
  /**
  removes the click event for the submit button
  @method bindSubmitButton
  @protected
  */
  unbindSubmitButton:function()
  {
    var $submitButton = $(this._getQuestionObject("submitButton") || this.submitButton); //get the submit button
    if ($submitButton.length > 0) //since submit button is optional, if we have it
    {
      //then remove the event to it
      $submitButton.off("click");
    }
  },
  
  /**
  sets up click event for the next button
  @method bindNextButton
  @protected
  */
  bindNextButton:function()
  {
    var that = this;

    var $nextButton = $(this._getQuestionObject("nextButton") || this.nextButton); //get the next button
    if ($nextButton.length > 0) //since next button is optional, if we have it
    {
      //then bind the event to it
      $nextButton.one("click", function(e){
        that.startFlow(e, $nextButton, 0);
      });
    }
  },
  
  /**
  removes the click event for the next button
  @method unbindNextButton
  @protected
  */
  unbindNextButton:function()
  {
    var $nextButton = $(this._getQuestionObject("nextButton") || this.nextButton); //get the next button
    if ($nextButton.length > 0) //since next button is optional, if we have it
    {
      //then remove the event to it
      $nextButton.off("click");
    }
  },
  
  /**
  sets up the interaction type click
  @method createClickInteraction
  @param {jQuery} $clicks jquery clicks to be clicked on
  @protected
  */
  createClickInteraction:function($clicks)
  {
    var that = this;

    //set up the current interaction type to be a click interaction
    this.currentInteraction = new ClickInteraction({
      el:$clicks,
      events:{
        click:function(e){
          var $el = $(this);
          if (that.selectChoice(e, $el)) //if select choice returns at least one item being selected
          {
            that.startFlow(e, $el, 2); //start the flow
          }
        }
      }
    });
  },
  
  /**
  sets up the interaction type click
  @method createDragInteraction
  @param {jQuery} $drags jquery drags to be dragged
  @param {jQuery} $drops jquery drops to be dropped
  @protected
  */
  createDragInteraction:function($drags,$drops)
  {
    var that = this;

    //set up the current interaction type to be a drag interaction
    this.currentInteraction = new DragInteraction({
      el:$drags,
      dropEl:$drops,
      events:{
        stopDrag:function(e){
          var $el = $(this);
          if (that.currentInteraction.dragsAllDropped()) //if everything is dropped
          {
            that.startFlow(e, $el, 2); //start the flow
          }
        }
      }
    });
  },
  
  /**
  removes the current interaction, unbinding events, etc.
  @method destroyCurrentInteraction
  @protected
  */
  destroyCurrentInteraction:function()
  {
    if (this.currentInteraction)
    {
      this.currentInteraction.delete();
      delete this.currentInteraction;
      this.currentInteraction = null;
    }
  },
  
  /**
  selects an choice, adding css classes and toggles submit button if needed
  @method selectChoice
  @param {Event} e the event object
  @param {jQuery} $el the element that was selected
  @protected
  @return {Boolean}
  */
  selectChoice:function(e, $el)
  {
    var answers = this.getAnswers(); //get the answer for a question

    var $clicks = this.getClicks(); //get the click

    if (answers instanceof Array) //if answers is an array, then we can do a "multiple" selection
    {
      $el.toggleClass(this.selectedClass); //toggle class in a multiple case

      if ($clicks.filter("."+this.selectedClass).length === 0) //if we don't have any selected
      {
        this.hideSubmitButton(); //hide the submit button
        return false; //we don't have anything selected
      }
    }
    else
    {
      $clicks.removeClass(this.selectedClass); //in single case, remove all the selected classes
      $el.addClass(this.selectedClass); //because we are just adding one class.
    }

    return true; //make it this far, return true
  },
  
  /**
  toggles submit buttons, next buttons, and moving to the next question, depending on what state we are in
  @method startFlow
  @param {Event} e the event object
  @param {jQuery} $el the element that was selected
  @param {Number} flowState which state we are in
  @protected
  */
  startFlow:function(e, $el, flowState)
  {
    //choice state
    if (flowState === 2)
    {
      //in a try again scenario, we should hide the responses once the submit button shows
      this.hideCurrentResponses();
      this.showSubmitButton(); //in this state we need to show the submit button

      var $submitButton = $(this._getQuestionObject("submitButton") || this.submitButton); //however, since the submit is optional, try to get it
      if ($submitButton.length === 0) //if we don't have one
      {
        flowState = 1; //automatic to go to submit state
      }
    }

    //submit state
    if (flowState === 1)
    {
      this.submit(e, $el); //submit the choice
      this.showNextButton(); //in this state we need to show the next button

      var $nextButton = $(this._getQuestionObject("nextButton") || this.nextButton); //however, since the next is optional, try to get it
      if ($nextButton.length === 0) //if we don't have one
      {
        flowState = 0; //automatic to go to next state
      }
    }

    //next state
    if (flowState === 0)
    {
      this.nextQuestion(e, $el); //in this state, just move on to the next question
    }
  },
  
  /**
  submits the choice as final, adds to the correct count
  @method submit
  @param {Event} e the event object
  @param {jQuery} $el the element that was selected
  @protected
  */
  submit:function(e, $el)
  {
    this.hideSubmitButton(); //if we've submitted, hide the button

    this.attemptIndex ++; //increment our attempt

    if (this.checkAnswers()) //if they are correct
    {
      this.showCorrectResponse(); //show you are correct
      this.correctCount++; //increment the correct count
    }
    else //else they are stupid
    {
      //if the number of attempts is less than the max
      if (this.attemptIndex < this.attemptMax)
      {
        this.showTryAgainResponse(); //show try again
      }
      else
      {
        this.showIncorrectResponse(); //show you're wrong
      }
    }
  },
  
  /**
  gets whether the user pass or failed
  @method checkScore
  @protected
  @return {Boolean}
  */
  checkScore:function()
  {
    return this.getPercentage() >= this.passPercentage;
  },
  
  /**
  gets the raw percentage of the quiz
  @method getPercentage
  @protected
  @return {Number}
  */
  getPercentage:function()
  {
    return this.correctCount / this.qaList.length;
  },
  
  /**
  checks the answers based on the interaction type
  @method checkAnswers
  @protected
  @return {Boolean}
  */
  checkAnswers:function()
  {
    var isCorrect = null; //we don't know if we are correct, set it to null

    var interactionType = this.getInteractionType(); //get the interaction type

    switch (interactionType)
    {
      case "click":
        var $clicks = this.getClicks(); //get the clicks

        isCorrect = this.checkAnswersClick($clicks); //is correct is equal to clicks type check answers
        break;

      case "drag":
        var obj = this.getDragsAndDrops(); //get the drag object

        isCorrect = this.checkAnswersDrag(obj.$drags,obj.$drops); //is correct is equal to drags type check answers
        break;

      default:
        throw new Error(interactionType + " is not supported");

        break;
    }

    return isCorrect;
  },
  
  /**
  checks the answers based on the click type interaction
  @method checkAnswersClick
  @param {jQuery} $clicks jquery clicks to check
  @protected
  */
  checkAnswersClick:function($clicks)
  {
    var that = this;

    var isCorrect = true; //assume true unless proved otherwise

    //for each click
    $clicks.each(function(index, el){
      var $el = $(el);

      //basically, if it is selected and not correct, or not selected and is correct
      if (($el.hasClass(that.selectedClass) && $el.attr("data-correct") === undefined) || (!$el.hasClass(that.selectedClass) && $el.attr("data-correct") !== undefined))
      {
        isCorrect = false; //then we are wrong
        return false; //break out
      }
    });

    return isCorrect;
  },
  
  /**
  checks the answers based on the drag and drop type interaction
  @method checkAnswersDrag
  @param {jQuery} $drags jquery drags to check
  @param {jQuery} $drops jquery drops to check
  @protected
  */
  checkAnswersDrag:function($drags,$drops)
  {
    var isCorrect = true; //assume true unless proved otherwise

    //for each drag
    $drags.each(function(index, el){
      var $drag = $(el);
      var $drop = $drag.data('drop');

      //basically, if the drag is in the wrong spot (index)
      if ($drag.attr('data-correct') !== ""+$drop.index())
      {
        isCorrect = false; //then we are wrong
        return false; //break out
      }
    });

    return isCorrect;
  },
  
  /**
  goes on to the next question
  @method nextQuestion
  @param {Event} e event that made it move to the next question
  @param {jQuery} $el the element that made it move on to the next question
  @protected
  */
  nextQuestion:function(e, $el)
  {
    //basically, remove the states of the current question
    this.removeSelections(); //remove the selections
    this.hideNextButton(); //hide the next button
    this.hideSubmitButton(); //hide the submit button
    this.hideCurrentQuestion(); //hide the current question
    this.destroyCurrentInteraction(); //and destroy the interaction

    if (!this.isLastQuestion()) //if it is not the last question
    {
      this.attemptIndex = 0; //reset the attempt index
      this.questionIndex++; //increment to the next question
      this.showCurrentQuestion(); //show the next question
      this.bindCurrentQuestion(); //bind the next question
    }
    else //else we are done
    {
      this.quizComplete(); //complete the quiz
    }
  },
  
  /**
  "completes" the quiz. Probably override in most cases
  @method quizComplete
  @protected
  */
  quizComplete:function()
  {
    //default functionality -- if we passed
    if (this.checkScore())
    {
      this.activityComplete(); //complete the activity
    }
    else //else restart the page
    {
      this.page.module.restartPage(true);
    }
  },
  
  /**
  checks if you are on the last question
  @method isLastQuestion
  @protected
  @return {Boolean}
  */
  isLastQuestion:function()
  {
    return this.questionIndex + 1 >= this.qaList.length; //return true if questionIndex + 1 is equal to the # of questions
  },
  
  /**
  removes the selections based on the interaction type
  @method removeSelections
  @protected
  */
  removeSelections:function()
  {
    var interactionType = this.getInteractionType(); //get the interaction type

    switch (interactionType)
    {
      case "click":
        this.removeSelectionsClick(this.getClicks()); //remove selections based on clicks

        break;

      case "drag":
        this.removeSelectionsDrag(); //remove selections based on drags

        break;

      default:
        throw new Error(interactionType + " is not supported");

        break;
    }
  },
  
  /**
  removes the selections for click type interactions
  @method removeSelectionsClick
  @param {jQuery} $clicks the clicks to remove
  @protected
  */
  removeSelectionsClick:function($clicks)
  {
    //remove selected class on the clicks
    $clicks.removeClass(this.selectedClass);
  },
  
  /**
  removes the selections for drag type interactions
  @method removeSelectionsDrag
  @protected
  */
  removeSelectionsDrag:function()
  {
    //resets the positions
    this.currentInteraction.resetPositions();
  },
  
  /**
  shows the submit button
  @method showSubmitButton
  @protected
  */
  showSubmitButton:function()
  {
    var $submitButton = $(this._getQuestionObject("submitButton") || this.submitButton);
    $submitButton.show();
  },
  
  /**
  hides the submit button
  @method hideSubmitButton
  @protected
  */
  hideSubmitButton:function()
  {
    var $submitButton = $(this._getQuestionObject("submitButton") || this.submitButton);
    $submitButton.hide();
  },
  
  /**
  shows the next button
  @method showNextButton
  @protected
  */
  showNextButton:function()
  {
    var $nextButton = $(this._getQuestionObject("nextButton") || this.nextButton);
    $nextButton.show();
  },
  
  /**
  hides the next button
  @method hideNextButton
  @protected
  */
  hideNextButton:function()
  {
    var $nextButton = $(this._getQuestionObject("nextButton") || this.nextButton);
    $nextButton.hide();
  },
  
  /**
  shows the correct response
  @method showCorrectResponse
  @protected
  */
  showCorrectResponse:function()
  {
    var $correctResponse = $(this._getQuestionObject("correctResponse") || this.correctResponse);
    $correctResponse.show();
  },
  
  /**
  hides the correct response
  @method hideCorrectResponse
  @protected
  */
  hideCorrectResponse:function()
  {
    var $correctResponse = $(this._getQuestionObject("correctResponse") || this.correctResponse);
    $correctResponse.hide();
  },
  
  /**
  shows the incorrect response
  @method showIncorrectResponse
  @protected
  */
  showIncorrectResponse:function()
  {
    var $correctResponse = $(this._getQuestionObject("incorrectResponse") || this.incorrectResponse);
    $correctResponse.show();
  },
  
  /**
  hides the incorrect response
  @method hideIncorrectResponse
  @protected
  */
  hideIncorrectResponse:function()
  {
    var $incorrectResponse = $(this._getQuestionObject("incorrectResponse") || this.incorrectResponse);
    $incorrectResponse.hide();
  },
  
  /**
  shows the try again response
  @method showTryAgainResponse
  @protected
  */
  showTryAgainResponse:function()
  {
    var $tryAgainResponse = $(this._getQuestionObject("tryAgainResponse") || this.tryAgainResponse);
    $tryAgainResponse.show();
  },
  
  /**
  hides the try again response
  @method hideTryAgainResponse
  @protected
  */
  hideTryAgainResponse:function()
  {
    var $tryAgainResponse = $(this._getQuestionObject("tryAgainResponse") || this.tryAgainResponse);
    $tryAgainResponse.hide();
  },
  
  /**
  first function called when activity is destroyed
  @event destroy
  @protected
  @override
  */
  destroy:function()
  {
    this._super(); //call parent

    this.removeSelections(); //remove the selections
    this.unbindSubmitButton(); //unbind submit button
    this.unbindNextButton(); //unbind next button
    this.destroyCurrentInteraction(); //destroy the interaction
  }
});
