var ShowAnimation = Animation.extend({
  init:function(properties)
  {
    var realProperties = {};
    realProperties.animators = [];
    
    var animators = properties.animators;
    var delays = properties.delays;
    var effects = properties.effects;
    
    var duration = 0;
    
    for (var i=0;i<animators.length;i++)
    {
      var animator = animators[i];
      var delay = delays[i];
      var effect = effects ? effects[i] : 'fade';
      
      var nextDelay;
      
      if (i+1 < delays.length)
      {
        nextDelay = delays[i+1];
      }
      
      realProperties.animators.push({
        selector:animator,
        initial:{
            display:'none'
        },
        timeline:[
          {
            startTime:duration+delay,
            endTime:duration+delay+nextDelay,
            effect:effect
          }
        ]
      });
      
      duration += delay;
    }
    
    realProperties.duration = duration;
    
    this._super(realProperties);
  }
});