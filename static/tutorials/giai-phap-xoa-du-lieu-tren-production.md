---
title: Giải pháp xoá dữ liệu trên production
description: >-
  Một số cách để xoá dữ liệu mà vẫn có thể khôi phục lại sau đó, đồng thời giải
  quyết vấn đề ràng buộc unique.
tag: database
thumbnail: /assets/deletion-token.png
date: '2019-06-26'
---
Một số cách để xoá dữ liệu mà vẫn có thể khôi phục lại sau đó, đồng thời giải quyết vấn đề ràng buộc unique.

### Vấn đề

Đối với dữ liệu trên production, việc xoá cứng khỏi db là điều cần tránh. Ví dụ mình có một bảng thông tin người dùng bao gồm email (email là duy nhất không được trùng). Khi xoá người dùng, để có thể khôi phục lại người dùng sau này, mình có thể đặt một giá trị isRemoved = true. Vậy khi query danh sách user chỉ cần loại bỏ những record có isRemoved ra. Tuy nhiên khi đó, nếu tạo thêm người dùng mới trùng email với người dùng đã bị xoá, db sẽ báo lỗi ràng buộc unique bị vi phạm do email người dùng bị xoá vẫn còn trong bảng.

### Mục tiêu

* Giải pháp có thể áp dụng cho hệ thống cơ sở dữ liệu có sẵn.
* Giải pháp có thể hoạt động trên tất cả các cơ sở dữ liệu.

### Giải pháp cuối cùng

* Thêm một field `deletionToken`.
* Ràng buộc unique bây giờ sẽ là tập hợp của hai trường `email` và `deletionToken`.
* Một người dùng mới sẽ có giá trị `deletionToken` mặc định là `null` (hay `NA`).
* Xoá người dùng bằng cách gắn `deletionToken` bằng một UUID ngẫu nhiên.

### Một số giải pháp mình đã dùng

1. Ràng buộc unique bằng tập hợp hai trường `email` và `isRemoved`. *Hạn chế*: Không cho phép có nhiều hơn 1 tài khoản bị xoá có trùng email.

2. Thêm ràng buộc với câu truy vấn where, ví dụ `ADD CONSTRAINT .... WHERE isRemoved != true;`. *Hạn chế*: truy vấn where khi thêm ràng buộc không được hỗ trợ bởi [tất cả csdl](http://stackoverflow.com/a/20962904/69362) .

3. Thay `isRemoved` kiểu dữ liệu boolean thành một biến số tăng dần mỗi khi một record bị xoá. *Hạn chế*: Phải truy vấn thêm để đếm số record đã xoá cũng như phải cập nhật cho csdl có sẵn.

4. Thêm một trường `deletedAt` là thời gian (time-stamp) khi xoá và ràng buộc unique tập hợp `email` và `deletedAt`. *Hạn chế*: Dữ liệu cũ không có sẵn giá trị cho `deletedAt`, cũng như khó khăn khi khởi tạo dữ liệu mẫu.

5. Thêm một trường `deletionToken` có giá trị mặc định là `NULL` và gắn bằng một UUID ngẫu nhiên khi xoá. Thêm ràng buộc unique tập hợp của `email` và `deletionToken`.  *Hạn chế*: Một số ít CSDL không coi giá trị `NULL` là bằng nhau, vì thế ràng buộc unique giữa `email` và `deletionToken` (`NULL`) có thể không được thực hiện.

6. Cải thiện giải pháp số 5 (nếu cần thiết) để đạt được kết quả cuối cùng ở trên.
