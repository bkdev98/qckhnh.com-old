---
title: 'React 01: Khởi đầu'
description: >-
  Một cách đơn giản để tiếp cận React, thư viện JavaScript phổ biến nhất thế
  giới.
tag: reactjs
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

```html
<html>
  <head>
    <title>My page</title>
    <script>
      alert('Hello!')
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
        alert('Hello!')
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
import React from 'react'

export function Page() {
  function sayHello() {
    alert('Hello!')
  }
  return <button onClick={sayHello}>Click me</button>
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

Chúng ta sẽ thử làm một ví dụ nữa, lần này là thanh điều hướng (navbar) cho trang web bằng HTML:

```html
<div>
  <div><img src="image/Home.png" /><span>Home</span></div>
  <div><img src="image/Blog.png" /><span>Blog</span></div>
  <div><img src="image/Now.png" /><span>Now</span></div>
  <div><img src="image/About.png" /><span>About</span></div>
</div>
```

Khá đơn giản, nhưng như bạn có thể thấy, rất lặp đi lặp lại. Đối với mỗi mục trình đơn, bạn cần phải viết một loạt các thẻ HTML chính xác, với các icon và tiêu đề khác nhau. Tệ hơn nữa, nếu sau này bạn quyết định thay đổi giao diện của một mục menu, bạn sẽ phải copy, paste và cập nhật cho từng mục.

Để giải quyết vấn đề này, hãy tưởng tượng rằng ngoài các thẻ HTML hiện có, bạn có thể tạo ra các thẻ mới. Và nếu bạn có được siêu năng lực đó, bạn sẽ có thể làm lại thanh navbar của mình như thế này:

```jsx
<div>
  <MenuItem name="Home" />
  <MenuItem name="Blog" />
  <MenuItem name="Now" />
  <MenuItem name="About" />
</div>
```

Đẹp, gọn, và hiệu quả hơn. Bạn đã tạo ra một phiên bản HTML của riêng mình. Bạn có thể nghĩ các thẻ thành phần mới của mình là các mẫu nhỏ (component), có thể kết hợp hoàn hảo với HTML.

Đây chính xác là những gì React cho phép bạn làm. Hãy cùng xem phiên bản chính xác của đoạn code trên trong React.

```jsx
function MenuItem(props) {
  return (
    <div>
      <img src={`image/${props.name}.png`} />
      <span>{props.name}</span>
    </div>
  )
}

function Menu() {
  return (
    <div>
      <MenuItem name="Home" />
      <MenuItem name="Blog" />
      <MenuItem name="Now" />
      <MenuItem name="About" />
    </div>
  )
}
```

Nhìn qua đoạn code này, khá đơn giản, nó chỉ thêm một chút JavaScript: `function` và `return`. Tôi sẽ giải thích bên dưới, nhưng nói chung bạn sẽ tạo ra `MenuItem` trước, sau đó sử dụng lại  bao nhiêu lần tùy thích trong `Menu`. Khá tuyệt phải không?

Các `function` là một cách để xác định từng đoạn code nhỏ trong JavaScript, tuỳ vào mục đích của đoạn code đó, với một đầu vào và một đầu ra, cũng giống như một công thức toán học. Bạn truyền vào một số và nó trả về (`return`) một số khác.

Trong ví dụ trên, các hàm không chỉ được sử dụng để xác định một đoạn mã mà còn để đặt tên cho chúng. Và tên đó được tự động biến thành một thẻ bởi React, sau đó bạn có thể chỉ cần sử dụng trong bất kỳ component khác trong project của mình, giống như thẻ `MenuItem` ở trên. Về cơ bản, bạn có thể nghĩ về một component React như một thẻ (tag) và như là một `function`, cả ba đều giống nhau. Khái niệm này sẽ trở nên phức tạp hơn khi bạn đi sâu hơn. Còn bây giờ, điều này sẽ giúp bạn hiểu các nguyên tắc cơ bản.

Phần cuối cùng là đầu vào (input) của các component. Trong trường hợp này, đó là thuộc tính tên (`name`) của `MenuItem`. Các input trong React được gọi là `props`, viết tắt cho property (thuộc tính). Nếu bạn cần sử dụng một thuộc tính, ví dụ thuộc tính `name` trong ví dụ, bạn chỉ cần viết `props.name`. Bạn có thể tự do chọn bất kỳ tên nào bạn thích và sử dụng bao nhiêu lần tùy ý. Để truyền thuộc tính vào component, bạn sẽ thực hiện cú pháp gần tương tự như HTML: `<MenuItem`**`name="Home"`**`/>`.

Xem thêm: [Định nghĩa function bởi Wesbos](https://twitter.com/wesbos/status/1105907924088565762)

![function definition](/assets/function-definition.png)

Đó là tất cả cho phần đầu tiên trong chuỗi bài **React cho mọi người**. Mọi người có góp ý hay thắc mắc thì gửi lời nhắn cho mình qua email hoặc khung chat phía dưới nhé.
