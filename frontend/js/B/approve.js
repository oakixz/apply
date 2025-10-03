const params = new URLSearchParams(window.location.search);
const uid = params.get("uid");

console.log("UID ที่ส่งมา:", uid);

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function getApproveList() {
  try {
    const res = await fetch(`${api_auth}/listApprove?uid=${uid}`, {
      credentials: "include",
    });
    const data = await res.json();
    console.log("data จาก backend:", data);

    if (res.ok) {
      const tbody = document.getElementById("approveTable");
      tbody.innerHTML = "";

      data.data.forEach((at, i) => {
        let approveText = "";
        switch (at.approve) {
          case "P":
            approveText = "⏳ รออนุมัติ";
            break;
          case "Y":
            approveText = "✅ อนุมัติ";
            break;
          case "N":
            approveText = "❌ ไม่อนุมัติ";
            break;
          default:
            approveText = "-";
        }
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${at.fname} ${at.lname}</td>
            <td>${formatDate(at.date)}</td>
            <td>${at.status}</td>
            <td>${at.note || "-"} </td>
            <td id="approve-${at.atid}">${approveText}</td>
            <td>
            <button class="btn-approve" onclick="updateApprove(${at.atid}, 'Y')">อนุมัติ</button>
            <button class="btn-reject" onclick="updateApprove(${at.atid}, 'N')">ไม่อนุมัติ</button>
          </td>
            `;

        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error("Error getApproveList:", err);
  }
}


async function updateApprove(atid, status) {
  try {

    const log = {atid , status};
    const res = await fetch(`${api_auth}/updateApprove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
      credentials: "include",
    });
    const data = await res.json();

    if (res.ok) {
      Swal.fire("สำเร็จ ✅", "อัปเดตการอนุมัติแล้ว", "success");
      await getApproveList(); // โหลดข้อมูลใหม่
    } else {
      Swal.fire("ผิดพลาด ❌", data.message || "ไม่สามารถอัปเดตได้", "error");
    }
  } catch (err) {
    console.error("Error updateApprove:", err);
  }
}


getApproveList();

