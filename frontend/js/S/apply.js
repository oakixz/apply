async function position() {
  try {
    const res = await fetch(`${api_auth}/position`);

    const data = await res.json();

    // console.log(data)

    if (res.ok) {
      const select = document.getElementById("position");
      select.innerHTML = " ";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "-- เลือกตำแหน่ง --";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);

      data.data.forEach((p) => {
        const option = document.createElement("option");
        option.value = `${p.positionid}`;
        option.textContent = `${p.pname}`;

        select.appendChild(option);
      });
    }
  } catch (err) {
    console.error("Error", err);
  }
}

async function getuser() {
  try {
    const res = await fetch(`${api_user}/getuser`, {
      credentials: "include",
    });

    const data = await res.json();
    const u = data.data[0];

    // console.log(data);

    if (res.ok) {
      (document.getElementById("userid").value = `${u.userid}`),
        (document.getElementById("iduser").value = `${u.iduser}`),
        (document.getElementById("fullname").value = `${u.fname} ${u.lname}`),
        (document.getElementById("email").value = `${u.email}`);
    }
  } catch (err) {
    console.error("Error", err);
  }
}

// async function postapply() {
//   try {
//     document
//       .getElementById("internForm")
//       .addEventListener("submit", async function (i) {
//         i.preventDefault();

//         const form = {
//           userid: document.getElementById("userid").value.trim(),
//           iduser: document.getElementById("iduser").value.trim(),
//           fullname: document.getElementById("fullname").value.trim(),
//           email: document.getElementById("email").value.trim(),
//           position: document.getElementById("position").value.trim(),
//           work: document.getElementById("work").value.trim(),
//           start: document.getElementById("start").value.trim(),
//           end: document.getElementById("end").value.trim(),
//         };
//         const res = await fetch(`${api_auth}/apply`, {
//           credentials: "include",
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(form),
//         });

//         const data = await res.json();
//         console.log(data);

//         if (res.ok) {
//           Swal.fire({
//             position: "center",
//             icon: "success",
//             title: "บันทึกสำเร็จ",
//             showConfirmButton: false,
//             timer: 1500,
//           }).then(() => {
//             window.location.reload();
//           });
//         } else if (data.message == "ข้อมูลซ้ำ") {
//           Swal.fire({
//             position: "center",
//             icon: "error",
//             title: "ข้อมูลซ้ำ",
//             showConfirmButton: false,
//             timer: 1500,
//           }).then(() => {
//             window.location.reload();
//           });
//         } else {
//           Swal.fire({
//             position: "center",
//             icon: "error",
//             title: "เกิดข้อผิดพลาด",
//             showConfirmButton: false,
//             timer: 1500,
//           }).then(() => {
//             window.location.reload();
//           });
//         }
//       });
//   } catch (err) {
//     console.error("Error", err);
//   }
// }
async function postapply() {
  try {
    document
      .getElementById("internForm")
      .addEventListener("submit", async function (i) {
        i.preventDefault();

        const form = {
          userid: document.getElementById("userid").value.trim(),
          iduser: document.getElementById("iduser").value.trim(),
          fullname: document.getElementById("fullname").value.trim(),
          email: document.getElementById("email").value.trim(),
          position: document.getElementById("position").value.trim(),
          work: document.getElementById("work").value.trim(),
          start: document.getElementById("start").value.trim(),
          end: document.getElementById("end").value.trim(),
        };

        const res = await fetch(`${api_auth}/apply`, {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "บันทึกสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => window.location.reload());
        } else if (data.message == "ข้อมูลซ้ำ") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ข้อมูลซ้ำ",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => window.location.reload());
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => window.location.reload());
        }
      });

    
    document.getElementById("start").addEventListener("change", function () {
      const startDate = this.value;
      const endInput = document.getElementById("end");
      endInput.min = startDate;
    });

  } catch (err) {
    console.error("Error", err);
  }
}

