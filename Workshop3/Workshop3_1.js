let sumEven = 0;
let productOdd =1;

for (let i = 2; i <= 50; i++) {
    if (i % 2 === 0) {
        sumEven += i;
    }
}

for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        productOdd *= i;
    }
}

console.log("ผลรวมเลขคู่ 2-50 =", sumEven);
console.log("ผลคูณเลขคู่ 1-10 =", productOdd);