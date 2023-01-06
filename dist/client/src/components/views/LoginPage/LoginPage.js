"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var user_actions_1 = require("../../../_actions/user_actions");
var formik_1 = require("formik");
var Yup = require("yup");
var antd_1 = require("antd");
var react_redux_1 = require("react-redux");
var Title = antd_1.Typography.Title;
function LoginPage(props) {
    var dispatch = react_redux_1.useDispatch();
    var rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    var _a = react_1.useState(''), formErrorMessage = _a[0], setFormErrorMessage = _a[1];
    var _b = react_1.useState(rememberMeChecked), rememberMe = _b[0], setRememberMe = _b[1];
    var handleRememberMe = function () {
        setRememberMe(!rememberMe);
    };
    var initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';
    return (<formik_1.Formik initialValues={{
        email: initialEmail,
        password: '',
    }} validationSchema={Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    })} onSubmit={function (values, _a) {
        var setSubmitting = _a.setSubmitting;
        setTimeout(function () {
            var dataToSubmit = {
                email: values.email,
                password: values.password
            };
            dispatch(user_actions_1.loginUser(dataToSubmit))
                .then(function (response) {
                if (response.payload.loginSuccess) {
                    window.localStorage.setItem('userId', response.payload.userId);
                    if (rememberMe === true) {
                        window.localStorage.setItem('rememberMe', values.id);
                    }
                    else {
                        localStorage.removeItem('rememberMe');
                    }
                    props.history.push("/");
                }
                else {
                    setFormErrorMessage('Check out your Account or Password again');
                }
            })
                .catch(function (err) {
                setFormErrorMessage('Check out your Account or Password again');
                setTimeout(function () {
                    setFormErrorMessage("");
                }, 3000);
            });
            setSubmitting(false);
        }, 500);
    }}>
      {function (props) {
        var values = props.values, touched = props.touched, errors = props.errors, dirty = props.dirty, isSubmitting = props.isSubmitting, handleChange = props.handleChange, handleBlur = props.handleBlur, handleSubmit = props.handleSubmit, handleReset = props.handleReset;
        return (<div className="app">

            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <antd_1.Form.Item required>
                <antd_1.Input id="email" prefix={<antd_1.Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Enter your email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? 'text-input error' : 'text-input'}/>
                {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}
              </antd_1.Form.Item>

              <antd_1.Form.Item required>
                <antd_1.Input id="password" prefix={<antd_1.Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Enter your password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? 'text-input error' : 'text-input'}/>
                {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
              </antd_1.Form.Item>

              {formErrorMessage && (<label><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>)}

              <antd_1.Form.Item>
                <antd_1.Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>Remember me</antd_1.Checkbox>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                  forgot password
                  </a>
                <div>
                  <antd_1.Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                </antd_1.Button>
                </div>
                Or <a href="/register">register now!</a>
              </antd_1.Form.Item>
            </form>
          </div>);
    }}
    </formik_1.Formik>);
}
;
exports.default = react_router_dom_1.withRouter(LoginPage);
