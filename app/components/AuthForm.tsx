"use client";
import Link from "next/link";
import { useState } from "react";

// definig a custom datatype for the props 
type AuthFormProps = {
    form: 'login' | 'signup'
}

export default function AuthForm(props: AuthFormProps) {

    const [formData, setformData] = useState({
        email: 'Your email', name: 'Your Name', password: '', confirmPassword: '', role: 'Choose Role'
    })

    // validatng form 
    function NoEmptyField(){
        if(formData.email !== '' && formData.password !== ''){
            // returning true
            return true
        }
        if(props.form === 'signup')
        {
            if(formData.confirmPassword !== '' && formData.name !== ''){
            return true
        }
        }

        console.log("none of the field can be empty")
        return false
    }

    // validating email
    function validateEmail() {
    const email = formData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        console.log("Valid email");
        return true;
    } else {
        console.log("Invalid email");
        return false;
    }
}

//  matching the password and the confirm password
    function validatePasswordandConfirmPassword(){
        if(formData.password === formData.confirmPassword){
            return true
        }
        else{
            console.log("password mismatch")
            return false
        }
    }

    // check the password length
    function passwordLength(){
        console.log("password" , formData.password)
        console.log(formData.confirmPassword)
        if(formData.password.length >= 8)
        {
            return true
        }
        else {
            console.log("pasword must be 8 characters long")
            return false
        }
    }



    // fucntoin to validate the whole form 
    function validateForm(){
        // checking if all the fields are non empty
        if(!(NoEmptyField())){
            return false
        }
        // checking the syntax of the email
        if(!(validateEmail())){
            return false
        }

        if(!(passwordLength())){
            return false
        }
        // if the form is for signup 
        if (props.form === 'signup'){
            if(!(validatePasswordandConfirmPassword())){
            return false
        }
        }

        return true
    }

    // login handler function when the login button is clicked
    function loginHandler() {
        let email: String = formData.email;
        let password: String = formData.password;

        
        if(validateForm()){
            // api call for login
            console.log("Login Api call.")
        }

        

        
    }

    // signup handler funcoitn for the signup button click
    function signupHandler() {
        let email: String = formData.email;
        let password: String = formData.password;
        let confirmPassword: String = formData.confirmPassword;
        let name: String = formData.name;
        let role: String = formData.role;

        if(validateForm()){
            // api call for signup
            console.log("singnup Api call.")
        }

    }


    return (
        <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
            <div className="bg-[#3a3a3a] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5">
                <h1 className="text-white text-2xl font-bold text-center">
                    {props.form === 'login' ? 'Login' : 'Signup'}
                </h1>

                <input
                    type="email"
                    placeholder= {formData.email}
                    onChange={(e) => setformData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-lg bg-[#1b1b1b] text-white placeholder-[#929292] focus:outline-none focus:ring-2 focus:ring-[#34b7ff]"
                />

                {props.form === 'signup' && (
                    <>

                        <input
                            type="text"
                            placeholder={formData.name}
                            onChange={(e) => setformData({ ...formData, name: e.target.value })}
                            className="w-full p-3 rounded-lg bg-[#1b1b1b] text-white placeholder-[#929292] focus:outline-none focus:ring-2 focus:ring-[#34b7ff]"
                        />
                        <select
                            name="role"
                            id="role"
                            onChange={(e) => setformData({ ...formData, role: e.target.value })}
                            className="w-full p-3 rounded-lg bg-[#1b1b1b] text-white focus:outline-none focus:ring-2 focus:ring-[#34b7ff]"
                        >
                            <option className="bg-[#1b1b1b] text-white" value="Manager">Manager</option>
                            <option className="bg-[#1b1b1b] text-white" value="Employee">Employee</option>
                        </select>
                    </>
                )}

                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setformData({ ...formData, password: e.target.value })}
                    placeholder="Password"
                    className="w-full p-3 rounded-lg bg-[#1b1b1b] text-white placeholder-[#929292] focus:outline-none focus:ring-2 focus:ring-[#34b7ff]"
                />

                {props.form === 'signup' ? <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setformData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm Password"
                    className="w-full p-3 rounded-lg bg-[#1b1b1b] text-white placeholder-[#929292] focus:outline-none focus:ring-2 focus:ring-[#34b7ff]"
                /> : <></>}

                <button
                    onClick={props.form === 'login' ? loginHandler : signupHandler}
                    className="w-full p-3 rounded-lg bg-[#34b7ff] text-black font-semibold hover:bg-[#303030] transition"
                >
                    {props.form === 'login' ? 'Login' : 'Signup'}
                </button>

                {props.form === 'login' ? <p className="text-center text-sm text-[#929292]">Don't have an account ? <Link href="/signup" className="text-[#34b7ff] hover:underline">Signup</Link></p> : <p className="text-center text-sm text-[#929292]">Already have an account ? <Link href="/login" className="text-[#34b7ff] hover:underline">Login</Link></p>}
            </div>
        </div>
    );
}
