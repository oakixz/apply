async function notable() {
    try
    {
        const res = await fetch(`${api_teacher}/notable`);

        const result = await res.json();
        const data = result.data;
        console.log(data)

        if(res.ok)
        {
            const tbody = document.getElementById("noapply");
            const rows = data.map((n , i) => 
            `
            <tr>
            <td>${i + 1}</td>
            <td>${n.iduser}</td>
            <td>${n.fname} ${n.lname}</td>
            <td>${n.email}</td>
            </tr>
            `);

            tbody.innerHTML = rows.join("");


        }

    }
    catch(err)
    {
        console.error("Error noapply",err);
    }
}

async function table() {
    try
    {
        const res = await fetch(`${api_teacher}/table`);

        const result = await res.json();
        const data = result.data;
        console.log(data)

        if(res.ok)
        {
            const tbody = document.getElementById("apply");
            const rows = data.map((n , i) => 
            `
            <tr>
            <td>${i + 1}</td>
            <td>${n.iduser}</td>
            <td>${n.fname} ${n.lname}</td>
            <td>${n.email}</td>
            </tr>
            `);

            tbody.innerHTML = rows.join("");


        }

    }
    catch(err)
    {
        console.error("Error noapply",err);
    }
}

async function success() {
    try
    {
        const res = await fetch(`${api_teacher}/success`);

        const result = await res.json();
        const data = result.data;
        console.log(data)

        if(res.ok)
        {
            const tbody = document.getElementById("apply");
            const rows = data.map((n , i) => 
            `
            <tr>
            <td>${i + 1}</td>
            <td>${n.iduser}</td>
            <td>${n.fname} ${n.lname}</td>
            <td>${n.email}</td>
            </tr>
            `);

            tbody.innerHTML = rows.join("");


        }

    }
    catch(err)
    {
        console.error("Error noapply",err);
    }
}


