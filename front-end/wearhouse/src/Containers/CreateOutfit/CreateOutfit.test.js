import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../../test-utils/mocks";
import { history } from "../../../store/store";
import * as actionCreators from "../../store/actions/index";
import "../../../setupTests";
import axios from "axios";
import CreateOutfit from "./CreateOutfit";

let stubInitialState = {};

let mockStore = getMockStore(stubInitialState);

describe("<CreateOutfit />", () => {
    let login, spyHistoryPush, spyAxios_post;

    beforeEach(() => {
        login = (
            <Provider store={mockStore}>
                <CreateOutfit history={history} />
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => {
                dispatch();
            };
        });

        spyAxios_post = jest
            .spyOn(axios, "post")
            .mockImplementation(() => Promise.resolve({}));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should load properly", () => {
        const component = mount(login);
        let wrapper = component.find("#login");
        expect(wrapper.length).toBe(1);
    });

    it("should not call 'onLogin' when input is not valid", () => {
        const component = mount(login);
        let wrapper = component.find("#login-button");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(0);
    });

    it("should call 'onLogin' when clicked", () => {
        const component = mount(login);
        component
            .find("#email-input")
            .simulate("change", { target: { value: "test@gmail.com" } });
        component
            .find("#pw-input")
            .simulate("change", { target: { value: "testpassword" } });

        let wrapper = component.find("#login-button");
        wrapper.simulate("click");
        expect(spyAxios_post).toHaveBeenCalledTimes(1);
    });

    it("should redirect to /signup", () => {
        const component = mount(login);
        let wrapper = component.find("#signup-button");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
