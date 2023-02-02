"use strict";
/*---------- services-section ----------*/
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


/*---------- work-section ----------*/
const workCategoryList = document.querySelector(".work-category-list");

workCategoryList.addEventListener("click", (e) => {
  const active = workCategoryList.querySelector(".active-category");
  active.classList.remove("active-category");
  e.target.classList.add("active-category");
  console.log(e.target);

  const workGalleryItems = document.querySelectorAll(".work-gallery-item");
  Array.from(workGalleryItems).forEach((work) => {
    if (e.target.dataset.category === "all") {
      work.style.display = "block";
    } else if (work.dataset.category === e.target.dataset.category) {
      work.style.display = "block";
    } else {
      work.style.display = "none";
    }
  });
});

let counter = 1;

const loadMoreWorks = document.querySelector(".more-work-btn");
const loaderWorks = document.querySelector(".loader-works");
const workGalleryItems = document.querySelectorAll(".work-gallery-item");

loadMoreWorks.addEventListener("click", () => {
  const newItems = [];

  loadMoreWorks.style.display = "none";
  loaderWorks.style.display = "inline-block";

  setTimeout(() => {
    loadMoreWorks.style.display = "inline-block";
    loaderWorks.style.display = "none";

    Array.from(workGalleryItems).forEach((work) => {
      const clone = work.cloneNode(true);
      let itemImg = clone.querySelector(".gallery-item-img");

      let src = itemImg.src;
      let str = src.split("-");
      let num = +str[str.length - 1].split(".")[0];
      (counter === 1) ? num += 3 : num += 6;
      itemImg.src = src.split(".j")[0].slice(0, -1) + num + ".jpg";

      newItems.push(clone);
    });

    document.querySelector(".work-gallery").append(...newItems);

    counter++;
    if (counter === 3) {
      loadMoreWorks.style.display = "none";
    }
  }, 2000);
});

/*---------- feedback-section ----------*/
const userList = document.querySelector(".user-list-wrap");
const userListItems = Array.from(document.querySelectorAll(".user-list-item"));
const userFeedbacks = Array.from(document.querySelectorAll(".user-feedback"));

function ShowFeedback(index) {
  userListItems[index].classList.add("user-item-active");
  userFeedbacks.forEach((feedback) => {
    if (feedback.dataset.user === userListItems[index].dataset.user) {
      feedback.classList.add("opacity");
    } else {
      feedback.classList.remove("opacity");
    }
  });
}

userList.addEventListener("click", (e) => {
  let activeItem = document.querySelector(".user-item-active");
  activeItem.classList.remove("user-item-active");

  let activeIndex = userListItems.indexOf(activeItem);
  const listItem = e.target.parentElement;

  if (listItem.classList.contains("user-list-item")) {
    activeIndex = userListItems.indexOf(listItem);
  } else if (e.target.classList.contains("right-arrow-icon")) {
    activeIndex === userListItems.length - 1
      ? activeIndex = 0 : activeIndex++;
  } else if (e.target.classList.contains("left-arrow-icon")) {
    activeIndex === 0
      ? activeIndex = userListItems.length - 1 : activeIndex--;
  }

  ShowFeedback(activeIndex);
});

/*---------- best-images-section ----------*/
const loadMoreImg = document.querySelector(".more-img-btn");
const loaderImg = document.querySelector(".loader-img");

$(".inner-grid--1x2").masonry({
  itemSelector: ".grid-item--1x2",
  columnWidth: ".grid-item--1x2",
  percentPosition: true,
  gutter: 3
});

$(".inner-grid--3x3").masonry({
  itemSelector: ".grid-item--3x3",
  columnWidth: ".grid-item--3x3",
  percentPosition: true,
  gutter: 3
});

let $grid = $("#gallery-grid").masonry({
  gutter: 20
});

function addItemsToGallery(items) {
  const $items = $(items);
  $grid.append($items);
  $grid.masonry("appended", $items);
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });
}

