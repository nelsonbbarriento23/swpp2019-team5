import * as actionTypes from "./actionTypes";
import axios from "axios";
import { push } from "connected-react-router";

var axiosConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

export const postImage_ = outfit_metadata => {
    return {
        type: actionTypes.POST_IMAGE,
        image: outfit_metadata.image,
        items:
            outfit_metadata.items.length >= 1
                ? outfit_metadata.items
                : [{ category: "default", tags: [] }],
    };
};

export const postImage = image => {
    return dispatch => {
        return (
            axios
                .post("/api/image/", image, axiosConfig)
                //.post("/api/image/", image)
                .then(res => {
                    dispatch(postImage_(res.data));
                })
                .catch(error => {
                    console.log(error);
                })
                .then(() => dispatch(push("/createOutfit")))
                .catch(error => {
                    console.log(error);
                    dispatch(push("/createOutfit"));
                })
        );
    };
};
