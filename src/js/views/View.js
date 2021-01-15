import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  //Documentation example
  /**
   *Render the recive object to the DOM
   * @param {Object| Object[]} data The data to be rendered (e. g. recipe)
   * @param {boolean} [render=true] If flase create markup string instead of rendring of the DOM
   * @returns{undefined | string} Markup string is return when render = false
   * @this {object} View instance
   * @author Andrzej Jaworski
   * @todo finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    //it looks like curElements in this array have life-connection with real elements in DOM
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //Update changed text
      if (
        !newEl.isEqualNode(curEl) && //for nodes which have same changes
        newEl.firstChild?.nodeValue.trim() !== '' // for nodes with text
      ) {
        curEl.textContent = newEl.textContent;
      }
      //Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        //console.log(newEl);
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  renderSpinere() {
    const spiner = `
      <div class="spinner">
        <svg>
          <use href=${icons}#icon-loader></use>
        </svg>
      </div>
     `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spiner);
  }
  renderError(message = this._errorMessage) {
    this._clear();
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this.message) {
    this._clear();
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smail"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
