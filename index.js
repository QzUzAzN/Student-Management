// quản lý sinh viên bằng oop
// tất nhiên là ko dùng class ròi

function Student(name, birthday) {
  this.name = name;
  this.birthday = birthday;
  this.id = new Date().toISOString();
}

// khi mà mình tạo ra sv ròi thì mình sẽ lưu vào ls
// class Store chứa method xử lý localStorage
function Store() {}
// .getStudents(): hàm lấy danh sách students từ ls
Store.prototype.getStudents = function () {
  return JSON.parse(localStorage.getItem("students")) || [];
};
// .add(student): hàm nhận vào student và thêm vào ls
Store.prototype.add = function (student) {
  // lấy danh sách students về
  let students = this.getStudents();
  //   nhét student vào students
  students.push(student);
  //   lưu lên lại localStorage
  localStorage.setItem("students", JSON.stringify(students));
};

// dùng student có đc để hiển thị lên giao diện
//RenderUI
// RenderUI là thằng chuyên các method xử lý giao diện
function RenderUI() {}

// .add(student): nhận vào student và biến nó thành tr để hiện thị table
RenderUI.prototype.add = function ({ name, birthday, id }) {
  // lấy students
  let store = new Store(); //instance: object tạo từ Store
  let students = store.getStudents();
  let newTr = document.createElement("tr");
  newTr.innerHTML = `<td>${students.length}</td>
            <td>${name}</td>
            <td>${birthday}</td>
            <td>
              <button
                class="btn btn-outline-danger btn-sm btn-remove"
                data-id="${id}"
              >
                Xoá
              </button>
            </td>`;

  document.querySelector("tbody").appendChild(newTr);
  //   reset các giá trị ô input
  document.querySelector("#name").value = "";
  document.querySelector("#birthday").value = "";
};

// làm hàm hiển thị thông báo lên ui
// type = "success" : mặc định là màu success
RenderUI.prototype.alert = function (msg, type = "success") {
  let divAlert = document.createElement("div");
  divAlert.className = `alert alert-${type} text-center`;
  divAlert.innerHTML = msg;

  document.querySelector("#notification").appendChild(divAlert);
  setTimeout(() => {
    divAlert.remove();
  }, 2000);
};

// main flow
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  //   lấy data từ các input
  let name = document.querySelector("#name").value;
  let birthday = document.querySelector("#birthday").value;

  //   dùng data thu đc từ các input tạo student
  let newStudent = new Student(name, birthday);
  //   lưu vào ls
  let store = new Store(); //tạo instance của Store
  store.add(newStudent);
  // hiển thị lên UI
  let ui = new RenderUI();
  ui.add(newStudent);
  ui.alert(`Đã thêm thành công sv có tên ${name}`);
});
