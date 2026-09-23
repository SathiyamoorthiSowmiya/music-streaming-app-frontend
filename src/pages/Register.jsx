import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../features/auth/authSlice';

const validationSchema = Yup.object({
    username: Yup.string().min(3, 'At least 3 characters').required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
});

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: { username: '', email: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(registerUser(values));
            if (registerUser.fulfilled.match(result)) {
                navigate('/');
            }
        },
    });

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={formik.handleSubmit}>
                <h2>Create Account</h2>

                {error && <p className="form-error-banner">{error}</p>}

                <div className="form-field">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <span className="field-error">{formik.errors.username}</span>
                    )}
                </div>

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
                    {status === 'loading' ? 'Creating account...' : 'Register'}
                </button>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
