

import './css/common.css'
import axios from 'axios';
import Notiflix from 'notiflix';
import NewApiService from './js/api-service';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
const refs = {
   form: document.querySelector('.js-search-form'),
   loadMoreBtn: document.querySelector('[data-action="load-more"]'),
   gallery:document.querySelector('.js-gallery-container')
}

var lightbox = new SimpleLightbox('.js-gallery-container  a', {
 captionsData: 'alt',
   captionDelay: 300,
   doClose:true,  
})

refs.form.addEventListener('submit', onFormSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

const service = new NewApiService();
refs.loadMoreBtn.classList.add('is-hidden');

function onFormSearch(e) {
   e.preventDefault();
   service.resetPage();
   service.query = e.currentTarget.elements.searchQuery.value.trim();

   if (service.query==='') {
      Notiflix.Notify.info('Please write something',{timeout:3000})
   } else { 
   clearArticlesContainer();
      service.getFetch().then(createMarkup)
   }
   
};

function onLoadMoreBtn() {
   service.getFetch().then(createMarkup);
   
}

function createMarkup(images) {
   console.log(images.totalHits)
   showTotalHits(images.totalHits, images.hits.length);
   
   if (images.hits.length === 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.', { timeout: 3000 }
      );
   } else {
      refs.loadMoreBtn.classList.remove('is-hidden');

      const markup = images.hits.map(({ webformatURL, largeImageURL, likes, views, comments, downloads, tags }) => {
      return `<div class="photo-card">
         <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
         <div class="info">
            <p class="info-item">
               <b>Likes:</b>
               <b>${likes}</b>
            </p>
            <p class="info-item">
               <b>Views:</b>
               <b>${views}</b>
            </p>
            <p class="info-item">
               <b>Comments:</b>
               <b>${comments}</b>
            </p>
            <p class="info-item">
               <b>Downloads:</b>
               <b>${downloads}</b>
            </p>
         </div>
      </div>`;
   }).join('');
    
      refs.gallery.insertAdjacentHTML('beforeend', markup);
      checkEndOfArticles(images.totalHits)
      lightbox.refresh();
   }
   
}

function clearArticlesContainer() {
   refs.gallery.innerHTML = '';
}

function showTotalHits(totalHits, length) {
   if (length === 0) {
      return;
   } else if(service.page===2) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`,{timeout:3000})
   }
}

function checkEndOfArticles(totalHits) {
   if (totalHits/service.per_page<=service.page) {
      refs.loadMoreBtn.classList.add('is-hidden');
     return Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`,{timeout:3000})
   }
}
