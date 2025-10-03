async function count() {
  try {
    const res = await fetch(`${api_auth}/count`);

    const data = await res.json();

    if (res.ok) {
      document.getElementById("T").textContent = data.data.T;
      document.getElementById("B").textContent = data.data.B;
      document.getElementById("S").textContent = data.data.S;
    }
  } catch (err) {
    console.error("Error count", err);
  }
}

async function usertable() {
  try {
    const res = await fetch(`${api_auth}/usertable`);

    const data = await res.json();

    if (res.ok) {
      const tbody = document.getElementById("userTable");
      tbody.innerHTML = "";

      data.data.forEach((u, i) => {
        let roleText = "";
        if (u.role === "T") roleText = "อาจารย์";
        else if (u.role === "B") roleText = "พี่เลี้ยง";
        else if (u.role === "S") roleText = "นักศึกษา";
        else roleText = "แอดมิน";
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${u.iduser}</td>
            <td>${u.fname} ${u.lname}</td>
            <td>${u.email}</td>
            <td>${roleText}</td>
            <td>
            <button class="btn-edit" onclick="editRole(${u.userid}, '${
          u.role
        }')">✏️ เปลี่ยนบทบาท</button>
            </td>
            `;
        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error("Error usertable", err);
  }
}

async function editRole(userid, currentRole) {
  const { value: newRole } = await Swal.fire({
    title: "แก้ไขบทบาท",
    input: "select",
    inputOptions: {
      T: "อาจารย์",
      B: "พี่เลี้ยง",
      S: "นักศึกษา",
      A: "แอดมิน",
    },
    inputValue: currentRole,
    showCancelButton: true,
    confirmButtonText: "บันทึก",
    cancelButtonText: "ยกเลิก",
  });

  if (!newRole) return;

  try {
    const res = await fetch(`${api_auth}/updateRole/${userid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      Swal.fire("สำเร็จ", "อัปเดตบทบาทเรียบร้อย ✅", "success");
      usertable(); 
    } else {
      Swal.fire("ผิดพลาด", data.message || "อัปเดตไม่สำเร็จ ❌", "error");
    }
  } catch (err) {
    console.error("Error editRole", err);
    Swal.fire("ผิดพลาด", "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ ❌", "error");
  }
}
usertable();
count();


function filterTable() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const roleFilter = document.getElementById("roleFilter").value;
    const rows = document.querySelectorAll("#userTable tr");

    rows.forEach(row => {
        const cells = row.getElementsByTagName("td");
        if (cells.length > 0) {
            const userId = cells[1].innerText.toLowerCase();
            const name = cells[2].innerText.toLowerCase();
            const email = cells[3].innerText.toLowerCase();
            const role = cells[4].innerText;

            
            const matchSearch = userId.includes(searchText) || name.includes(searchText) || email.includes(searchText);
            const matchRole = roleFilter === "" || role === roleFilter;

            if (matchSearch && matchRole) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    });
}


document.getElementById("searchInput").addEventListener("keyup", filterTable);
document.getElementById("roleFilter").addEventListener("change", filterTable);

