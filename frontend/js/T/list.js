const params = new URLSearchParams(window.location.search);
const userid = params.get("userid");

console.log("UID ที่ส่งมา:", userid);

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

async function listtable() {
  try {
    const res = await fetch(`${api_teacher}/listtable?userid=${userid}`, {
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      const tbody = document.getElementById("listTableBody");
      tbody.innerHTML = "";

      data.data.forEach((list, i) => {
        const tr = document.createElement("tr");
        let approveText = "";
        switch (list.approve) {
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
        tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${formatDate(list.date)}</td>
                <td>${list.status}</td>
                <td>${list.note || "-"}</td>
                <td>${approveText}</td>
                `;

        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error("Error listtable", err);
  }
}
listtable();
