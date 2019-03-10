---
title: 'React 01: Khởi đầu'
description: >-
  Một cách đơn giản để tiếp cận React, thư viện JavaScript phổ biến nhất thế
  giới.
tag: react
thumbnail: /assets/react-for-everyone.png
date: '2019-03-10'
serie: React cho mọi người
---
Nhiều nhiều năm về trước, lập trình web từng vô cùng đơn giản. Bạn chỉ cần mở notepad, copy đoạn code dưới đây vào, lưu lại với tên `mypage.html` rồi mở nó lên bằng một trình duyệt bất kỳ:

```html
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    Welcome to my web page.
  </body>
</html>
```

Nếu bạn chưa từng lập trình trước đây và cũng chẳng hiểu chuyện gì xảy ra ở trên thì cũng đừng lo, cứ đọc lại lần nữa. Về cơ bản cấu trúc một trang web được xây dựng dựa trên những thẻ lồng vào nhau, ký hiệu bằng cặp dấu `<tênthẻ></tênthẻ>`. Những thẻ khác nhau có những chức năng khác nhau, một số làm thay đổi kiểu dáng (`<i>`, `<b>`,…), một số thay đổi kích thước (`<h1>`, `<h2>`,…), một số khác có chức năng đặc biệt hơn như tạo liên kết (`<a>`), hay thẻ `<title>` giúp trình duyệt có thể hiểu được tiêu đề của trang web.

