import {auth} from './../../utils/firebase'
import { useEffect, useState, useContext } from 'react'
import { CartContext } from './../../context/CartContext'
import { signInWithPopup, signInWithCredential,GoogleAuthProvider, signOut  } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import UserOrders from './../UserOrders/UserOrders';
import './styles.css'

const Users = () => {
    const cartC = useContext(CartContext)
    const [userBool, setUserBool] = useState(localStorage.getItem('idToken') ? 1 : 0)
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider()    
    auth.languageCode = 'es'
    
    useEffect(() => {
        if(localStorage.getItem('idToken')){
            const credential = GoogleAuthProvider.credential(localStorage.getItem('idToken'))
            signInWithCredential(auth, credential).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;                                
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode)            
                console.log(errorMessage)
                console.log(credential)    
                logout()            
            })       
            console.log('idToken: Successful')                
        }   
    }, [])
    
    useEffect(() => {
        if(userBool===0){
            navigate('/users')
        }        
    },[userBool, navigate])
    
    
    const iniciarSesion = () => {                          
        return(
            <>
            <div className='userProfile'>
                <div className='userInfo'>
                    <div></div>                        
                    <span>Iniciar Sesión</span>
                    <button onClick={ () => { singin() } }>Iniciar Sesión</button>                        
                </div>                    
            </div>                
            </>
        )         
    }

    const infoUsuario = () => {  
        return(
            <div className='userProfile'>
                <div>
                    <div className='userInfo'>
                        <div><img src={JSON.parse(localStorage.getItem('user')).photoURL} alt="user" /></div>
                        <div>
                            <span>Nombre</span>
                            <h4>{JSON.parse(localStorage.getItem('user')).displayName}</h4>
                            <span>Correo</span>
                            <h4>{JSON.parse(localStorage.getItem('user')).email}</h4>
                        </div>                        
                    </div>
                    <button onClick={ () => { logout() } }>Cerrar Sesión</button>
                </div> 
                <div>
                    <UserOrders />
                </div>               
            </div>
        )        
    }
    
    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.             
            localStorage.removeItem('idToken')                
            localStorage.removeItem('user')    
            setUserBool(0)
        })
        
    }

    const singin = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);                
                // The signed-in user info.                                            
                const auxUI = {
                    name:(result.user.displayName.substring(0,result.user.displayName.indexOf(" "))),
                    lastname:(result.user.displayName.substring(result.user.displayName.indexOf(" "))),
                    email:result.user.email,
                    repeatEmail:result.user.email,
                    phone:cartC.userInfo.phone,
                    id:result.user.uid
                }
                cartC.setUserInfo(auxUI)
                localStorage.setItem('userInfo',JSON.stringify(auxUI))
                localStorage.setItem('idToken',credential.idToken)                
                localStorage.setItem('user',JSON.stringify(result.user))                     
                setUserBool(1)
        }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorCode)            
                console.log(errorMessage)
                console.log(credential)
                localStorage.removeItem('idToken')                
                localStorage.removeItem('user') 
        })
    }
    return( localStorage.getItem('idToken') ? infoUsuario():iniciarSesion())
}

export default Users