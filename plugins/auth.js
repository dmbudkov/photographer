export default async function ({ app }) {
    if (!app.$auth.loggedIn) {
        return
    }
    const auth = app.$auth;
    const authStrategy = auth.strategy.name;
    if(authStrategy === 'facebook' ){
        const token = auth.getToken(authStrategy).substr(7)

        const url = `/api/social/fb/?access_token=${token}`;
        try {
            const data = await app.$axios.$get(url, null);
            auth.setToken('local', "Bearer "+ data.access_token);
            setTimeout( async () => {
                auth.setStrategy('local');
                setTimeout( async () => {
                    await auth.fetchUser();
                })
            });
        } catch (e) {
            console.log(e);
        }
    }
}