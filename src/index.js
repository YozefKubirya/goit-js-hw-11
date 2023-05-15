import './css/common.css'
import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import NewApiService from './js/api-service';
const refs = {
   form: document.querySelector('.js-search-form'),
   loadMoreBtn: document.querySelector('[data-action="load-more"]'),
   gallery:document.querySelector('.js-gallery-container')
}

refs.form.addEventListener('submit', onFormSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn)
const service = new NewApiService();
function onFormSearch(e) {
   e.preventDefault();
   service.query = e.currentTarget.elements.searchQuery.value;
   service.resetPage();
   console.log(service.query);
   service.getFetch().then(addImagesToGallery)
};

function onLoadMoreBtn() {
   service.getFetch().then(addImagesToGallery);
   
}

function createMarkup(images) {
   const markup = images.map(({ webformatURL, largeImageURL, likes, views, comments, downloads ,tags}) => {return `<div class="photo-card">
         <a href="${largeImageURL}"><img class="rounded-lg mb-3" src="${webformatURL}" alt="cat1" title="${tags}" loading="lazy" /></a>
         <div class="info">
            <p class="info-item">
               <b>Likes</b>
               <b>${likes}</b>
            </p>
            <p class="info-item">
               <b>Views</b>
               <b>${views}</b>
            </p>
            <p class="info-item">
               <b>Comments</b>
               <b>${comments}</b>
            </p>
            <p class="info-item">
               <b>Downloads</b>
               <b>${downloads}</b>
            </p>
         </div>
      </div>`;
  }).join('');
   return markup;

}

function addImagesToGallery(markup) {
   refs.gallery.insertAdjacentHTML('afterbegin',markup)
}







// {/* <div class="photo-card">
// <a  href="${largeImageURL}"><img class="rounded-lg mb-3" src="${webformatURL}"  alt="cat1" title="${tags}" loading="lazy" width="320" height="213" /></a>

//   <div class="info">
//     <p class="info-item">
//       <b>Likes${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads${downloads}</b>
//     </p>
//   </div>
// </div> */}
// const url = `https://pixabay.com/api/`;
// const options = {
//    headers: {
//       Authorization:'36269474-83b619d05c1927e78eac327ce'
//    }
// }