import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (values) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/register/user`, {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });

      return response.data; // Return response data or handle as needed
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network error");
    }
};

export const loginUser = async(email, password, signIn) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/api/auth/login/user`, {
            email: email,
            password: password,
        });
    
        // Use react-auth-kit's signIn to set up session
        const isAuthenticated = signIn({
            auth: {
                token: response.data.accessToken,
                type: response.data.tokenType
            },
            userState: response.data.user
        });
    
        if (!isAuthenticated) throw new Error("Failed to authenticate");
    
        return response.data; // Optionally return data if needed
      } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
      }
}

export const registerAdmin = async(values) => {
    console.log(values);
    try {
        const response = await axios.post(`${apiBaseUrl}/api/auth/register/admin`, {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          centerId: values.centerId,
        });
  
        return response.data; // Return response data or handle as needed
      } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
      }
}

export const loginAdmin = async(email, password, signIn) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/api/auth/login/admin`, {
            email: email,
            password: password,
        });
    
        // Use react-auth-kit's signIn to set up session
        const isAuthenticated = signIn({
            auth: {
                token: response.data.accessToken,
                type: response.data.tokenType
            },
            userState: response.data.user
        });
    
        if (!isAuthenticated) throw new Error("Failed to authenticate");
    
        return response.data; // Optionally return data if needed
      } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
      }
}