function getItemElement(i) {
  const elem = document.createElement("div");
  elem.className = "grid-item";

  const img = document.createElement("img");
  img.src = `https://picsum.photos/240?random=${i}`;

  const hoverDiv = document.createElement("div");
  hoverDiv.className = "grid-hover-block";
  hoverDiv.innerHTML = " <svg class=\"zoom-icon\" width=\"10\" height=\"10\" viewBox=\"0 0 10 10\" fill=\"none\"\n" +
    "                   xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n" +
    "                      d=\"M5.44374 6.41109C4.88773 6.78308 4.2192 7 3.5 7C1.567 7 0 5.433 0 3.5C0 1.567 1.567 0 3.5 0C5.433 0 7 1.567 7 3.5C7 4.3516 6.69586 5.13217 6.19026 5.739L9.33832 8.63184L8.66168 9.36816L5.44374 6.41109ZM6 3.5C6 4.88071 4.88071 6 3.5 6C2.11929 6 1 4.88071 1 3.5C1 2.11929 2.11929 1 3.5 1C4.88071 1 6 2.11929 6 3.5Z\"\n" +
    "                      fill=\"white\" />\n" +
    "              </svg>\n" +
    "              <svg class=\"full-size-icon\" width=\"12\" height=\"11\" viewBox=\"0 0 12 11\" fill=\"none\"\n" +
    "                   xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                <path\n" +
    "                  d=\"M0.7 10C0.7 10.1657 0.834315 10.3 1 10.3L3.7 10.3C3.86569 10.3 4 10.1657 4 10C4 9.83431 3.86569 9.7 3.7 9.7L1.3 9.7L1.3 7.3C1.3 7.13431 1.16569 7 1 7C0.834314 7 0.7 7.13431 0.7 7.3L0.7 10ZM0.999925 0.700201C0.83424 0.700266 0.699978 0.834634 0.700043 1.00032L0.701103 3.70032C0.701168 3.866 0.835535 4.00027 1.00122 4.0002C1.16691 4.00014 1.30117 3.86577 1.3011 3.70008L1.30016 1.30008L3.70016 1.29914C3.86585 1.29908 4.00011 1.16471 4.00004 0.999024C3.99998 0.833338 3.86561 0.699076 3.69993 0.699141L0.999925 0.700201ZM11.3 1C11.3 0.834315 11.1657 0.7 11 0.7L8.3 0.7C8.13431 0.7 8 0.834314 8 1C8 1.16569 8.13431 1.3 8.3 1.3L10.7 1.3L10.7 3.7C10.7 3.86569 10.8343 4 11 4C11.1657 4 11.3 3.86569 11.3 3.7L11.3 1ZM11.0297 10.2727C11.1954 10.2712 11.3285 10.1357 11.327 9.97001L11.3026 7.27012C11.3011 7.10444 11.1656 6.97135 10.9999 6.97285C10.8342 6.97435 10.7011 7.10987 10.7026 7.27555L10.7243 9.67545L8.32442 9.69717C8.15874 9.69867 8.02565 9.8342 8.02715 9.99988C8.02865 10.1656 8.16417 10.2986 8.32985 10.2971L11.0297 10.2727ZM3.78787 6.78787L0.787868 9.78787L1.21213 10.2121L4.21213 7.21213L3.78787 6.78787ZM4.21327 3.78681L1.21209 0.787986L0.787994 1.21242L3.78917 4.21124L4.21327 3.78681ZM8.21213 4.21213L11.2121 1.21213L10.7879 0.787868L7.78787 3.78787L8.21213 4.21213ZM7.7898 7.21404L10.8168 10.1868L11.2372 9.75868L8.2102 6.78596L7.7898 7.21404Z\"\n" +
    "                  fill=\"#F8FCFE\" />\n" +
    "              </svg>"

  elem.append(img);
  elem.append(hoverDiv);
  return elem;
}

let count = 1;
loadMoreImg.addEventListener("click", () => {
  const newItems = [];

  loadMoreImg.style.display = "none";
  loaderImg.style.display = "inline-block";

  setTimeout(() => {
    loadMoreImg.style.display = "inline-block";
    loaderImg.style.display = "none";
    let i = count === 1 ? 1 : 7;
    for(i; i < 7 * count; i++) {
      const newEl = getItemElement(i);
      newItems.push(newEl);
    }

    addItemsToGallery(newItems);

    count++;
    if (count === 3) {
      loadMoreImg.style.display = "none";
    }
  }, 2000);
});











