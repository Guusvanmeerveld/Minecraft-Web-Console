document.getElementById('password').addEventListener('keydown', e => {
    if (e.code == "Enter") {
        axios('/api/password', {
                method: "POST",
                headers: {
                    'password': document.getElementById('password').value
                }
            })
            .then(data => {
                if (data.data.success) {
                    localStorage.setItem(
                        "password",
                        document.getElementById("password").value
                    );
                    location.href = '/';
                }
            });
    }
});