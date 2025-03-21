import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from "../utils/ThemeContext";
import { Meteors } from "../components/meteorAnimation";
import { resetPassword } from "../apis/services/authService"; // Change the import from forgotPassword to resetPassword

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { theme } = useTheme();
    const { token } = router.query;

    // Set colors based on the theme
    const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
    const cardBackgroundColor = theme === "dark" ? "bg-gray-900" : "bg-gray-200";
    const textColor = theme === "dark" ? "text-white" : "text-blue-900";
    const inputBackgroundColor = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
    const buttonBackgroundColor = theme === "dark" ? "bg-blue-500" : "bg-blue-600";
    const buttonHoverClass = theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-700";

    const handlePasswordReset = async (token: string, password: string) => {
        try {
            await resetPassword(token, password);
            router.push('/signIn');
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('Failed to reset password. The link may be expired or invalid.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        if (typeof token === 'string') {
            handlePasswordReset(token, password);
        } else {
            setError('Invalid token');
        }
    };

    return (
        <div className={`relative w-full h-screen overflow-hidden ${backgroundColor} flex justify-center items-center`}>
            {/* Background Meteor Animation */}
            <div className="absolute inset-0 z-0">
                <Meteors number={30} />
            </div>

            {/* Reset Password Form Card */}
            <div className={`relative z-10 ${cardBackgroundColor} p-8 rounded-lg shadow-lg flex flex-col items-center`}>
                <h2 className={`${textColor} text-2xl mb-6`}>Reset Password</h2>

                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

                <form className="w-64" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className={`block ${textColor} text-sm font-bold mb-2`} htmlFor="password">
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-3 py-2 ${inputBackgroundColor} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block ${textColor} text-sm font-bold mb-2`} htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-3 py-2 ${inputBackgroundColor} ${textColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full ${buttonBackgroundColor} ${textColor} font-bold py-2 px-4 rounded-lg ${buttonHoverClass}`}
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;