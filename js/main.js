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

let counter = 1;

const loadMore = document.querySelector(".load-more-btn");
const loader = document.querySelector(".loader");
const workGalleryItems = document.querySelectorAll(".work-gallery-item");

loadMore.addEventListener("click", (e) => {
  const newItems = [];

  loadMore.style.display = "none";
  loader.style.display = "inline-block";

  setTimeout(() => {
    loadMore.style.display = "inline-block";
    loader.style.display = "none";

    Array.from(workGalleryItems).forEach((work) => {
      const clone = work.cloneNode(true);
      let itemImg = clone.querySelector(".gallery-item-img");

      let src = itemImg.src;
      let str = src.split("-");
      let num = +str[str.length - 1].split(".")[0];
      (counter === 1) ? num += 3 : num += 6;
      itemImg.src = src.split(".j")[0].slice(0,-1) + num + ".jpg";

      newItems.push(clone);
    })

    document.querySelector(".work-gallery").append(...newItems);

    counter++;
    if(counter === 3) {
      loadMore.style.display = "none";
    }
  }, 2000)
})















