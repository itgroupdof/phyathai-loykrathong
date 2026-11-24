/**
 * ลอยกระทงออนไลน์ รพ.พญาไท 2 — Google Sheets เป็นฐานข้อมูล
 * 1) เปิด Google Sheet > ส่วนขยาย > Apps Script > วางโค้ดนี้
 * 2) ตั้ง SPREADSHEET_ID (หรือผูกสคริปต์กับชีตแล้วปล่อยว่างได้)
 * 3) Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone
 * 4) นำ URL /exec ไปใส่ SHEET_WEBHOOK ใน index.html
 */
const SPREADSHEET_ID = '';
const SHEET_NAME = 'คำอธิษฐาน';
const HEADERS = ['เวลาบันทึก','ชื่อผู้ร่วมอวยพร','คำอธิษฐาน','สถานที่ (รหัส)','สถานที่','รูปแบบกระทง','รหัสแบบกระทง','ชนิดกระทงจริง (baseline)','ขยะที่ลดได้ (กก.)','คาร์บอนที่หลีกเลี่ยงได้ (kgCO2e)','ปี','แหล่งที่มา','ts'];

function sheet_() {
  const ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}
const clean_ = (v, n) => String(v == null ? '' : v).replace(/^[=+\-@]/, "'$&").slice(0, n);

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const name = clean_(d.name, 50), wish = clean_(d.desc || d.wish, 120 + 80);
    if (!name || !wish) return json_({ ok: false, error: 'missing fields' });
    sheet_().appendRow([clean_(d.timestamp, 60), name, wish, clean_(d.location, 30), clean_(d.locationLabel, 80),
      clean_(d.krathong, 80), clean_(d.design, 30), clean_(d.baseline, 20),
      Number(d.wasteKg) || 0, Number(d.avoidedCo2Kg) || 0, clean_(d.year, 10), clean_(d.source, 60), Number(d.ts) || Date.now()]);
    return json_({ ok: true });
  } finally { lock.releaseLock(); }
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  let rows = [];
  if (p.action === 'list') {
    const v = sheet_().getDataRange().getValues().slice(1).reverse().slice(0, 1000);
    rows = v.map(r => ({ name: r[1], wish: r[2], loc: r[3], design: r[6], base: r[7], ts: Number(r[12]) || 0 }));
  }
  const body = JSON.stringify(rows);
  if (/^[A-Za-z0-9_]+$/.test(p.callback || ''))
    return ContentService.createTextOutput(p.callback + '(' + body + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
