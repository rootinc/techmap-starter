var techMap = {};
$(document).ready(function(){
  techMap.pages = $(".page");
  var pagesActualLength = techMap.pages.length - 1;
  var beginningPage = 0;
  var that = this;

  techMap.currentPage = 0;
  techMap.el = $(document);

  techMap.pages.hide();

  techMap.el.hammer().on('swiperight', function () {
    var nextPage = techMap.currentPage + 1;
    previous(nextPage, beginningPage);
  });

  techMap.el.hammer().on('swipeleft', function () {
    var previousPage = techMap.currentPage - 1;
    next(previousPage, pagesActualLength);
  });

  start();
});

function start(){
  $(techMap.pages[techMap.currentPage]).show();
}

function next(previousPage, pagesActualLength){
  $(techMap.pages[techMap.currentPage]).hide();
  techMap.currentPage++;
  if(techMap.currentPage > pagesActualLength){
    techMap.currentPage = previousPage;
  }
  $(techMap.pages[techMap.currentPage]).show();
}

function previous(nextPage, beginningPage){
  $(techMap.pages[techMap.currentPage]).hide();
  techMap.currentPage--;
  if(techMap.currentPage < beginningPage){
    techMap.currentPage = nextPage;
  }
  $(techMap.pages[techMap.currentPage]).show();
}