async function checkSession() {
  try {
    const res = await fetch(`${api_user}/check-session`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.loggedIn) {
      const el = document.getElementById("msg");
      if (el) {
        el.innerText = `ยินดีต้อนรับ ${data.user.fname} ${data.user.lname} 🎉`;
      }
    } else {
      location.replace("/frontend/index.html");
    }
  } catch (err) {
    console.error("Session Error:", err);
    // ถ้ามี error → กันพลาด ส่งไป index.html เหมือนกัน
    window.location.href = "/frontend/index.html";
  }
}

async function logout() {
  try {
    const res = await fetch(`${api_user}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) {
      Swal.fire("ออกจากระบบแล้ว ✅", "", "success").then(() => {
        window.location.href = "/frontend/index.html";
      });
    }
  } catch (err) {
    console.error("Logout Error:", err);
  }
}

checkSession();
