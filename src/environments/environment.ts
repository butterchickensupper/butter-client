import 'zone.js/plugins/zone-error';

export const environment = {
    production: false,
    apiGatewayUrl: 'http://localhost:3000/',
    firebaseConfig: {
        apiKey: 'test',
        authDomain: 'localhost',
        projectId: 'test',
        storageBucket: 'test',
        messagingSenderId: 'test',
        appId: 'test',
        measurementId: 'test',
    },
};
