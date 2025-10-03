async function getB() {
  try {
    const res = await fetch(`${api_teacher}/b`);
    const data = await res.json();

    console.log(data);

    if (res.ok) {
      const select = document.getElementById("B");
      select.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "-- เลือกพี่เลี้ยง--";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);

      data.data.forEach((b) => {
        const option = document.createElement("option");
        option.value = b.userid;
        option.textContent = b.fname;
        select.appendChild(option);
      });
    }
  } catch (err) {
    console.error(`Error mng getB`, err);
  }
}

async function gets() {
  try {
    const res = await fetch(`${api_teacher}/s`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      const select = document.getElementById("S");
      select.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "-- เลือกนักศึกษา --";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);

      data.data.forEach((s) => {
        const option = document.createElement("option");
        option.value = s.userid;
        option.textContent = s.fname;
        select.appendChild(option);
      });
    }
  } catch (err) {
    console.error(`Error mng gets`, err);
  }
}

async function postbs() {
  document
    .getElementById("studentForm")
    .addEventListener("submit", async function (s) {
      s.preventDefault();

      const form = {
        b: document.getElementById("B").value.trim(),
        S: document.getElementById("S").value.trim(),
      };

      console.log(form);

      try {
        const res = await fetch(`${api_teacher}/bs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "บันทุกสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (data.message == "ข้อมูลซ้ำ") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ข้อมูลซ้ำ",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (err) {
        console.log("Error postbs", err);
      }
    });
}
postbs();
gets();
getB();
