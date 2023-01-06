"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var moment_1 = require("moment");
var formik_1 = require("formik");
var Yup = require("yup");
var user_actions_1 = require("../../../_actions/user_actions");
var react_redux_1 = require("react-redux");
var antd_1 = require("antd");
var formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
var tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
function RegisterPage(props) {
    var dispatch = react_redux_1.useDispatch();
    return (<formik_1.Formik initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
    }} validationSchema={Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    })} onSubmit={function (values, _a) {
        var setSubmitting = _a.setSubmitting;
        setTimeout(function () {
            var dataToSubmit = {
                email: values.email,
                password: values.password,
                name: values.name,
                lastname: values.lastname,
                image: "http://gravatar.com/avatar/" + moment_1.default().unix() + "?d=identicon"
            };
            dispatch(user_actions_1.registerUser(dataToSubmit)).then(function (response) {
                if (response.payload.success) {
                    props.history.push("/login");
                }
                else {
                    alert(response.payload.err.errmsg);
                }
            });
            setSubmitting(false);
        }, 500);
    }}>
      {function (props) {
        var values = props.values, touched = props.touched, errors = props.errors, dirty = props.dirty, isSubmitting = props.isSubmitting, handleChange = props.handleChange, handleBlur = props.handleBlur, handleSubmit = props.handleSubmit, handleReset = props.handleReset;
        return (<div className="app">
            <h2>Sign up</h2>
            <antd_1.Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit}>

              <antd_1.Form.Item required label="Name">
                <antd_1.Input id="name" placeholder="Enter your name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className={errors.name && touched.name ? 'text-input error' : 'text-input'}/>
                {errors.name && touched.name && (<div className="input-feedback">{errors.name}</div>)}
              </antd_1.Form.Item>

              <antd_1.Form.Item required label="Last Name">
                <antd_1.Input id="lastName" placeholder="Enter your Last Name" type="text" value={values.lastName} onChange={handleChange} onBlur={handleBlur} className={errors.lastName && touched.lastName ? 'text-input error' : 'text-input'}/>
                {errors.lastName && touched.lastName && (<div className="input-feedback">{errors.lastName}</div>)}
              </antd_1.Form.Item>

              <antd_1.Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <antd_1.Input id="email" placeholder="Enter your Email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? 'text-input error' : 'text-input'}/>
                {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}
              </antd_1.Form.Item>

              <antd_1.Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <antd_1.Input id="password" placeholder="Enter your password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? 'text-input error' : 'text-input'}/>
                {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
              </antd_1.Form.Item>

              <antd_1.Form.Item required label="Confirm" hasFeedback>
                <antd_1.Input id="confirmPassword" placeholder="Enter your confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} className={errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'}/>
                {errors.confirmPassword && touched.confirmPassword && (<div className="input-feedback">{errors.confirmPassword}</div>)}
              </antd_1.Form.Item>

              <antd_1.Form.Item {...tailFormItemLayout}>
                <antd_1.Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </antd_1.Button>
              </antd_1.Form.Item>
            </antd_1.Form>
          </div>);
    }}
    </formik_1.Formik>);
}
;
exports.default = RegisterPage;
