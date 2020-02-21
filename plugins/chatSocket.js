import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '6baf5fe823e69801b59b',
    cluster: 'eu',
    authEndpoint: '/broadcasting/auth',
    encrypted: true
});


