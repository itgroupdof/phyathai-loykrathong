# ตั้งค่า Google Sheets เป็นฐานข้อมูล
1. สร้าง Google Sheet ใหม่ (หรือนำเข้า `../loykrathong-database.csv`) ตั้งชื่อแท็บ `คำอธิษฐาน`
2. ส่วนขยาย → Apps Script → วาง `Code.gs`
3. Deploy → New deployment → Web app → Execute as **Me**, Access **Anyone**
4. คัดลอก URL `/exec` ไปใส่ค่า `SHEET_WEBHOOK` ใน `index.html`
5. Push ขึ้น GitHub — Vercel จะ deploy อัตโนมัติ
