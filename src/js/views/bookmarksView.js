import View from './View';
import PreviewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet.';
  message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join(''); //?? how we use previewView
  }
}
export default new BookmarksView();
