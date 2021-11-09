import React from 'react';
import './styles.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Cookies from 'js-cookie';

function Login() {

  type User = {
    user_mail: string
    user_password: string
  }

  type ErrorLogin = {
    visible: boolean
    message: string
  }
  
  const {register, handleSubmit} = useForm();

  const [loginData, setLoginData] = useState<User | any>();
  
  const [errorLogin, setErrorLogin] = useState<ErrorLogin>();

  const onSubmit = (data:User) => {
    data && setLoginData(data);
  };

  useEffect(() => {

    setErrorLogin({visible: false, message: ""})
    
    if(loginData?.user_mail !== undefined && loginData?.user_mail !== "" && loginData?.user_password !== undefined && loginData?.user_password !== ""){
      axios({
        method: 'post',
        url: 'https://books.ioasys.com.br/api/v1/auth/sign-in',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          email: loginData?.user_mail,
          password: loginData?.user_password
        }
      }).then(async function (response) {
        await Cookies.set("userAuth", JSON.stringify({nome: response.data.name, token: response.headers.authorization}));
        window.location.assign("/");
      }).catch(function (error) {
        let jsonErrors:any = error.toJSON();
        if(jsonErrors.status === 401) {
          setErrorLogin({visible: true, message: "Email e/ou senha incorretos!"})
        }
      });;
    }
    
  }, [loginData]);

  return (
    <>
      <div className="login">
        <main>
            <section>
              <p className="title"><b>ioasys</b> Books</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form">
                      <div className="item">
                          <div className="item__label">
                              <p className="item__label__text">Email</p>
                          </div>
                          <div className="item__content">
                              <input type="email" required {...register("user_mail")} />
                          </div>
                      </div>
                       
                      <div className="item">
                          <div className="item__label">
                              <p className="item__label__text">Senha</p>
                          </div>
                          <div className="item__content">
                              <input type="password" required {...register("user_password")} />
                              <button className="item__content__btn" type="submit">
                                  Entrar
                              </button>
                          </div>
                      </div>

                      {errorLogin?.visible && (
                        <div className="tooltip">
                          {errorLogin.message}
                        </div>
                      )}

                  </div>
              </form>

            </section>
        </main>
      </div>      
    </>
  );
}

export default Login;
