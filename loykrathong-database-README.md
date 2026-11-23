# แม่แบบฐานข้อมูลลอยกระทงออนไลน์

`loykrathong-database.csv` เป็นไฟล์หัวตารางเปล่าที่นำเข้า Google Sheets ได้ทันที:

1. เปิด Google Sheets แล้วสร้าง Spreadsheet ใหม่
2. เลือก **ไฟล์ → นำเข้า → อัปโหลด** แล้วเลือกไฟล์ CSV นี้
3. ตั้งชื่อแท็บเป็น `คำอธิษฐาน` (หรือปรับ `SHEET_NAME` ใน `Code.gs` ให้ตรงกัน)
4. ตั้งค่า `SPREADSHEET_ID` ใน Apps Script และ Deploy Web App ตาม `google-apps-script/README.md`

คอลัมน์ตรงกับ `HEADERS` ใน Apps Script: เวลาบันทึก, ชื่อ, คำอธิษฐาน, สถานที่, รูปแบบกระทง, รหัสรูปแบบกระทง, baseline, ปริมาณขยะและคาร์บอนที่ลดได้, ปี และแหล่งที่มา

`loykrathong-database-schema.json` อธิบายรูปแบบข้อมูลที่เว็บไซต์ส่งมา ส่วน `loykrathong-database.sql` เป็น schema เสริมสำหรับ SQLite หากต้องการวิเคราะห์ข้อมูลในเครื่อง; เว็บไซต์ที่จัดทำไว้ใช้ Google Sheets เป็นฐานข้อมูลหลัก.
