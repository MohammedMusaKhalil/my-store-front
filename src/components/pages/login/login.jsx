import './login.scss'; // Import your CSS file here
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import Api from '../../../tools/api';
import { AppContext } from '../../layout/Layout';
import { useCookies } from 'react-cookie';
import AppBar from "../../layout/AppBar";
import Footer from '../../layout/Footer';

function showSignUp() {
    const hiThereMessage = document.getElementById("move_div_left");
    const moveFormRight = document.getElementById("move_form_right");
    const moveFormLeft = document.getElementById("move_form_left");
    const welcomeBackMessage = document.getElementById("move_div_right");
    const signIn_form = document.getElementById("test1");
    const createAccount_form = document.getElementById("test2");
    const hiThere = document.getElementById("test3");
    const welcomeBack = document.getElementById("test4");
  
    signIn_form.classList.add("display_none");
    signIn_form.classList.remove("display_block");
    createAccount_form.classList.add("display_block");
    createAccount_form.classList.remove("display_none");
    hiThere.classList.add("display_none");
    hiThere.classList.remove("display_block");
    welcomeBack.classList.add("display_block");
    welcomeBack.classList.remove("display_none");
  
    hiThereMessage.classList.add("move_left");
    hiThereMessage.classList.remove("moveRightOriginal");
    welcomeBackMessage.classList.add("move_left");
    welcomeBackMessage.classList.remove("moveRightOriginal");
  
    moveFormRight.classList.add("move_right");
    moveFormRight.classList.remove("moveLeftOriginal");
  
    moveFormLeft.classList.add("move_right");
    moveFormLeft.classList.remove("moveLeftOriginal");
  }
  
  function showSignIn() {
    const hiThereMessage = document.getElementById("move_div_left");
    const moveFormRight = document.getElementById("move_form_right");
    const moveFormLeft = document.getElementById("move_form_left");
    const welcomeBackMessage = document.getElementById("move_div_right");
    const signIn_form = document.getElementById("test1");
    const createAccount_form = document.getElementById("test2");
    const hiThere = document.getElementById("test3");
    const welcomeBack = document.getElementById("test4");
  
    hiThereMessage.classList.remove("move_left");
    hiThereMessage.classList.add("moveRightOriginal");
    welcomeBackMessage.classList.remove("move_left");
    welcomeBackMessage.classList.add("moveRightOriginal");
  
    signIn_form.classList.add("display_block");
    signIn_form.classList.remove("display_none");
    createAccount_form.classList.add("display_none");
    createAccount_form.classList.remove("display_block");
    hiThere.classList.add("display_block");
    hiThere.classList.remove("display_none");
    welcomeBack.classList.add("display_none");
    welcomeBack.classList.remove("display_block");
  
    moveFormRight.classList.remove("move_right");
    moveFormRight.classList.add("moveLeftOriginal");
  
    moveFormLeft.classList.add("moveLeftOriginal");
    moveFormLeft.classList.remove("move_right");
  }
