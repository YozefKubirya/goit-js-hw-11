export default class NewApiService{
   constructor() {
      this.searchValue = '';
      this.page = 1;
   };
   getFetch () {
      const BASE_URL = 'https://pixabay.com/api/';
const API_KEY='36269474-83b619d05c1927e78eac327ce';
     return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=5`).then(r => r.json()).then(result => {
      
        this.page += 1;
        console.log(result.hits);
        const images = result.hits;
        return images;
         
      });
   }
   resetPage() {
      this.page = 1;
   }
   get query() {
    return  this.searchValue;
   }
   set query(newValue) {
      this.searchValue = newValue;
   }
}