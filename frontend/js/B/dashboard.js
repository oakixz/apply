async function loadAttendance() {
  try {
    const res = await fetch(`${api_auth}/viewatt`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!data.success) return;

    let present = 0,
        leave = 0,
        late = 0;

    data.data.forEach((item) => {
      if (item.status === "present") present++;
      else if (item.status === "leave") leave++;
      else if (item.status === "late") late++;
    });

    const total = present + leave + late;
    const pPresent = total ? Math.round((present / total) * 100) : 0;
    const pLeave   = total ? Math.round((leave / total) * 100) : 0;
    const pLate    = total ? Math.round((late / total) * 100) : 0;

    document.getElementById("present-count").textContent = present;
    document.getElementById("leave-count").textContent   = leave;
    document.getElementById("late-count").textContent    = late;

    document.getElementById("present-bar").style.width  = pPresent + "%";
    document.getElementById("present-bar").textContent  = pPresent + "%";

    document.getElementById("leave-bar").style.width    = pLeave + "%";
    document.getElementById("leave-bar").textContent    = pLeave + "%";

    document.getElementById("late-bar").style.width     = pLate + "%";
    document.getElementById("late-bar").textContent     = pLate + "%";

  } catch (err) {
    console.error("Error loadAttendance:", err);
  }
}
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

async function loadStudents(mentorid, bid) {
  try {
    const res = await fetch(`${api_auth}/students`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!data.success) return;

    
    window.allStudents = data.data;

    
    renderStudents(data.data);
  } catch (err) {
    console.error("Error loadStudents:", err);
  }
}

function renderStudents(students) {
  const tbody = document.getElementById("studentTable");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.iduser}</td>
      <td>${student.fullname}</td>
      <td>${student.company}</td>
      <td>${formatDate(student.start_date)}</td>
      <td>${formatDate(student.end_date)}</td>
      <td>${student.present_count}</td>
      <td>${student.leave_count}</td>
      <td>${student.late_count}</td>
      <td><a href="/frontend/page/B/detail.html?userid=${student.userid}" target="_blank">🖨️ Print</a></td>
    `;
    tbody.appendChild(tr);
  });
}


function applyFilter() {
  const idFilter = document.getElementById("filterIduser").value.trim().toLowerCase();
  const nameFilter = document.getElementById("filterName").value.trim().toLowerCase();

  let filtered = window.allStudents || [];

  if (idFilter) {
    filtered = filtered.filter(st => String(st.iduser).toLowerCase().includes(idFilter));
  }
  if (nameFilter) {
    filtered = filtered.filter(st => st.fullname.toLowerCase().includes(nameFilter));
  }

  renderStudents(filtered);
}


document.getElementById("filterIduser").addEventListener("input", applyFilter);
document.getElementById("filterName").addEventListener("input", applyFilter);


loadStudents();
loadAttendance();
