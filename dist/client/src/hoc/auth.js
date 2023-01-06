"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/exhaustive-deps */
var react_1 = require("react");
var user_actions_1 = require("../_actions/user_actions");
var react_redux_1 = require("react-redux");
function default_1(SpecificComponent, option, adminRoute) {
    if (adminRoute === void 0) { adminRoute = null; }
    function AuthenticationCheck(props) {
        var user = react_redux_1.useSelector(function (state) { return state.user; });
        var dispatch = react_redux_1.useDispatch();
        react_1.useEffect(function () {
            //To know my current status, send Auth request 
            dispatch(user_actions_1.auth()).then(function (response) {
                //Not Loggined in Status 
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login');
                    }
                    //Loggined in Status 
                }
                else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    }
                    //Logged in Status, but Try to go into log in page 
                    else {
                        if (option === false) {
                            props.history.push('/');
                        }
                    }
                }
            });
        }, []);
        return (<SpecificComponent {...props} user={user}/>);
    }
    return AuthenticationCheck;
}
exports.default = default_1;
