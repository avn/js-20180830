import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import Search from "../common/components/search.js";
import ChoiceList from "../common/components/choice-list.js";

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initSearch();
    this._initSorting();
  }

  _initCatalog () {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),

      onPhoneSelected: (phoneId) => {
        let phoneDetails = PhoneService.getPhone(phoneId);

        this._catalog.hide();
        this._viewer.show(phoneDetails);
      },
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    })
  }

  _initSearch() {
    new Search({
      element: this._element.querySelector('[data-component="phone-search"]'),
      onInputComplete: (query) => {
        this._catalog.filter(query);
      }
    });
  }

  _initSorting() {
    new ChoiceList({
      element: this._element.querySelector('[data-component="phone-sort"]'),
      choiceList: {
        name: 'Alphabetical',
        age: 'Newest',
      },
      onValueChanged: (fieldName) => {
        this._catalog.sort(fieldName);
      }
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <p>
              Search:
              <input data-component="phone-search"/>
            </p>
    
            <p>
              Sort by:
              <select data-component="phone-sort">
              </select>
            </p>
          </section>
    
          <section>
            <p>Shopping Cart</p>
            <ul>
              <li>Phone 1</li>
              <li>Phone 2</li>
              <li>Phone 3</li>
            </ul>
          </section>
        </div>
    
        <!--Main content-->
        <div class="col-md-10">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer"></div>
        </div>
      </div>
    `;
  }
}
