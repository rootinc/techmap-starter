var techMap = {};
$(document).ready(function(){
  techMap.pages = $(".page");
  techMap.pagesActualLength = techMap.pages.length - 1;
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

  if ($.hotkeys){
    //keyboard down events
    techMap.el.on('keydown',null,'left',function(e){
      previous();
    });

    techMap.el.on('keydown',null,'right',function(e){
      next();
    });
  }

  start();
});

function start(){
  $(techMap.pages[techMap.currentPage]).show();
}

function next(){
  if(techMap.currentPage < techMap.pagesActualLength){
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
