(function() {
  "use strict"; // Start of use strict

  var mainNav = document.querySelector('#mainNav');

  if (mainNav) {

    var navbarCollapse = mainNav.querySelector('.navbar-collapse');
    
    if (navbarCollapse) {
      
      var collapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      
      var navbarItems = navbarCollapse.querySelectorAll('a');
      
      // Closes responsive menu when a scroll trigger link is clicked
      for (var item of navbarItems) {
        item.addEventListener('click', function (event) {
          collapse.hide();
        });
      }
    }

    // Collapse Navbar
    var collapseNavbar = function() {

      var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scrollTop > 100) {
        mainNav.classList.add("navbar-shrink");
      } else {
        mainNav.classList.remove("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    collapseNavbar();
    // Collapse the navbar when page is scrolled
    document.addEventListener("scroll", collapseNavbar);

    // Hide navbar when modals trigger
    var modals = document.querySelectorAll('.portfolio-modal');
      
    for (var modal of modals) {
      
      modal.addEventListener('shown.bs.modal', function (event) {
        mainNav.classList.add('d-none');
      });
        
      modal.addEventListener('hidden.bs.modal', function (event) {
        mainNav.classList.remove('d-none');
      });
    }
  }

})(); // End of use strict


// Not Working carousel data-bs-interval changes alright but doesnt seem to work
window.addEventListener('load', function(){

  // const carousel = document.querySelector('.carousel');
  // const videos = carousel.querySelectorAll('video');

  // carousel.setAttribute('data-bs-interval',5000);
  
  // videos.forEach(video=>{

  //   video.addEventListener('play', (event) => {
      
  //     if (event.type == 'play'){
  //       let duration = (parseInt(video.duration)+1)*1000;
  //       carousel.setAttribute('data-bs-interval', duration);
  //       // console.log(parseInt(duration));
  //     }else{
  //       carousel.setAttribute('data-interval',5000);
  //     }
 
  //   });

})


function shareEvent(modalID, name){

  let flyer = document.querySelector(modalID).querySelector('img');
  
  // feature detecting navigator.canShare() also implies
  // the same for the navigator.share()
  if (!navigator.canShare) {
    alert("Your browser doesn't support the Web Share API.");
    return;
  }else{

    fetch(flyer.getAttribute('src'))
      .then(function(response) {
        return response.blob()
      })
      .then(function(blob) {
        var file = new File([blob], flyer.getAttribute('name')+".jpg", {type: 'image/jpeg'});
        var filesArray = [file];

        if(navigator.canShare && navigator.canShare({ files: filesArray })) {
          navigator.share({
            text: 'Save the date. Share, lets meet and chill.',
            files: filesArray,
            title: flyer.getAttribute('name'),
            url: flyer.getAttribute('src'),
          });
        }
      })

  }

  return true;  // return true to allow default anchor behaviour
}

