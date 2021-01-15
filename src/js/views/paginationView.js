import View from './View';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //console.log(numPages);

    // 1 page and there are some pages
    if (this._data.page === 1 && numPages > 1) {
      return `
        <button data-goto="2" class=" btn--inline pagination__btn--next">
            <span>Page 2</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    // 1 page and there is no more pages
    if (this._data.page === 1) {
      return '';
    }
    // last page
    if (this._data.page === numPages && numPages > 1) {
      return `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>

        `;
    }
    // other pages
    if (this._data.page < numPages) {
      return `
        <button data-goto="${
          this._data.page - 1
        }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
    }
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}
export default new PaginationView();
