// Program utama menggunakan async dan wait
async function main() {
    const response = await fetch('/api');
    const text = await response.text()
    
    document.getElementById('post').innerHTML = text
}

main()

