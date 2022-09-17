import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Auth() {
	const [loading, setLoading] = useState(false);
	const [signUpEmail, setSignUpEmail] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signInEmail, setSignInEmail] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

	// Magic Link
	// const handleLogin = async (email) => {
	// 	try {
	// 		setLoading(true);
	// 		const { error } = await supabase.auth.signInWithOtp({ email });
	// 		if (error) throw error;
	// 		alert('Check your email for the login link!');
	// 	} catch (error) {
	// 		alert(error.error_description || error.message);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	//TODO:
	//Difference between session() and getUser()

	// Email and Password
	const handleSignUp = async (email, password) => {
		try {
			setLoading(true);
			const { user, session, error } = await supabase.auth.signUp({
				email: signUpEmail,
				password: signUpPassword,
			});
			if (error) throw error;
			console.log(error);
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
			console.log('sign up ?');
		}
	};

	const handleSignIn = async (email, password) => {
		try {
			setLoading(true);
			const { user, session, error } =
				await supabase.auth.signInWithPassword(
					{
						email: signInEmail,
						password: signInPassword,
					}
					// {
					// 	redirectTo: 'https://example.com/welcome',
					// }
				);
			if (error) throw error;
			console.log(error);
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
			console.log('sign in ?');
		}
	};

	// Also Try:
	// https://supabase.com/docs/reference/auth-helpers/next-js
	// https://supabase.com/docs/guides/auth/auth-helpers/auth-ui

	return (
		<div className="row flex-center flex">
			<div className="col-6 form-widget">
				<h1 className="header">Supabase + Next.js</h1>
				<div>
					<p className="description">Sign Up</p>
					<div>
						<input
							className="inputField"
							type="email"
							placeholder="Your email"
							value={signUpEmail}
							onChange={(e) => setSignUpEmail(e.target.value)}
						/>
					</div>
					<div>
						<input
							className="inputField"
							type="password"
							placeholder="Set Password"
							value={signUpPassword}
							onChange={(e) => setSignUpPassword(e.target.value)}
						/>
					</div>
					<div>
						<button
							onClick={(e) => {
								e.preventDefault();
								handleSignUp(signUpEmail, signUpPassword);
							}}
							className="button block"
							disabled={loading}
						>
							<span>{loading ? 'Loading' : 'Sign Up'}</span>
						</button>
					</div>
				</div>

				<div>
					<p className="description">Sign In</p>
					<div>
						<input
							className="inputField"
							type="email"
							placeholder="Your email"
							value={signInEmail}
							onChange={(e) => setSignInEmail(e.target.value)}
						/>
					</div>
					<div>
						<input
							className="inputField"
							type="password"
							placeholder="Your Password"
							value={signInPassword}
							onChange={(e) => setSignInPassword(e.target.value)}
						/>
					</div>
					<div>
						<button
							onClick={(e) => {
								e.preventDefault();
								handleSignIn(signInEmail, signInPassword);
							}}
							className="button block"
							disabled={loading}
						>
							<span>{loading ? 'Loading' : 'Sign In'}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
