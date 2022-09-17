import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Profile() {
	const [loading, setLoading] = useState();
	const [user, setUser] = useState();
	const [username, setUsername] = useState(null);

	useEffect(() => {
		let mounted = true;

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

				// setIsLoading(false);
			}
		}

		getInitialUser();
	}, []);

	async function updateProfile({ username }) {
		try {
			setLoading(true);

			const updates = {
				id: user.id,
				username,
				updated_at: new Date(),
			};

			const { error } = await supabase.auth.updateUser({
				data: { firstName: username },
			});

			if (error) {
				throw error;
			}
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="container" style={{ padding: '50px 0 100px 0' }}>
			<p>{user?.email}</p>
			<p>{user?.user_metadata.firstName}</p>
			{console.log(user)}

			<div className="form-widget">
				<div>
					<label htmlFor="username">Name</label>
					<input
						id="username"
						type="text"
						value={username || ''}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<div>
						<button
							className="button primary block"
							onClick={() => updateProfile({ username })}
							disabled={loading}
						>
							{loading ? 'Loading ...' : 'Update'}
						</button>
					</div>
					<div>
						<button
							className="button block"
							onClick={() => supabase.auth.signOut()}
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
