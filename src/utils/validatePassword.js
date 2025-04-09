export const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
  
    if (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber
    ) {
      return { isValid: true, message: "Strong password" };
    }
  
    return {
      isValid: false,
      message:
        "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
    };
  };
  