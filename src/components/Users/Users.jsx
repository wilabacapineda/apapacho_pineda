import {auth} from './../../utils/firebase'
import { useEffect, useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { CartContext } from './../../context/CartContext'
import { signInWithPopup, signInWithCredential,GoogleAuthProvider, signOut  } from "firebase/auth";
import { useParams } from "react-router-dom"
import './styles.css'

const Users = () => {
    const cartC = useContext(CartContext)
    const [usuario,setUsuario]=useState([])
    const {login} = useParams()
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider()    
    auth.languageCode = 'es'

    useEffect(() => {
        navigate('/users/login') 
    }, [])

    const iniciarSesion = () => {
        if(localStorage.getItem('idToken')){            
            const credential = GoogleAuthProvider.credential(localStorage.getItem('idToken'))
            signInWithCredential(auth, credential).then((result) => {
                // The signed-in user info.   
                cartC.setIdToken(localStorage.getItem('idToken'))                                         
                localStorage.setItem('user',JSON.stringify(result.user))   
                setUsuario(result.user) 
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
                navigate('/users/')                
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message; 
                console.log(errorMessage)               
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            })            
        } else {            
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);                
                // The signed-in user info.                            
                localStorage.setItem('idToken',credential.idToken)                
                localStorage.setItem('user',JSON.stringify(result.user))     
                setUsuario(result.user)             
                cartC.setIdToken(credential.idToken)               
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

                navigate('/users/')                
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });           
        }
    }

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('idToken')                
            localStorage.removeItem('user')     
            setUsuario([])             
            cartC.setIdToken("")   
        })
    }

    const infoUsuario = () => {  
        if(usuario.uid){            
            return(
                <>
                <div>
                    <div className='userInfo'>
                        <div><img src={usuario.photoURL} alt="user image" /></div>
                        <div>
                            <span>Nombre</span>
                            <h4>{usuario.displayName}</h4>
                            <span>Correo</span>
                            <h4>{usuario.email}</h4>
                        </div>                        
                    </div>
                    <button onClick={ () => { logout() } }>Cerrar Sesión</button>
                </div>
                
                </>
            )
        } 
    }

    return( login==="login" ? iniciarSesion() : infoUsuario())
}

export default Users