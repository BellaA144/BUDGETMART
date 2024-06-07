document.addEventListener('DOMContentLoaded', () => {
    // Menambahkan kelas fade-in saat halaman dimuat
    document.body.classList.add('fade-in');

    // Fungsi untuk validasi dan pengalihan halaman dengan animasi fade-out
    function validationCheck(event) {
        alert("Process")
        console.log('asdasd')
        event.preventDefault()
        var username = document.getElementById("usernametxt").value;
        var password = document.getElementById("passwordtxt").value;
        var email = document.getElementById("emailtxt").value;
        var mobilephone = document.getElementById("mobilephonetxt").value;

        if (username == "") {
            alert("Fill the Username/Email");
        } else if (password == "") {
            alert("Fill the Password");
        } else if (email == "") {
            alert("Fill the Email");
        } else if (mobilephone == "") {
            alert("Fill the Mobile Phone");
        } else {
            // Data pengguna
            const userData = {
                user: username,
                password: password,
                email: email,
                mobilephone: mobilephone,
                role: "user"
            };

            console.log(userData);
            // Mengirim data ke server menggunakan AJAX
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/signup', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                console.log(xhr.readyState)
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    // alert(xhr.status)
                    if (xhr.status === 200) {
                        console.log("User Create. Redirecting to index.html");
                        alert('Sign up successful!');
                        document.body.classList.add('fade-out');
                        window.location.href= "index.html"
                    } else {
                        alert('Failed to sign up. Please try again later.');
                    }
                }
            };
            xhr.send(JSON.stringify(userData));
        }
    }

    // Event listener untuk tautan dengan animasi fade-out
    document.querySelectorAll('a.hyperlink').forEach(link => {
        link.addEventListener('click', function (event) {
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
