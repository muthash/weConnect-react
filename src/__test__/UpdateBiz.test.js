import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import DeleteBiz from '../components/dashboard/DeleteBiz';
import UpdateBiz from '../components/dashboard/UpdateBiz';

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
  global.localStorage = new LocalStorageMock;

describe('Update business Component', () => {
    const history = {
      push: jest.fn()
    };
    const location = {
        state: {}
    };
    const handleChange = jest.fn();
    it('should render without error', () => {
        const data = shallow(<DeleteBiz location={location} history={history} />);
        expect( data.find('tbody').length).toEqual(1);
    });
    it('should render without error', () => {
        const data = shallow(<UpdateBiz location={location} history={history} />);
        expect( data.find('div').length).toEqual(1);
    });
    it('should respond to change event and change the state of the Register Component', () => {
        const emailInput = mount(<MemoryRouter><UpdateBiz location={location} history={history} /></MemoryRouter>);
        const instance = emailInput.find(UpdateBiz).instance();
        emailInput.find('#businessName').simulate('change', {target: {name: 'businessName', value: 'this'}});
        expect(instance.state.businessName).toEqual('this');
    });
  
  });