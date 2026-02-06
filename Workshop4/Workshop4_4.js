function fetchDataFromServer1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Server 1 data');
        },2000);
    });
}

function fetchDataFromServer2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Server 2 error');
        },1000);
    });
}

function fetchDataFromServer3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Server 3 data');
        },3000);
    });
}

// กรณีที่ 1
Promise.any([
    fetchDataFromServer1(),
    fetchDataFromServer2(),
    fetchDataFromServer3()
])

.then((deta) => {
    console.log('First success:', data);
})

.catch((error) => {
    console.log(error);
});

// กรณีที่ 2 
Promise.allSettled([
    fetchDataFromServer1(),
    fetchDataFromServer2(),
    fetchDataFromServer3()
])

.then((results) => {
    console.log(results);
});