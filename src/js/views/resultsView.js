import View from './View';
import PreviewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'There is no recipes like that !';
  message = '';
  _generateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join(''); //?? how we use previewView
  }
}
export default new ResultsView();
