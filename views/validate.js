function validateForm()
{
    // Bước 1: Lấy giá trị của username và password
    var ma_bb = document.getElementById('ma_bb').value;
    var ten_bb = document.getElementById('ten_bb').value;
    var link =document.getElementById('url_link').value;
    var ktma = document.getElementById('ktMA').innerText;
    // var password = document.getElementById('password').value;
 
    // Bước 2: Kiểm tra dữ liệu hợp lệ hay không
    if (ma_bb == '')
    {
        alert('Bạn chưa nhập mã');
    }
    else if(ma_bb == ktma){
      alert('Trùng mã')
    }
    else if (ten_bb == '')
    {
        alert('Bạn chưa nhập tên');
    }
     else if (link == ''){
      alert('Bạn chưa nhập link ')
    }
    else{
        // alert('Dữ liệu hợp lệ, ta có thể chấp nhận submit form');
        return true;
    }
 
    return false;
}