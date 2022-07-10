// const p = Promise.resolve({id: 1});
// p.then(result => console.log(result));

// const z = Promise.reject(new Error('Some error'));
// z.then(null, err => console.error("Обшибка", err))
//     .catch(err => console.error('I catched: ', err))


const p1 = new Promise(resolve => {
    setTimeout(() => {
        console.log('Async op 1...');
        resolve(1);
    }, 2000)
});
const p2 = new Promise(resolve => {
    setTimeout(() => {
        console.log('Async op 2...');
        resolve(2);
    }, 2000)
});

Promise.all([p1,p2])
.then(result => console.log(result));

Promise.race([p1,p2])
.then(result => console.log(result));

