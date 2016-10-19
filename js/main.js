var techMap = {};
$(document).ready(function(){
  techMap.pages = $(".page");

  techMap.currentPage = 0;

  for(var i = 0;i<techMap.pages.length;i++){
    var page = $(techMap.pages[i]);
    page.hide();
  }

  var that = this;

   techMap.el = $(document);


  techMap.canSwipe = true;
  
  //cheating for mobile, swipe right goes back
  techMap.el.hammer().on('swiperight', function () {
    if (techMap.canSwipe) {
      previous();
    }
  });

  //cheating for mobile, swipe left goes forward
  techMap.el.hammer().on('swipeleft', function () {
    if (techMap.canSwipe) {
      next();
    }
  });
   start();
});
  function start(){
    $(techMap.pages[techMap.currentPage]).show();
  }
  function next(){
    $(techMap.pages[techMap.currentPage]).hide();
    techMap.currentPage++;
    if(techMap.currentPage > techMap.pages.length -1){
      techMap.currentPage = techMap.currentPage - 1;
    }
    $(techMap.pages[techMap.currentPage]).show();
  }
  function previous(){
    $(techMap.pages[techMap.currentPage]).hide();
    techMap.currentPage--;
    if(techMap.currentPage < 0){
      techMap.currentPage = techMap.currentPage + 1;
    }
    $(techMap.pages[techMap.currentPage]).show();
  }