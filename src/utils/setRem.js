(function(psdw){
  var dpr=0 , rem=0 , scale=0;
  var htmlDOM=document.documentElement;
  dpr=window.devicePixelRatio / 2;
  var currentWidth=htmlDOM.clientWidth;
  scale=currentWidth/psdw;
  rem=psdw/10;
  rem=rem*scale * 2;
  // rem = 100 * scale;
  htmlDOM.style.fontSize=rem+'px';
  htmlDOM.setAttribute('data-dpr',dpr);
})(750);