const announcementOverlay = document.querySelector(".announcement-overlay");
const announcementButton = document.querySelector(".announcement-btn");

announcementButton.addEventListener("click", () => {
  announcementOverlay.style.display = 'none';
  localStorage.setItem("announcementBannerDisplayed", "true");
});

setTimeout(() => {
  if (!localStorage.getItem("announcementBannerDisplayed")) {
    announcementOverlay.style.display = 'block';
  } else {
    announcementOverlay.style.display = 'none';
  }
}, 2000);