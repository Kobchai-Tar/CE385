function simulateAsyncOperation(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (timeout >= 1000) {
                resolve(`Completed in ${timeout} ms`);
            } else {
                reject('Timeout too short!');
            }
        },timeout);
    })
}

// เรียกฟังก์ชันนี้ เพื่อใช้ await
async function performAsyncTask(timeout) {
    try {
        // รอผลลัพธ์จาก promise
        const result = await simulateAsyncOperation(timeout);
        // ถ้า resolve มาตรงนี้
        console.log(result);
    } catch (error) {
        // ถ้า reject จะมาตรงนี้
        console.log('Error:', error);
    }
}

// สำเร็จ
performAsyncTask(1500);

// ล้มเหลว
performAsyncTask(500);