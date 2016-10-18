var techMap = {};
$(document).ready(function(){
  techMap.pages = $(".page");

  techMap.currentPage = 0;

  for(var i = 0;i<techMap.pages.length;i++){
    var page = $(techMap.pages[i]);
    page.hide();
  }

  var that = techMap;

   techMap.el = $(document);

   var curPage = techMap.currentPage;
   var pagesObj = techMap.pages;

  techMap.canSwipe = true;
  
  //cheating for mobile, swipe right goes back
  techMap.el.hammer().on('swiperight', function () {
    if (that.canSwipe) {
      previous(curPage, pagesObj);
    }
  });

  //cheating for mobile, swipe left goes forward
  techMap.el.hammer().on('swipeleft', function () {
    if (that.canSwipe) {
      next(curPage, pagesObj);
    }
  });

   if ($.hotkeys){
    //keyboard down events
    techMap.el.on('keydown',null,'left',function(e){
      previous(curPage, pagesObj);
    });

    techMap.el.on('keydown',null,'right',function(e){
      next(curPage, pagesObj);
    });
   }
   start(curPage, pagesObj);
});
  function start(curPage, pagesObj){
    $(pagesObj[curPage]).show();
  }
  function next(curPage, pagesObj){
    $(pagesObj[curPage]).hide();
    var nextPage = curPage + 1;
    $(pagesObj[nextPage]).show();
  }
  function previous(curPage, pagesObj){
    $(pagesObj[curPage]).hide();
    curPage -= 1;
    $(pagesObj[curPage]).show();
  }