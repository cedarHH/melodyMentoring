import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const Callback: React.FC = () => {
    const navigate = useNavigate();
    const hasFetchedToken = useRef(false);

    useEffect(() => {
        const handleCallback = async () => {
            if (hasFetchedToken.current) return;
            hasFetchedToken.current = true;

            const { code } = queryString.parse(window.location.search);

            if (code && typeof code === 'string') {
                const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN;
                const clientId = process.env.REACT_APP_CLIENT_ID;
                const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
                const redirectUri = process.env.REACT_APP_REDIRECT_URI;
                const region = process.env.REACT_APP_REGION;

                if (!cognitoDomain || !clientId || !clientSecret || !redirectUri || !region) {
                    console.error('Missing environment variables');
                    return;
                }

                const credentials = `${clientId}:${clientSecret}`;
                const base64Credentials = btoa(credentials);
                const basicAuthorization = `Basic ${base64Credentials}`;
                const tokenResponse = await fetch(`https://${cognitoDomain}.auth.${region}.amazoncognito.com/oauth2/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: basicAuthorization,
                    },
                    body: `grant_type=authorization_code&client_id=${clientId}&code=${code}&redirect_uri=${redirectUri}`
                });
                const tokenData = await tokenResponse.json();

                // Store the JWT and use it to access your backend
                localStorage.setItem('id_token', tokenData.id_token);
                localStorage.setItem('access_token', tokenData.access_token);
                localStorage.setItem('refresh_token', tokenData.refresh_token);

                // Redirect to the protected page or another page in your app
                navigate('/home');
            }
        };

        handleCallback().catch(error => {
            console.error('Error handling callback:', error);
        });
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Callback;
