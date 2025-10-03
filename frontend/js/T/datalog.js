// async function loadStudents() {
//   try {
//     const res = await fetch(`${api_teacher}/users`, {
//       credentials: "include"
//     });
//     const data = await res.json();

//     const tbody = document.getElementById("studentTable");
//     tbody.innerHTML = "";

//     if (!data || data.length === 0) {
//       tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;">ไม่มีข้อมูลนักศึกษา</td></tr>`;
//       return;
//     }

//     data.data.forEach((student, index) => {
//       const tr = document.createElement("tr");
//       tr.innerHTML = `
//         <td>${index + 1}</td>
//         <td>${student.iduser}</td>
//         <td>${student.fname} ${student.lname}</td>
//         <td>${student.atwork || "-"}</td>
//         <td>${student.start ? new Date(student.start).toLocaleDateString("th-TH") : "-"}</td>
//         <td>${student.end ? new Date(student.end).toLocaleDateString("th-TH") : "-"}</td>
//         <td>${student.presentCount}</td>
//         <td>${student.leaveCount}</td>
//         <td>${student.lateCount}</td>
//         <td><a href="/frontend/page/T/detail.html?userid=${student.userid}">print</a></td>
//       `;
//       tbody.appendChild(tr);
//     });
//   } catch (err) {
//     console.error("Error loadStudents:", err);
//   }
// }

// loadStudents();
let allStudents = []; // เก็บข้อมูลทั้งหมด

async function loadStudents() {
  try {
    const res = await fetch(`${api_teacher}/users`, {
      credentials: "include"
    });
    const data = await res.json();

    allStudents = data.data || [];
    renderTable(allStudents);
  } catch (err) {
    console.error("Error loadStudents:", err);
  }
}

function renderTable(students) {
  const tbody = document.getElementById("studentTable");
  tbody.innerHTML = "";

  if (!students || students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;">ไม่มีข้อมูลนักศึกษา</td></tr>`;
    return;
  }

  students.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.iduser || "-"}</td>
      <td>${student.fname} ${student.lname}</td>
      <td>${student.pname}</td>
      <td>${student.atwork || "-"}</td>
      <td>${student.start ? new Date(student.start).toLocaleDateString("th-TH") : "-"}</td>
      <td>${student.end ? new Date(student.end).toLocaleDateString("th-TH") : "-"}</td>
      <td>${student.presentCount}</td>
      <td>${student.leaveCount}</td>
      <td>${student.lateCount}</td>
      <td><a href="/frontend/page/T/detail.html?userid=${student.userid}" target="_blank">🖨️ Print</a></td>
    `;
    tbody.appendChild(tr);
  });
}

function applyFilter() {
  const filterId = document.getElementById("filterIduser").value.toLowerCase();
  const filterName = document.getElementById("filterName").value.toLowerCase();

  const filtered = allStudents.filter(st => {
    const idMatch = st.iduser?.toLowerCase().includes(filterId);
    const nameMatch = (`${st.fname} ${st.lname}`).toLowerCase().includes(filterName);
    return idMatch && nameMatch;
  });

  renderTable(filtered);
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filterIduser").addEventListener("keyup", applyFilter);
  document.getElementById("filterName").addEventListener("keyup", applyFilter);
});

loadStudents();
