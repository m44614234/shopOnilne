import { base_url } from "./baseURL";

export const logout = async () => {

    try {
      const response = await fetch(`${base_url}/user/logout`, {
        method: 'POST',
        credentials: 'include', // این گزینه برای ارسال کوکی‌ها ضروری است
      });
  
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error; // می‌توانید خطا را مدیریت کنید یا به کاربر اطلاع دهید
    }
  };
  