import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../../test-utils/mocks";
import { history } from "../../../store/store";
//import * as actionCreators from "../../../store/actions/login";
import "../../../setupTests";
import axios from "axios";
import Signup from "./Signup";

let stubInitialState = {};

let mockStore = getMockStore(stubInitialState);

describe("<Signup />", () => {
    let signup, spyAxios_post;

    beforeEach(() => {
        signup = (
            <Provider store={mockStore}>
                <Signup history={history} />
            </Provider>
        );

        spyAxios_post = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));
    });

    it("should load properly", () => {
        const component = mount(signup);
        let wrapper = component.find("#signup");
        expect(wrapper.length).toBe(1);
    });

    it("should not call 'onSignup' when button is disabled", () => {
        const component = mount(signup);
        let wrapper = component.find("#signup-button");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(0);

        component
            .find("#email-input")
            .simulate("change", { target: { value: "test" } });

        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(0);
    });

    it("should call 'onSignup' when input is valid", () => {
        const component = mount(signup);
        component
            .find("#email-input")
            .simulate("change", { target: { value: "test@gmail.com" } });
        component
            .find("#pw-input")
            .simulate("change", { target: { value: "testpassword" } });
        component
            .find("#pw-confirm")
            .simulate("change", { target: { value: "testpassword" } });
        let wrapper = component.find("#signup-button");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(1);
    });
});
