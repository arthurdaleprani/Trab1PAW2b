import { parseCookies } from 'nookies';

async function fetchData() {
    const { 'auth.token': token } = parseCookies();

    const response = await fetch('http://localhost:3000/products', {
        headers: {
            'Autorizado': `${token}`
        }
    });

    const data = await response.json();
    return data;
}

fetchData().then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error:', error);
});
