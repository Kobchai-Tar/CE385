# Workshop6
# TABLE USER --> GET
- Server รับค่า email จาก URL parameter
- นำค่า email ไปค้นหาในฐานข้อมูลผ่าน Prisma โดยใช้เงื่อนไข findUnique
- เนื่องจาก email ถูกกำหนดเป็น @unique ใน schema จึงสามารถใช้ค้นหาแบบ record เดียวได้
- ระบบดึงข้อมูลผู้ใช้ และใช้ include เพื่อดึงข้อมูลโพสต์ทั้งหมดที่สัมพันธ์กับผู้ใช้นั้น
- ถ้าพบข้อมูล จะส่งกลับเป็น JSON
- ถ้าไม่พบ จะส่งสถานะ 404
# TABLE USER --> DELETE
- Server รับค่า UserId (UUID) จาก URL
- ส่งค่า UUID ไปยัง Prisma เพื่อทำคำสั่ง delete
- Prisma จะค้นหา record ที่มี Primary Key ตรงกับค่า UUID
- ถ้าพบ จะลบข้อมูลออกจากตาราง User
- หากมี Foreign Key Constraint (เช่น Post ที่ยังอ้างถึง User นี้) อาจเกิด error 
- ถ้าไม่พบข้อมูล จะส่งสถานะ 404

# TABLE POST --> POST
- Server รับข้อมูลจาก request body (title, content, authorId)
- ตรวจสอบรูปแบบข้อมูลเบื้องต้นผ่าน JSON parsing
- Prisma ใช้คำสั่ง create เพื่อเพิ่มข้อมูลลงในตาราง Post
- ค่า authorId จะถูกตรวจสอบความสัมพันธ์กับตาราง User (Foreign Key)
- ถ้า authorId ไม่มีอยู่จริง ระบบจะเกิด Foreign Key error
- ถ้าสร้างสำเร็จ จะคืนข้อมูลโพสต์ใหม่พร้อม UUID และเวลาที่สร้าง
# TABLE POST --> GET
- Server เรียก Prisma ด้วยคำสั่ง findMany
- ระบบดึงข้อมูลทุก record จากตาราง Post
- ใช้ include เพื่อดึงข้อมูล User ที่เป็นเจ้าของโพสต์แต่ละรายการ
- ส่งข้อมูลทั้งหมดกลับในรูปแบบ array ของ JSON
# TABLE POST --> GET posts/:id
- รับค่า postId จาก URL
- ใช้ Prisma findUnique เพื่อค้นหา record ที่มี Primary Key ตรงกัน
- ถ้าพบ จะดึงข้อมูลโพสต์ พร้อมข้อมูลผู้เขียน (relation)
- ถ้าไม่พบ จะส่งสถานะ 40
# TABLE POST --> PUT 
- รับค่า postId จาก URL
- รับค่าที่ต้องการแก้ไขจาก request body
- Prisma ใช้คำสั่ง update เพื่อค้นหา record จาก Primary Key
- หากพบ record จะทำการแก้ไขเฉพาะ field ที่ระบุ
- Prisma จะอัปเดตค่า updatedAt อัตโนมัติ (เพราะใช้ @updatedAt ใน schema)
- ถ้าไม่พบ record จะเกิด error และส่งสถานะ 404
# TABLE POST --> DELETE
- รับค่า postId จาก URL
- ส่งคำสั่ง delete ไปยัง Prisma
- Prisma ค้นหา record ตาม Primary Key
- ถ้าพบ จะลบ record ออกจากตาราง Post
- ถ้าไม่พบ จะส่งสถานะ 404