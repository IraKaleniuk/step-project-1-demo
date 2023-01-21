"use strict";
//services
const serviceList = document.querySelector(".service-list");
const servicesDesc = document.querySelectorAll(".service-desc");

serviceList.addEventListener("click", (e) => {
  const active = serviceList.querySelector(".active");
  active.classList.remove("active");
  e.target.classList.add("active");

  const activeDesc = Array.from(servicesDesc).filter((desc) => desc.dataset.active === "true");
  activeDesc[0].style.display = "none";
  activeDesc[0].dataset.active = "false";


  const service = Array.from(servicesDesc).filter((service) => service.dataset.service === e.target.dataset.service);
  service[0].style.display = "flex";
  service[0].dataset.active = "true";
});

//work
const workCategoryList = document.querySelector(".work-category-list");

workCategoryList.addEventListener("click", (e)=> {
  const active = workCategoryList.querySelector(".active-category");
  active.classList.remove("active-category");
  e.target.classList.add("active-category");
  console.log(e.target);

  const workGalleryItems = document.querySelectorAll(".work-gallery-item");
  Array.from(workGalleryItems).forEach((work) => {
    if(e.target.dataset.category === "all") {
      work.style.display = "block";
    } else if(work.dataset.category === e.target.dataset.category) {
      work.style.display = "block";
    } else {
      work.style.display = "none";
    }
  })
})

const loadMore = document.querySelector(".load-more-btn");
loadMore.addEventListener("click", (e) => {

  // const workItem

  let  items = [];
  for(let i = 0;  i < 12;  i++) {
    // const li
  }
})















