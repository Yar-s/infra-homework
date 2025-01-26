const argv = process.argv;
const username = argv[2];

if (username == null) {
    console.error('Не указано имя пользователя!');
    process.exit(1);
}

fetch(
    'https://kholstinin.com/infra/deploy/',
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username }) }
).then((response) => {
    if (response.status === 200) {
        console.log(`Успешно!`);

    } else {
        return response.text();
    }
}).then((text) => {
    if (text) {
        console.log('Error from server: ', text);
    }
}).catch((err) => {
    console.log('Что-то пошло не так: ', err);
})
