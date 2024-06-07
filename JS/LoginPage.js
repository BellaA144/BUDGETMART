document.addEventListener('DOMContentLoaded', () => {
    // Menambahkan kelas fade-in saat halaman dimuat
    document.body.classList.add('fade-in');

    // Fungsi untuk validasi dan pengalihan halaman dengan animasi fade-out
    async function validationCheck() {
        var username = document.getElementById("usernametxt").value;
        var password = document.getElementById("passwordtxt").value;
        
        const responseUser = await fetch('user.json');
        const users = await responseUser.json();

        if (username == "") {
            alert("Fill the Username/Email");
        } else if (password == "") {
            alert("Fill the Password");
        }else{
            const user = users.find(u => (u.user === username || u.email === username) && u.password === password);
            if (user) {
                if(user.role === "user"){
                    console.log("User found. Redirecting to index.html");
                    alert("USER");
                    document.body.classList.add('fade-out');
                    window.location.replace("index.html");
                }
                else if(user.role === "admin"){
                    console.log("Admin found. Redirecting to index.html");
                    alert("ADMIN");
                    document.body.classList.add('fade-out');
                    window.location.replace("index.html")
                }
            }
            else {
                alert("Invalid Username/Email or Password");
            }

            
            return false; // Prevent form submission
        }

    }

    // Event listener untuk tautan dengan animasi fade-out
    document.querySelectorAll('a.hyperlink').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah pengalihan langsung
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = this.href;
            }, 500); // Waktu sesuai dengan durasi animasi fade-out
        });
    });

    // Memastikan fungsi validationCheck tersedia secara global
    window.validationCheck = validationCheck;
});
