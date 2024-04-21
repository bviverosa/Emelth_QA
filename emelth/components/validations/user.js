import axios from 'axios'
import { signIn } from 'next-auth/react';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,15}$/;

function validateUserRegister(data){
  console.log(data)
    if(validateUser(data.username,data.password)&&validateRol(data.rol)){
        axios.post("http://192.168.137.1:3001/register", data)
          .then(res => {
            let data = res.data;
            if (data.Status) {
              return ("Usuario Registrado")
    
            } else {
              return('Error al registrar. Por favor, intente de nuevo.');
            }
          })
          .catch(err => {
            console.log(err);

            // Handle error, display error message
            return('Error al iniciar sesión. Por favor, intente de nuevo.');
          });
          
        }else{
          return("Rellene todos los campos correctamente");
        }
    }
async function validateUserLogin(data){
  if(validateUser(data.username,data.password)){
    await signIn("credentials",
      {
        username:data.username,
        password:data.password,
        redirect:true,
        callbackUrl:"/"
      }); 
  }

}



function validateUser(user,password){
    return(emailRegex.test(user)&&passwordRegex.test(password));
}

function validateRol(rol){
     let number =parseInt(rol);
     return(number>0&&number<4);
}

export { validateUserRegister, validateUserLogin };
