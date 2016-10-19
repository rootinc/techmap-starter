var techMap = {};
$(document).ready(function(){
  techMap.pages = $(".page");
  techMap.pagesLength = techMap.pages.length;
  techMap.beginningPage = 0;
  var that = this;

  techMap.currentPage = 0;
  techMap.el = $(document);

  techMap.pages.hide();

  techMap.el.hammer().on('swiperight', function () {
    techMap.nextPage = techMap.currentPage + 1;
    previous();
  });

  techMap.el.hammer().on('swipeleft', function () {
    techMap.previousPage = techMap.currentPage - 1;
    next();
  });

  start();
});

function start(){
  $(techMap.pages[techMap.currentPage]).show();
}

function next(){
  if(techMap.currentPage < techMap.pagesLength - 1){
    $(techMap.pages[techMap.currentPage]).hide();
    techMap.currentPage++;
    $(techMap.pages[techMap.currentPage]).show();
  }
}

function previous(){
  if(techMap.currentPage > techMap.beginningPage){
    $(techMap.pages[techMap.currentPage]).hide();
    techMap.currentPage--;
    $(techMap.pages[techMap.currentPage]).show();
  }
}
