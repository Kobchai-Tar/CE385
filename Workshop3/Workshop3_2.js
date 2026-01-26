function calculateBMI(weight, heigth) {
    const bmiValue = weight / (height * heigth);
    const bmi = bmiValue.toFixed(2);
    
    let category = "";

    if (bmiValue < 18.5) {
        category = "ผอม";
    } else if (bmiValue < 25) {
        category = "ปกติ";
    } else if (bmiValue < 30) {
        catagory = "อ้วน";
    } else {
        catagory ="อ้วนมาก";
    }

    return {
        bmi: bmi,
        category: category
    };
}