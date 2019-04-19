---
title: 'Novietify: Một 24h side project'
description: >-
  Chương đầu tiên trong chuỗi bài Featurette, câu chuyện về một dự án phần mềm
  nhỏ.
tag: featurette
thumbnail: /assets/featurette.png
date: '2019-04-19'
serie: Featurette
---
Mình bắt đầu một serie bài mới mang tên _Featurette_, đơn giản là tập hợp những gì mình muốn viết sau khi thực hiện một dự án phần mềm.

Tên của serie: _Featurette_ - là một từ phổ biến hơn trong điện ảnh - dùng để chỉ thể loại “behide-the-scenes”, kể về những câu chuyện hậu trường, quá trình thực hiện, hay phỏng vấn dàn cast của một tác phẩm. Trong trường hợp này, sẽ là những bài viết dài ngắn về những bí mật động trời (chưa bao giờ được kể) và kinh nghiệm thực hiện phía sau những phần mềm to nhỏ.

Bạn đang đọc bài đầu tiên của _Featurette_, nhân vật chính hôm nay là [Novietify](https://novietify.qckhnh.com/)  - Một web app nhỏ mình thực hiện trong khoảng 20 tiếng (10h code) hồi đầu tuần.

## Ý tưởng

Ý tưởng đã được phác thảo từ ít ngày trước, sau một cuộc nhậu để họp bàn về sự ra đời của một nhóm các fanboy Marvel muốn đi xem _Endgame_ buổi chiếu sớm. Vậy là không được chậm trễ nữa vì thời gian công chiếu sắp đến, sau một ngày 15/04/2019 _ngủ_, mình quyết định _bay_ ngay đêm đó.

## Công nghệ

Nhiều công nghệ được mình sử dụng, hầu như trong mọi Express app, mọi người có thể xem thêm các packages trong file `package.json`, link repo mình để bên dưới phần mã nguồn mở. Dưới đây sẽ là một số công nghệ nổi bật.

### Code linter

Trải qua nhiều kinh nghiệm đau thương tự custom Eslint, gần đây mình hay dùng một cấu hình Eslint và Prettier đơn giản của Wesbos: [eslint-config-wesbos](https://github.com/wesbos/eslint-config-wesbos).

* Ưu điểm là chỉ cần một lệnh duy nhất để cài đặt tất cả mọi thứ, và hoạt động tốt với hầu hết những project từ front-end như `create-react-app`, `gatsby` đến back-end như `expressjs`.
* Nhược điểm của nó, mà cũng không hẳn là vậy, là bắt rules khá kỹ lưỡng. Điều này làm người (phóng khoáng) như mình phải override lại tương đối nhiều 😂.

Nhìn chung đây là một cấu hình rất đáng sử dụng, giúp bạn tiết kiệm được cả đống thời gian và dành phần còn lại để code cho ngon.

### ExpressJS và Mongoose

Thoạt đầu mình có ý tưởng chỉ dùng client side React kết hợp với Firebase như một [ứng dụng crawl dữ liệu đơn giản](https://github.com/bkdev98/ebooks-crawler) khác mình từng làm. Nhưng vì sợ cuộc sống đổi thay mà cũng lâu không dùng Firebase nên mình quyết định làm server-side luôn.

NodeJS luôn là một nền tảng tuyệt vời cho những ứng dụng kiểu này, kết hợp với mongoose giúp mình lưu dữ liệu phim và một ít thông tin liên hệ của user.

### View Engine: Dùng React ở Server Side?

Mình vẫn hay chọn `Handlebars` và `Jade` để làm view engine. Nhưng ngày hôm đó trời đẹp, nên sẽ như thế nào nếu dùng React nhỉ? Và trong 5s mình đã tìm ra ngay một package hỗ trợ mình làm điều này: [express-react-views](https://github.com/reactjs/express-react-views). Mắt nhắm mắt mở nhìn vào mẩu example trong readme: Một chút `props` từ server truyền vào và một chút Virtual DOM sẽ làm cuộc sống dễ dàng đến mấy, cứ nghĩ tới mà rần rần trong người.

```jsx
var React = require('react');

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

module.exports = HelloMessage;
```

Nhưng không, cuộc sống có như cuộc đời đâu. Sau khi đã dùng nó cho gần hết app, đến khi muốn validate dữ liệu của input, mình nhận ra có điều gì đó không ổn.

Những component React cuối cùng sẽ bị render hết thành static html, sẽ không có cọng virtual DOM nào dính lại ở đây để mà nhảy múa như mình từng mơ tưởng. Điều này đã được ghi rõ ngay đầu file readme của package mà mình bỏ sót bấy lâu nay. Thói quen chỉ nhìn vào example cuối cùng đã phát huy được hậu quả đáng kinh ngạc.

![express-react-view](/assets/express-react-view.png)

Mà đã nhảy lên lưng cọp rùi thì vẫn phải đi chứ sao. Nhìn chung là cũng không tới nỗi nào, bạn vẫn có thể reuse component để làm layout, và phần lớn vẫn đáp ứng được những tính năng như handlebars. Nhưng sự thiếu vắng của virtual DOM là không thể bù đắp được 🤧.

> Rút lại: Đừng bao giờ coi thường readme.

### Styling

Mình dùng một mẩu css nhỏ mà mình phát hiện vài ngày trước trên `Product Hunt`, có tên là  [water.css](https://github.com/kognise/water.css) . Về cơ bản `water.css` là một bootstrap tối giản và không xài class. Tất cả việc bạn cần làm là code như một file html thông thường, nhúng đoạn css này vô, chẳng cần suy nghĩ về tên class là gì, và chúng chỉ việc hoạt động.

Tất nhiên, nó không đẹp tinh tế mỹ miều, nhưng là hoàn hảo với một 24h side project. Đặc biệt còn hỗ trợ cả dark theme và responsive.

Về phần responsive, nếu đã sử dụng Novietify, bạn sẽ thấy ngay phần grid chọn phim. Để cho đơn giản, mình sử dụng [CSS Grid](https://www.w3schools.com/CSS/css_grid.asp). Không cần phải dùng cả một thư viện để làm việc này nữa, chỉ cần 3 hàng là xong:

```css
.movie-list {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
}
```

Cho dễ hình dung, mỗi chữ auto tương ứng với một cột, 5 chữ định nghĩa rằng sẽ có 5 bộ phim nằm trên mỗi hàng. Vì vậy trên những thiết bị di động, bạn chỉ cần giảm số lượng chữ auto này xuống cho phù hợp là xong.

### Dữ liệu phim và thông báo

Đây là phần quan trọng nhất của ứng dụng: lấy dữ liệu phim và cho biết nếu phim đã cho phép đặt vé, cũng là phần tốn nhiều thời gian nhất (hơn 70% tổng thời gian).

Ý định ban đầu của mình là crawl và bóc tách dữ liệu trực tiếp từ website của Galaxy Cinema. Công nghệ ở đây là kết hợp `request-promise` với `cheerio`. Bạn sẽ dễ dàng tìm thấy những bài viết hướng dẫn sử dụng hai gói này trên google với những từ khoá như `crawl data with nodejs`…

Mình đã gần như hoàn thành công việc crawl này (bạn có thể tìm thấy file crawl data trong thư mục `src/utils/crawlers.js` của repo). Tuy nhiên trong lúc inspect để lọc chi tiết rạp của từng phim, mình nhận ra website Galaxy Cinema chạy trên nền Angular và lấy dữ liệu từ một API thông qua tab Network của Google Developer Tool (chứ không chạy server side như mình tưởng ban đầu). Bất ngờ khi thử nghiệm API này lại không có một lớp proxy nào bảo vệ. Vậy là điều gì đến cũng phải đến, mình quyết định drop công sức crawl bóc tác data cả đêm và nhảy qua dùng luôn API gốc khi mặt trời đã lên tới nóc.

Chi tiết được mình implement trong file `src/utils/api.js`. Chỉ cần đơn giản 2 API để hoàn thành ứng dụng này, một để lấy dữ liệu phim đang và sắp chiếu, một để kiểm tra xem phim cho phép đặt vé chưa.

_Cách hoạt động_: Mỗi 5 phút (`setInterval` is your friend), _Novietify_ sẽ gửi request lấy danh sách phim, và kiểm tra tình trạng đặt vé của từng phim. Nếu phim cho phép đặt vé, ứng dụng sẽ gửi email cho danh sách user đã đăng ký phim đó, và cập nhật tình trạng của phim trong database để không gửi trùng thông báo khi phim đã cho đặt vé.

### Gửi email

Mình dùng `node-mailer` là một giải pháp đơn giản hỗ trợ đầy đủ các kiểu kết nối email, bạn cũng có thể dùng `email-templates` nếu muốn có một template email tốt hơn.

## Triển khai và mã nguồn mở

### Heroku và mLab

Heroku là một nền tảng giúp triển khai ứng dụng trên mây một cách tối giản, hỗ trợ nhiều ngôn ngữ và giá cả phải chăng.

Gói miễn phí của Heroku dùng khá tốt, tuy nhiên sẽ bị shutdown mỗi 30 phút không có tương tác và mất kha khá thời gian để phục hồi. Với _Novietify_ mình dùng gói dyno $7/month để được hỗ trợ SSL và giúp ứng dụng ổn định hơn, kết hợp với plugin mLab (free) có sẵn để deploy mongoDB là số dzách luôn.

### Mã nguồn mở

Mã nguồn Novietify mình publish trên tài khoản Github để mọi người tham khảo, hay lấy làm template không cần hỏi ý mình nhé. Tuy nhiên readme còn sơ sài, có thời gian mình sẽ cập nhật hướng dẫn cẩn thận sau.

Nếu có bất kỳ vấn đề hay câu hỏi nào cứ gửi tin nhắn hay mail cho mình.

 <https://github.com/bkdev98/novietify> 

## Dòng thời gian

* **15/04 08:30 PM**: Khởi tạo dự án, thiết kế giao diện
* **15/04 11:30 PM**: Dành tuổi thanh xuân để crawl và bóc tách dữ liệu, thiết kế email template
* **16/04 07:00 AM**: Phát hiện Galaxy Cinema API. Tạo ra một câu chuyện buồn đã kể ở trên.
* **16/04 09:00 AM**: Hoàn thành cơ bản, deploy lên heroku và làm nhẹ một giấc tới trưa.
* **16/04 00:30 PM**: Ăn trưa, fix một số bug, cải thiện code base. Chưa kết nối được custom domain từ heroku dù đã đổi DNS, nghĩ bụng do Z.com cập nhật lâu.
* **16/04 (rest of the day)**: vẫn chưa kết nối được domain dù đã chạy tìm thầy thuốc, quyết định mail complain tới Z, đi nhậu.
* **17/04 07:30 AM**: Nhận được phản hồi từ Z, biết được do mình đã đổi name server sang Netlify để quản lý nên Z không đổi được. Vào Netlify cấu hình DNS và ngồi khóc.
* **17/04 (ngay sau đó)**: Tên miền mới hoạt động (netlify.qckhnh.com).
* **17/04 10:19 AM**: Kiểm tra lần cuối và chia sẻ Novietify lên mạng xã hội.
* **17/04 (rest of the day)**: Bắt đầu một dự án khác + Đọc comment và ngồi khóc 😂.
  …
* **18/04 05:30 PM**: Thông báo phim **_đầu tiên_** được Novietify gửi, trong lúc mình đang ngủ, cũng chính là bộ phim Avenger Endgame.
* **18/04 07:00 PM**: Ngủ dậy và ngồi khóc.

![crying](/assets/novietify-crying.png)

## Tổng kết

Ứng dụng ra mắt, nhiều người thích, một số không. Nhưng Novietify không phải là một ứng dụng có thuật toán phức tạp, hay một siêu phẩm về thẩm mỹ. Đơn giản nó chỉ là một thú vui, mà đã lâu mình đánh mất đi.

> Mình xin gửi lời cảm ơn đến những người bạn và thầy đã ủng hộ và chia sẻ giúp mình, cảm ơn mọi người rất nhiều ❤️.

Một ứng dụng nữa sẽ (có thể) lên sóng _Featurette_ trong tuần sau, lần này sẽ là một mobile app khá vui sử dụng React Native. Nếu thấy thú vị bạn có thể đăng ký ở bên dưới để nhận email khi mình publish nhé.

![ending](/assets/ins-story-novietify.png)
