import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../../test-utils/mocks_specific";
import { history } from "../../store/store";
import axios from "axios";

import LandingPage from "./LandingPage";
import { ConnectedRouter } from "connected-react-router";

var stubInitialState = { isLoggedIn: false, userID: null };

var mockStore = getMockStore(stubInitialState, {}, {}, {}, {});

describe("<LandingPage />", () => {
    let spyHistoryPush, spyAxios_get;
    let landingPage;
    beforeEach(() => {
        landingPage = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <LandingPage history={history} />
                </ConnectedRouter>
            </Provider>
        );

        spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {
            return dispatch => {
                dispatch();
            };
        });

        spyAxios_get = jest
            .spyOn(axios, "get")
            .mockImplementation(() =>
                Promise.resolve({ data: { isLoggedIn: true } }),
            );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render properly", () => {
        const component = mount(landingPage);
        let wrapper = component.find("#Main");
        expect(wrapper.length).toBe(1);
        expect(spyAxios_get).toHaveBeenCalledTimes(1);
    });

    it("should redirect when login button is clicked", () => {
        const component = mount(landingPage);
        let wrapper = component.find("#button-container #login-button");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it("should redirect when signup button is clicked", () => {
        const component = mount(landingPage);
        let wrapper = component.find("#button-container #signup-button");
        wrapper.simulate("click");
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
});
