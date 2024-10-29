export function validation(email,pass)
{
    const eml = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const ps= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);
    if(!eml)
      return "Email not valid";
    if(!ps)
        return "Password not valid";
    return null;
}