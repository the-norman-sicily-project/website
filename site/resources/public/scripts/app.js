$(document).ready(function() {
  // get current URL path and assign 'active' class
  var pathname = window.location.pathname;
  var selector = '.navbar div div a.navbar-btn[href="PATHNAME"]';
  switch (pathname) {
    case '/about/':
      $(selector.replace('PATHNAME','/about/')).addClass('active');
      break;
    case '/chattels/':
      $(selector.replace('PATHNAME','/chattels/')).addClass('active');
      break;
    case '/people/':
      $(selector.replace('PATHNAME','/people/')).addClass('active');
      break;
    case '/places/':
      $(selector.replace('PATHNAME','/places/')).addClass('active');
      break;
    case '/resources/':
      $(selector.replace('PATHNAME','/resources/')).addClass('active');
      break;
    case '/analytics/':
      $(selector.replace('PATHNAME','/analytics/')).addClass('active');
      break;
    case '/essays/':
      $(selector.replace('PATHNAME','/essays/')).addClass('active');
      break;
    default:
      $(selector.replace('PATHNAME','/')).addClass('active');
  }

  $('[data-toggle="popover"]').popover({
    html: true
  })
})
