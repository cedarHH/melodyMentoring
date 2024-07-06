import React, {useContext} from 'react';
import Button from "../components/MISC/Button";
import {AuthContext} from "../contexts/AuthContext";



const Home: React.FC = () => {
    const authContext = useContext(AuthContext)

    const debug1 = async () => {
        // @ts-ignore
        await authContext.getAttributes()
            .then((e) => {
            console.log(`${e}`)
        })
    }

    return (
        <div>
            <h1>Home Page</h1>
            <Button text="test" type="button" onClick={()=>{debug1()}}/>
        </div>
    );
}

export default Home;
