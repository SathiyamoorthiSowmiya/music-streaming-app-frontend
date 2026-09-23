import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(loginUser(values));
            if (loginUser.fulfilled.match(result)) {
                navigate('/');
            }
        },
    });

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={formik.handleSubmit}>
                <h2>Login</h2>

                {error && <p className="form-error-banner">{error}</p>}

                <div className="form-field">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <span className="field-error">{formik.errors.email}</span>
                    )}
                </div>

                <div className="form-field">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <span className="field-error">{formik.errors.password}</span>
                    )}
                </div>

                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Logging in...' : 'Login'}
                </button>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                <p className="auth-hint">Admin demo: admin@musicapp.com / Admin@123</p>
            </form>
        </div>
    );
}

export default Login;
