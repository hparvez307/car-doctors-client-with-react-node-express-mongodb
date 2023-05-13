import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';


    const googleLogIn = () => {
        googleSignIn()
        .then( result => {
            console.log(result.user)
            navigate(from,{replace: true});
        })
        .catch(er => console.log(er.message))
    }


    return (
        <div>
            <div className="divider">OR</div>

            <div className='text-center'>
                <button onClick={googleLogIn} className="btn btn-circle btn-outline">
                    G
                </button>
              
            </div>

        </div>
    );
};

export default SocialLogin;