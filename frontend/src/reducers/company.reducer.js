const initialState = {
    isAuthenticated: false,
  }
  
  const comStore = (state = initialState, action) => {
  
    const{ type, payload } = action;
  
    switch (type) {
  
      case "GET_COMPANY_PROFILE":
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        }    
        
      case "GET_COMPANY_REVIEWS":
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        }   

      case "ADD_COMPANY_REVIEWS":
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        }   

      case "ADD_COMPANY_SALARIES":
        return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }

      case "ADD_COMPANY_INTERVIEW":
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        }

      case "GET_COMPANY_JOBS":
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        }
        
      default:
        return state;
    }
  }
  
  export default comStore;