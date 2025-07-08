class Lang {
    static SUCCESS = {
        USER_CREATED: "User created successfully!",
        LOGIN_SUCCESS: "Login successful!",
        PROFILE_FETCHED: "User profile fetched successfully!",
        PROFILE_UPDATED: "User profile updated successfully!",
        USERS_FETCHED: "Users retrieved successfully!",
        UPDATE_SUCCESS: "Updated successfully!",
        DELETE_SUCCESS: "User deleted successfully!",
        LOGOUT_SUCCESS: "Logout successful!",
        MESSAGE_SEND: "Message send successful!",
        STATUS_UPDATE: "Status updated successful!",
        CHAT_LIST:"Chat list",
        MESSAGE_SEEN:"Message seen updated successfull",
        MESSAGE_NOTFOUND:"Message are not found",

      };
    
      static ERROR = {
        USER_NOT_FOUND: "User not found!",
        INVALID_CREDENTIALS: "Invalid credentials!",
        UNAUTHORIZED: "Unauthorized access!",
        TOKEN_REQUIRED: "Token is required!",
        SERVER_ERROR: "Internal Server Error!",
        EMAIL_EXISTS: "Email already exists!",
        USER_ID_NOTFOUND:"User id not found"
      };
}
export default Lang;