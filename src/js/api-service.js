import axios from "axios";
export default class NewApiService{
   constructor() {
      this.searchValue = '';
      this.page = 1;
      this.per_page = 40;
   };

   async getFetch() {
      const BASE_URL = 'https://pixabay.com/api/'
      const API_KEY = '36269474-83b619d05c1927e78eac327ce';

  const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`);
   const result = await response.json();
   const icr = await this.incrementPage();
   console.log(result)
   return result;
}

   incrementPage() {
      this.page += 1;
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