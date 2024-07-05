export {}
// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import queryString from 'query-string';
// import {CLIENT_ID, COGNITO_DOMAIN, REDIRECT_URI, AWS_REGION} from "../constants/awsCognitoConf";
//
// const Callback: React.FC = () => {
//     const navigate = useNavigate();
//     const hasFetchedToken = useRef(false);
//
//     useEffect(() => {
//         const handleCallback = async () => {
//             if (hasFetchedToken.current) return;
//             hasFetchedToken.current = true;
//
//             const { code } = queryString.parse(window.location.search);
//
//             if (code && typeof code === 'string') {
//                 if (!COGNITO_DOMAIN || !CLIENT_ID || !REDIRECT_URI || !AWS_REGION) {
//                     console.error('Missing environment variables');
//                     return;
//                 }
//
//                 const credentials = `${CLIENT_ID}:None`;
//                 const base64Credentials = btoa(credentials);
//                 const basicAuthorization = `Basic ${base64Credentials}`;
//                 const tokenResponse = await fetch(`https://${COGNITO_DOMAIN}.auth.${AWS_REGION}.amazoncognito.com/oauth2/token`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                         Authorization: basicAuthorization,
//                     },
//                     body: `grant_type=authorization_code&client_id=${CLIENT_ID}&code=${code}&redirect_uri=${REDIRECT_URI}`
//                 });
//                 const tokenData = await tokenResponse.json();
//
//                 // Store the JWT and use it to access your backend
//                 localStorage.setItem('id_token', tokenData.id_token);
//                 localStorage.setItem('access_token', tokenData.access_token);
//                 localStorage.setItem('refresh_token', tokenData.refresh_token);
//
//                 // Redirect to the protected page or another page in your app
//                 navigate('/home');
//             }
//         };
//
//         handleCallback().catch(error => {
//             console.error('Error handling callback:', error);
//         });
//     }, [navigate]);
//
//     return <div>Loading...</div>;
// };
//
// export default Callback;