export default function LoginPage() {
    const [state, setState] = useState({});
    const [state2, setstate2] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const appContext = useContext(AppContext)

    // init local state
    const [cookie, setCookie] = useCookies('token')

    const callLogin = async () => {
        // check fields 
        if (
            (state.email == null || state.email.length == 0) ||
            (state.password == null || state.password.length == 0)
        ) {
            appContext.showPopup('Please Fill All the fields')
            return
        }

        // calling API
        const response = await Api.fetch({
            url: 'login',
            body: state,
            method: 'PUT',
            showPopup: appContext.showPopup,
        })

        // check API Response        
        if (response != null) {
            // show message
            appContext.showPopup(response.message)

            // save token (appState - Cockies)
            if (response.token != null) {
                appContext.login(response.token, null)
                setCookie('token', response.token)
                localStorage.setItem('token', response.token)


                // redirect to homepage                
                window.location.href = '/'

            }
        }
    }
    const callRegister = async () => {
        // check fields 
        if (
            (state2.name == null || state2.name.length == 0) ||
            (state2.email == null || state2.email.length == 0) ||
            (state2.password == null || state2.password.length == 0) ||
            (state2.password_confirmation == null || state2.password_confirmation.length == 0)
        ) {
            appContext.showPopup('Please Fill All the fields')
            return
        }
        // check password is same or not
        if (state2.password != state2.password_confirmation) {
            appContext.showPopup('Passowrds are not matched')
            return
        }
        // calling API
        const response = await Api.fetch({
            url: 'register',
            body: state2,
            method: 'POST',
            showPopup: appContext.showPopup,
        })

        // check API Response        
        if (response != null) {
            // show message
            appContext.showPopup(response.message)

            // save token (appstate2 - Cockies)
            if (response.token != null) {
                appContext.login(response.token, null)
                setCookie('token', response.token)
                localStorage.setItem('token',response.token)
                // redirect to homepage
                window.location.href = '/'
            }
        }
    }


    return (
        <div >    
            <AppBar/>
            <div className="main_container" style={{marginTop:'4px'}}>
                <div className="login_form" id="move_form_right">
                    <div className="display_block" id="test1">
                        <h1 id="sign_in">Sign in</h1>
                       
                        <h2 id="alternative">or use your account</h2>
                        <form action="" className="form">
                            <input id="check_login_email" type="email" placeholder="Email" name="email" onChange={handleInputChange} />
                            <input id="check_login_password" type="password" placeholder="Enter your Password" name="password" onChange={handleInputChange} />
                            <Button id="signin_btn" onClick={(e) => {
                        e.preventDefault()
                        callLogin()
                    }} >SIGN IN</Button>
                        </form>
                    </div>
                    <div className="display_none" id="test2">
                        <h1 id="create_account">Create Account</h1>
                        <div className="icons_2">
                            <div className="facebook"><i className="fa-brands fa-facebook fa-2xl spacing icon_behaviour"></i></div>
                            <div className="google"><i className="fa-brands fa-google fa-2xl spacing icon_behaviour"></i></div>
                            <div className="linkden"><i className="fa-brands fa-linkedin-in fa-2xl spacing icon_behaviour"></i></div>
                        </div>
                        <h2 id="alternative_2">or use your email for registration</h2>
                        <form action="" className="form">
                            <input id="check_login_name"  type="name" placeholder="Name"  onChange={(e) => {
                                setstate2({ ...state2, name: e.target.value })
                            }}/>
                            <input id="check_login_email" type="email" placeholder="Email"  onChange={(e) => {
                                setstate2({ ...state2, email: e.target.value })
                            }}/>
                            <input id="check_login_password" type="password" placeholder="Password"  onChange={(e) => {
                                setstate2({ ...state2, password: e.target.value })
                            }}/>
                            <input id="check_login_password_confirmation" type="password" placeholder="password_confirmation"  onChange={(e) => {
                                setstate2({ ...state2, password_confirmation: e.target.value })
                            }} style={{ marginBottom:'15px'}}/>
                            <Button id="signup_btn_2" onClick={(e) => {
                        e.preventDefault()
                        callRegister()
                    }}  >SIGN UP</Button>
                        </form>
                    </div>
                </div>

                {/* The skeleton for the login message starts from here */}
                <div className="login_message" id="move_div_left">
                    <div className="display_block" id="test3">
                        <h1 id="welcome_title">Hi There!</h1>
                        <span id="welcome_text">Enter Some Personal Details and get Ready to <span id="text_split">Start your Journey with Us!</span></span>
                        <Button id="signup_btn" onClick={showSignUp}>SIGN UP</Button>
                    </div>
                    {/* The skeleton for the Welcome Back Div starts from here! */}
                    <div className="display_none" id="test4">
                        <h1 id="welcome_back_title">Welcome Back</h1>
                        <span id="welcome_text_2">To Keep Connected With Us Please Login<span id="text_split_2">with Your Personal Info</span></span>
                        <Button id="signup_btn" onClick={showSignIn}>SIGN IN</Button>
                    </div>
                </div>

                {/* The skeleton for the Welcome Back Div starts from here! */}
                <div className="welcome_back" id="move_div_right">
                    <div className="" id="test4">
                        <h1 id="welcome_back_title">Welcome Back</h1>
                        <span id="welcome_text_2">To Keep Connected With Us Please Login<span id="text_split_2">with Your Personal Info</span></span>
                        <Button id="signup_btn" onClick={showSignIn}>SIGN IN</Button>
                    </div>
                </div>

                {/* The Skeleton for the Sign Up Div starts from here! */}
                <div className="sign_up" id="move_form_left">
                    <div className="display_none" id="test2">
                        <h1 id="create_account">Create Account</h1>
                        <div className="icons_2">
                            <div className="facebook"><i className="fa-brands fa-facebook fa-2xl spacing icon_behaviour"></i></div>
                            <div className="google"><i className="fa-brands fa-google fa-2xl spacing icon_behaviour"></i></div>
                            <div className="linkden"><i className="fa-brands fa-linkedin-in fa-2xl spacing icon_behaviour"></i></div>
                        </div>
                        <h2 id="alternative_2">or use your email for registration</h2>
                        <form action="" className="form">
                            <input type="text" id="check_login_name" placeholder="Name" />
                            <input id="check_login_email" type="email" placeholder="Email" />
                            <input id="check_login_password" type="password" placeholder="Password" />
                            <Button id="signup_btn_2">SIGN UP</Button>
                        </form>
                    </div>
                </div>
            </div>
          
        </div>
    );
}
