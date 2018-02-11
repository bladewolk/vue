const actions = {

    getSettings({getters}) {
        return new Promise((resolve, reject) => {
            axios.get('api/settings', {
                headers: {
                    'Authorization': getters.getAccessToken
                }
            }).then(res => {
                resolve(res);
            }).catch(e => {

            })
        })
    },

    updateSettings({getters}, payload) {
        return new Promise((resolve, reject) => {
            axios.post('api/settings', payload,
                {
                    headers: {'Authorization': getters.getAccessToken}
                }
            ).then(res => {
                resolve(res);
            }).catch(e => {

            })
        })
    }

};

export default {
    actions
}