import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
// import Account from '../components/Account';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		let mounted = true;

		async function getInitialSession() {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			// const {
			// 	data: { user },
			// } = await supabase.auth.getUser();

			// only update the react state if the component is still mounted
			if (mounted) {
				if (session) {
					setSession(session);
					setUser(session.user);
				}

				setIsLoading(false);
			}
		}

		getInitialSession();

		async function getInitialUser() {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			// const {
			// 	data: { user },
			// } = await supabase.auth.getUser();

			// only update the react state if the component is still mounted
			if (mounted) {
				if (user) {
					setUser(user);
				}

				setIsLoading(false);
			}
		}

		getInitialUser();

		const { subscription } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
			}
		);

		return () => {
			mounted = false;
			subscription?.unsubscribe();
		};
	}, []);

	return (
		<div className="container" style={{ padding: '50px 0 100px 0' }}>
			{/* {!session ? (
				<Auth
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					theme="dark"
				/>
			) : (
				<Account key={session.user.id} session={session} />
			)} */}
			<Auth
				supabaseClient={supabase}
				appearance={{ theme: ThemeSupa }}
				theme="dark"
			/>

			<p> User e-mail is {user?.email}</p>
		</div>
	);
}
