$(window).on("scroll", (e) => {
  e.preventDefault();

  const scrollTop = $(window).scrollTop();

  // console.log(`SCROLL TOP: ${scrollTop}`);

  if(scrollTop > 110) {
    $("img.logo").addClass("active");
  } else {
    $("img.logo").removeClass("active");
  }

  if(scrollTop > 450) {
    $(".homepage-banner, .homepage-subtitle").addClass("active");
  } else {
    $(".homepage-banner, .homepage-subtitle").removeClass("active");
  }

  if(scrollTop > 550) {
    $(".homepage-banner-header, .homepage-title, .homepage-menu").addClass("active");
  } else {
    $(".homepage-banner-header, .homepage-title, .homepage-menu").removeClass("active");
  }

});
