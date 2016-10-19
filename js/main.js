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
  
  techMap.el.hammer().on('swiperight', function () {
      previous();
  });

  techMap.el.hammer().on('swipeleft', function () {
      next();
  });
   start();
});
  function start(){
    $(techMap.pages[techMap.currentPage]).show();
  }
  function next(){
    var pagesActualLength = techMap.pages.length - 1;
    var previousPage = techMap.currentPage - 1;
    $(techMap.pages[techMap.currentPage]).hide();
    techMap.currentPage++;
    if(techMap.currentPage > pagesActualLength){
      techMap.currentPage = previousPage;
    }
    $(techMap.pages[techMap.currentPage]).show();
  }
  function previous(){
    var beginningPage = 0;
    var nextPage = techMap.currentPage + 1;
    $(techMap.pages[techMap.currentPage]).hide();
    techMap.currentPage--;
    if(techMap.currentPage < beginningPage){
      techMap.currentPage = nextPage;
    }
    $(techMap.pages[techMap.currentPage]).show();
  }