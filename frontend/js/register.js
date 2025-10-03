async function register() {
  try {
    document
      .getElementById("registerForm")
      .addEventListener("submit", async function (r) {
        r.preventDefault();

        const form = {
          iduser: document.getElementById("iduser").value.trim(),
          fname: document.getElementById("fname").value.trim(),
          lname: document.getElementById("lname").value.trim(),
          email: document.getElementById("email").value.trim(),
          password: document.getElementById("password").value.trim(),
        };

        // console.log(form);

        const res = await fetch(`${api_user}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "สมัครสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/frontend/index.html";
          });
        } else if (data.message == "ข้อมูลซ้ำ") {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "ข้อมูลซ้ำ",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        }
      });
  } catch (err) {
    console.error("Error try", err);
  }
}

function login() {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = {
      iduser: document.getElementById("iduser").value,
      password: document.getElementById("password").value,
    };

    try {
      const res = await fetch(`${api_user}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          const user = data.user; // ตรวจว่ามี role มั้ย

         
          if (data && data.success) {
            Swal.fire({
              icon: "success",
              title: "เข้าสู่ระบบสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              const user = data.user;
              if (user && user.role) {
                switch (user.role) {
                  case "A":
                    location.replace("/frontend/page/A/dashA.html");
                    break;
                  case "S":
                    location.replace("/frontend/page/S/dashS.html");
                    break;
                  case "T":
                    location.replace("/frontend/page/T/dashT.html");
                    break;
                  case "B":
                    location.replace("/frontend/page/B/dashB.html");
                    break;
                  default:
                    Swal.fire("Role ไม่ถูกต้อง ❌", "", "error");
                    location.replace("/frontend/index.html");
                }
              } else {
                Swal.fire("ไม่พบ role ในข้อมูลผู้ใช้ ❌", "", "error");
                location.replace("/frontend/index.html");
              }
            });
          } else {
            // แสดง error เมื่อ login ไม่สำเร็จ
            Swal.fire(
              "เข้าสู่ระบบไม่สำเร็จ",
              data?.message || "กรุณาตรวจสอบอีกครั้ง",
              "error"
            );
          }
        });
      }
    } catch (err) {
      Swal.fire("Error", "❌ เกิดข้อผิดพลาด", "error");
      console.error(err);
    }
  });
}
