# Workshop 5.1
เริ่มจาก เรียกใช้งาน Express framework ก่อนและก็สร้างแอปเซิร์ฟเวอร์เสร็จแล้ว ให้เซิร์ฟเวอร์อ่านข้อมูล JSON จาก request body ได้

# GET
สร้าง Route สำหรับดึงข้อมูลนักศึกษาทั้งหมด และก็ แปลง id จาก URL ให้เป็นตัวเลข students.find ทำให้ ค้นหานักศึกษาตาม id
หลังจากนั้น ส่งสถานะ 404 ถ้าไม่พบข้อมูล

# POST
เพิ่มข้อมูลใหม่ โดยเรียก middleware ก่อน เสร็จแล้ว เพิ่มข้อมูลลง array
หลังจากนั้น ส่ง 201 เมื่อสร้างข้อมูลสำเร็จ

# PUT
app.put('/api/students/:id', validateStudent, ...) แก้ไขข้อมูลตาม id
และ อัปเดตข้อมูล 

# DELETE

หา index ของข้อมูลที่จะลบสร้าง const studentIndex = students.findIndex(...) students.splice(studentIndex, 1); ลบข้อมูลออกจาก array

# Workshop 5.2
สร้าง validateStudent ฟังก์ชันตรวจสอบข้อมูลก่อนเพิ่ม/แก้ไข สร้าง if ถ้าข้อมูลไม่ครบ ส่ง 400 และ return  "Invalid data" แต่ถ้า
next ข้อมูลถูกต้อง -> ไปทำงานต่อ