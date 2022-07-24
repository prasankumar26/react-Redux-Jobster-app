import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    // get user from redux store 
    const {user} = useSelector((store) => store.user)

    if(!user){
        return <Navigate to='/landing' />
    }

  return children
}

export default ProtectedRoute

