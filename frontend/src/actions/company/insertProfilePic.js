// import axios from "axios";
// import { setAlert } from "../alert";
// import { POST_IMAGE, IMAGE_ERROR } from "../types";

// export const insertProfilePic = (image, companyId, companyName) => async(dispatch) => {
//     console.log('inside insertUserImage')
//     try {
//         console.log("inside insertProfilePic action, image is ", image);
//         console.log("inside insertProfilePic action, Email is", companyId);
//         let formData = new FormData();
//         console.log("inside insertProfilePic action, before append, formData is", formData)
//         formData.append("image", image);
//         formData.append("company", companyName)
//         console.log("inside insertProfilePic action, formData content is", formData.get("image"))
//         const config = {
//             headers: { "content-type": "multipart/form-data" },
//         };
//         const res = await axios
//             .post(`http://localhost:3001/api/userprofilepic/${companyId}`, formData, config)
//             .then((response) => {
//                 alert("Image uploaded successfully");
//                 console.log("response is ", response);
//             });
//     } catch (err) {
//         const errors = err.response.data.errors;
//         if (errors) {
//             errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//         }
//         dispatch({
//             type: IMAGE_ERROR,
//             payload: { msg: err, status: err.response.status },
//         });
//     }
// };

// // export default insertProfilePic;