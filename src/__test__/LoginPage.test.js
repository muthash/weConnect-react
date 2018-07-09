import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';


import LoginPage from '../components/login/LoginPage';
import LoginForm from '../components/login/LoginForm';

describe('Login page Component', () => {
    
    const mockUrl = {
        state : {
          success: '100'
        }
    };
    it('should render navbar', () => {
        const data = shallow(<LoginPage location={mockUrl} />);
        expect( data.find('Navbar').length).toEqual(1);
    });

    it('should render register page', () => {
        const data = shallow(<LoginPage location={mockUrl} />);
        expect( data.find('LoginForm').length).toEqual(1);
    });

    it('should respond to change event and change the state of the Register Component', () => {
        const emailInput = mount(<MemoryRouter><LoginPage location={mockUrl} /></MemoryRouter>);
        const instance = emailInput.find(LoginPage).instance()
        emailInput.find('#useremail').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
        expect(instance.state.email).toEqual('blah@gmail.com');
    });

    describe('error message', () => {
        const state= {emailErr: "There is an error here"};
        it('displays errror message', () => {
            const component = shallow(<LoginForm state={state} emailErr={state.emailErr} />);
            const nameError = component.find('.invalid-feedback');
            expect(nameError.text()).toBe('There is an error here');
        });
    });

});