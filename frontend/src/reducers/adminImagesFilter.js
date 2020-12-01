import { COMPANY_IMAGE_GET, COMPANY_IMAGE_GET_ERROR, COMPANY_IMAGE_POST_APPROVAL, COMPANY_IMAGE_POST_APPROVAL_ERROR } from "../actions/types";
import { COMPANY_PROFILE_IMAGE_GET, COMPANY_PROFILE_IMAGE_GET_ERROR, COMPANY_PROFILE_IMAGE_POST_APPROVAL, COMPANY_PROFILE_IMAGE_POST_APPROVAL_ERROR } from "../actions/types";
import { STUDENT_PROFILE_IMAGE_GET, STUDENT_PROFILE_IMAGE_GET_ERROR, STUDENT_PROFILE_IMAGE_POST_APPROVAL, STUDENT_PROFILE_IMAGE_POST_APPROVAL_ERROR } from "../actions/types";

const initialState = {
    companyImages : null, 
    companyImagesError : null,
    postCompanyImageApproval : null,
    postCompanyImageError : null,

    companyProfileImages : null, 
    companyProfileImagesError : null,
    postCompanyProfileImageApproval : null,
    postCompanyProfileImageError : null,

    companyStudentImages : null, 
    companyStudentImagesError : null,
    postStudentProfileImageApproval : null,
    postStudentProfileImageError : null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case COMPANY_IMAGE_GET:
            return {
                ...state,
                loading: false,
                companyImages : payload, 
                companyImagesError : null,
                postCompanyImageApproval : null,
                postCompanyImageError : null,

                companyProfileImages : null, 
                companyProfileImagesError : null,
                postCompanyProfileImageApproval : null,
                postCompanyProfileImageError : null,

                companyStudentImages : null, 
                companyStudentImagesError : null,
                postStudentProfileImageApproval : null,
                postStudentProfileImageError : null,
            }
        case COMPANY_IMAGE_GET_ERROR:
            return {
                ...state,
                loading: false,
                companyImages : null, 
                companyImagesError : payload,
                postCompanyImageApproval : null,
                postCompanyImageError : null,

                companyProfileImages : null, 
                companyProfileImagesError : null,
                postCompanyProfileImageApproval : null,
                postCompanyProfileImageError : null,

                companyStudentImages : null, 
                companyStudentImagesError : null,
                postStudentProfileImageApproval : null,
                postStudentProfileImageError : null,
            }
        case COMPANY_IMAGE_POST_APPROVAL:
            return {
                ...state,
                loading: false,
                companyImages : null, 
                companyImagesError : null,
                postCompanyImageApproval : payload,
                postCompanyImageError : null,

                companyProfileImages : null, 
                companyProfileImagesError : null,
                postCompanyProfileImageApproval : null,
                postCompanyProfileImageError : null,

                companyStudentImages : null, 
                companyStudentImagesError : null,
                postStudentProfileImageApproval : null,
                postStudentProfileImageError : null,
            }
        case COMPANY_IMAGE_POST_APPROVAL_ERROR:
            return {
                ...state,
                loading: false,
                companyImages : null, 
                companyImagesError : null,
                postCompanyImageApproval : null,
                postCompanyImageError : payload,

                companyProfileImages : null, 
                companyProfileImagesError : null,
                postCompanyProfileImageApproval : null,
                postCompanyProfileImageError : null,

                companyStudentImages : null, 
                companyStudentImagesError : null,
                postStudentProfileImageApproval : null,
                postStudentProfileImageError : null,
            }
        default:
            return state;
    }
}