export const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/;
    return regex.test(email);
  };
  