async function avg() {
  try {
    const res = await fetch(`${api_teacher}/avg`);
    const data = await res.json();

    if (res.ok) {
      document.getElementById("Noatwork").textContent =
        (data.data.noApply || 0) + " คน";
      document.getElementById("studentCount").textContent =
        (data.data.applied || 0) + " คน";
      document.getElementById("success").textContent =
        (data.data.success || 0) + " คน";
    }
  } catch (err) {
    console.error("Error dashT:", err);
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return "-";
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

async function usertable() {
  try {
    const res = await fetch(`${api_teacher}/user`);
    const data = await res.json();

    if (res.ok) {
      const tbody = document.getElementById("usertable");
      tbody.innerHTML = "";

      data.data.forEach((u, i) => {
        let approveText = "";
        switch (u.approve) {
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

        let statusText = "";
        switch (u.status) {
          case "late":
            statusText = "สาย";
            break;
          case "present":
            statusText = "เข้างาน";
            break;
          case "leave":
            statusText = "ลา";
            break;
          default:
            statusText = "-";
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${u.iduser}</td>
          <td>${u.fname} ${u.lname}</td>
          <td>${formatDate(u.date)}</td>
          <td>${statusText}</td>
          <td>${approveText}</td>
          <td>
            <button class='btn' onclick="openDetail(${u.userid})">คลิ๊ก</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error("Error dashT:", err);
  }
}

function applyFilter() {
  const idFilter = document.getElementById("filterIduser").value.trim();
  const idFilter2 = document.getElementById("filterIduser2").value.trim();
  const nameFilter = document
    .getElementById("filterName")
    .value.trim()
    .toLowerCase();

  const tbody = document.getElementById("usertable");
  const rows = tbody.querySelectorAll("tr");

  rows.forEach((row) => {
    const iduser = row.cells[1].textContent.trim();
    const fullname = row.cells[2].textContent.trim().toLowerCase();

    let show = true;

    if (idFilter) {
      if (!iduser.startsWith(idFilter)) {
        show = false;
      }
    }

   
    if (idFilter2) {
      if (!iduser.includes(idFilter2)) {
        show = false;
      }
    }

    if (nameFilter) {
      if (!fullname.includes(nameFilter)) {
        show = false;
      }
    }

    row.style.display = show ? "" : "none";
  });
}

async function openDetail(userid) {
  window.location.href = `/frontend/page/T/list.html?userid=${userid}`;
}

document.addEventListener("DOMContentLoaded", () => {
  usertable();
  avg();

  document
    .getElementById("filterIduser")
    .addEventListener("keyup", applyFilter);
  document
    .getElementById("filterIduser2")
    .addEventListener("keyup", applyFilter);
  document.getElementById("filterName").addEventListener("keyup", applyFilter);
});
