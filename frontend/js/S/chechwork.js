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

async function getattendance() {
  try {
    const res = await fetch(`${api_auth}/getattdance`, {
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      const tbody = document.getElementById("checkwork");
      tbody.innerHTML = " ";

      data.data.forEach((att, i) => {
        let approveText = "";
        switch (att.approve) {
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
            <td>${formatDate(att.date)}</td>
            <td>${att.status}</td>
            <td>${att.note || "-"}</td>
            <td>${formatDate(att.create_at)}</td>
            <td>${approveText}</td>
            `;

        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error("Error checkwork", err);
  }
}