Nhưng một website tĩnh dễ đem đến sự nhàm chán. Sự phát triển của loài người kéo theo sự mong mỏi có thể một lần tương tác nhiều hơn trên trang web 🍻. Để giải quyết vấn đề này, một nhóm lập trình viên ở [Netscape](https://en.wikipedia.org/wiki/Netscape_Navigator) xây dựng nên JavaScript, mà ngày nay đã trở thành ngôn ngữ lập trình phổ biến nhất cho website.

JavaScript về bản chất thực sự rất đơn giản. Bạn chỉ cần dùng thẻ `<script>` và viết vài dòng code vào đó.

```html{4,6}
<html>
  <head>
    <title>My page</title>
    <script>
      alert("Hello!");
    </script>
  </head>
  <body>
    Welcome to my web page.
  </body>
</html>
```

Khá đơn giản phải không? Nhưng ví dụ này không quá thú vị vì những gì nó làm chỉ là hiển thị một popup khi bạn tải trang, vậy thì chưa được tương tác lắm. Để tăng tương tác thì bạn sẽ cần một cái gì đó để nhấn vào và JavaScript có thể nhậu được hành động mà phản hồi.

Chính vì vậy, các `function` và `event` xuất hiện. Function là cách để đặt tên cho một số dòng code thực hiện chung một công việc nào đó. Event là những sự kiện xảy ra trên trang web, như khi click hay scroll chuột,… Trong trường hợp này, chúng ta sẽ cần một event click chuột để thực hiện function mà ta đặt tên là `sayHello`:

```html{11}
<html>
  <head>
    <title>My page</title>
    <script>
      function sayHello() {
        alert("Hello!");
      }
    </script>
  </head>
  <body>
    <button onclick="sayHello()">Click Me!</button>
  </body>
</html>
```

Vậy là bạn đã trở thành một /web developer/ chân chính rồi đó! Về cơ bản bạn đã học được một số yếu tố nền tảng của JavaScript, những kiến thức cực kỳ đơn giản mà ai cũng có thể tiếp thu được. Vậy tại sao mọi người lại nghĩ React khó đến vậy?

### Tổng quan về React

React là một thư viện JavaScript giúp tạo những sự tương tác dễ dàng hơn. Dưới đây là một đoạn code có chức năng tương tự như ở trên, nhưng được viết bằng React:

```jsx
import React from "react";

export function Page() {
  function sayHello() {
    alert("Hello!");
  }
  return <button onClick={sayHello}>Click me</button>;
}
```
[Chạy thử Demo](https://codesandbox.io/s/m4vxr39jqp?fontsize=14)

Đó là React, code cũng khá giống với ban đầu, nhưng đơn giản hơn. Những sự thay đổi đáng kể nhất:
* Với React, bạn sẽ viết HTML code trong JavaScript (thay vì những cách khác).
* Trang Page bây giờ sẽ là một function. Đó là cách để giải quyết vấn đề mà tôi sẽ giải thích bên dưới.
* Function `sayHello` vẫn giữ nguyên như cũ, nhưng bạn không cần dùng thẻ `<script>` nữa.
* Cuối cùng, nút `<button>` vẫn giống như HTML.

Có thể thấy được React hoàn toàn tập trung vào việc sử dụng ít thẻ hơn để tăng tốc quy trình làm việc. Nhưng đó không phải là lý do tại sao mọi người lại rất hào hứng với việc xây dựng mọi thứ bằng React. Nó không chỉ về việc sử dụng ít thẻ hơn, mà còn vì bạn có thể tạo nên các thẻ của riêng mình. Và các thẻ bạn tạo trong React được gọi là các component.

### React Components

Chúng ta sẽ thử làm một ví dụ nữa, lần này là thanh điều hướng (navigation) cho trang web bằng HTML:

```html
<div>
  <div><img src="image/Home.png"><span>Home</span></div>
  <div><img src="image/Blog.png"><span>Blog</span></div>
  <div><img src="image/Now.png"><span>Now</span></div>
  <div><img src="image/About.png"><span>About</span></div>
</div>
```

Khá đơn giản, nhưng như bạn có thể thấy, rất lặp đi lặp lại. Đối với mỗi mục trình đơn, bạn cần phải viết một loạt các HTML chính xác, với các biểu tượng và tiêu đề khác nhau. Tệ hơn nữa, nếu sau này bạn quyết định thay đổi giao diện của một mục menu, bạn sẽ phải sao chép, dán và cập nhật nó cho từng mục.

Vì vậy, hãy thử giải quyết điều này giống như những người máy tính thông minh mà chúng ta đang có. Hãy tưởng tượng trong một giây rằng trên đầu trang của tất cả các thẻ hiện có, bạn có thể tạo các thẻ mới. Và nếu bạn có những siêu năng lực đó, bạn có thể tổ chức thực đơn của mình như thế này không?

```jsx
<div>
  <MenuItem name="Home" />
  <MenuItem name="Blog" />
  <MenuItem name="Now" />
  <MenuItem name="About" />
</div>
```

Đẹp hơn và sạch hơn, chưa kể hiệu quả hơn. Bạn đã tạo ra phiên bản HTML của riêng mình, một thành phần được tạo riêng cho trang web mà bạn đang làm việc. Bạn gần như có thể nghĩ các thành phần của mình là các mẫu nhỏ (component), được kết hợp hoàn hảo với HTML thông qua các thẻ.

Đây chính xác là những gì React cho phép bạn làm. Hãy cùng xem xét phiên bản chính xác của phần trên trong React.

```jsx
function MenuItem(props) {
  return (
    <div>
      <img src={`image/${props.name}.png`} />
      <span>{props.name}</span>
    </div>
  );
}
 
function Menu() {
  return (
    <div>
      <MenuItem name="Home" />
      <MenuItem name="Blog" />
      <MenuItem name="Now" />
      <MenuItem name="About" />
    </div>
  );
}
```

Xem qua đoạn code này, nó sẽ trông khá đơn giản, chỉ cần thêm một chút JavaScript, như `function` và `return`. Tôi sẽ giải thích bên dưới, nhưng nói chung bạn sẽ tạo ra `MenuItem` trước, sau đó sử dụng bao nhiêu lần tùy thích trong Menu dưới dạng thẻ HTML thích hợp. Khá tuyệt phải không?

Các `function` là một cách để xác định các khối mã nhỏ trong JavaScript với một đầu vào và một đầu ra, giống như một công thức toán học. Bạn truyền vào một số và nó trả về một số khác. Đó chính xác là những gì mà `return` làm ở đây.
