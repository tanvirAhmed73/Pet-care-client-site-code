import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const AdminRoutes = ({Children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return Children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoutes;