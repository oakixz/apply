function formatDateLocal(dateObj) {
  return (
    dateObj.getFullYear() +
    "-" +
    String(dateObj.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(dateObj.getDate()).padStart(2, "0")
  );
}

function generateDateRange(start, end) {
  let startDate = new Date(start);
  let endDate = new Date(end);
  let result = [];

  while (startDate <= endDate) {
    let formatted = formatDateLocal(startDate); // ใช้ local date
    result.push(formatted);
    startDate.setDate(startDate.getDate() + 1);
  }

  return result;
}

let rowStatus = {}; // <-- ประกาศไว้ตรงนี้

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

async function getdate() {
  try {
    const res1 = await fetch(`${api_auth}/getdate`, { credentials: "include" });
    const applyData = await res1.json();

    const start = applyData.data[0].start;
    const end = applyData.data[0].end;
    const userid = applyData.data[0].userid;
    const fname = applyData.data[0].fname;
    const lname = applyData.data[0].lname;

    // ✅ ประกาศ attendance ตรงนี้
    const res2 = await fetch(`${api_auth}/attendance?userid=${userid}`, {
      credentials: "include",
    });
    const attendanceData = await res2.json();
    const attendance = attendanceData.data || []; // ✅ อยู่ใน scope ของ getdate()

    console.log(attendanceData);
    const dates = generateDateRange(start, end);
    const tbody = document.getElementById("dateTable");
    tbody.innerHTML = "";

    dates.forEach((date, index) => {
      const record = attendance.find((r) => {
        const dbDate = formatDateLocal(new Date(r.date));
        return dbDate === date;
      });

      let approveText = "";
      if (record) {
        const appr = (record.approve || "").toUpperCase();
        if (appr === "P") approveText = "รออนุมัติ";
        else if (appr === "A") approveText = "อนุมัติ";
        else if (appr === "R") approveText = "ไม่อนุมัติ";
      }

      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${formatDate(date)}</td>
        <td>${fname} ${lname}</td>
        <td>
          ${
            record
              ? record.status
              : `
            <button class='status-btn' onclick="markStatus('${date}', 'present')">เข้างาน</button>
            <button  class='status-btn'onclick="markStatus('${date}', 'leave')">ลา</button>
            <button  class='status-btn'onclick="markStatus('${date}', 'late')">สาย</button>
          `
          }
        </td>
        <td>
          ${
            record
              ? record.note || "-"
              : `<input type="text" placeholder="หมายเหตุ" id="note-${index}">`
          }
        </td>
        <td>
          ${
            record
              ? approveText
              : `<button   class='status-btn' id="saveBtn-${index}" onclick="saveRow('${date}', ${index}, ${userid})">บันทึก</button>`
          }
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

function markStatus(date, status) {
  rowStatus[date] = status; // เก็บสถานะลง object
  console.log("เลือก:", date, status);
}

async function saveRow(date, index, userid) {
  const note = document.getElementById(`note-${index}`).value;
  const status = rowStatus[date] || "leave";

  const payload = {
    userid,
    date,
    status,
    note,
  };

  console.log("ส่งไปบันทึก:", payload);

  // ตัวอย่างส่งไป backend
  try {
    const res = await fetch(`${api_auth}/saveAttendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await res.json();
    console.log("บันทึกสำเร็จ:", data);

    if (res.ok) {
      // const td = document.querySelector(`#saveBtn-${index}`);
      // td.textContent = "รออนุมัติ"; // แก้ข้อความ
      // td.disabled = true;
      // Swal.fire("บันทึกสำเร็จ ✅", "", "success");
      // getdate();
      Swal.fire("บันทึกสำเร็จ ✅", "", "success");
      await getdate();
    } else {
      alert("ONOK");
    }
  } catch (err) {
    console.error("Save Error:", err);
  }
}
