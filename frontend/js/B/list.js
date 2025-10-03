async function list() {
  try {
    const res = await fetch(`${api_auth}/list`, {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      const tbody = document.getElementById("list");
      tbody.innerHTML = "";

      data.data.forEach((list, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${list.student_fname} ${list.student_lname}</td>
                <td>${list.pname}</td>
                <td>
                    <button  class="action-btn approve" onclick="openDetail(${list.uid})">คลิ๊ก</button>
                </td>
                `;

        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error("Error approve", err);
  }
}

function openDetail(uid) {
  window.location.href = `approve.html?uid=${uid}`;
}
