---
title: Quản lý State React 2019
description: "\x1CBạn đã không còn cần đến một thư viện để quản lý state nữa."
tag: reactjs
thumbnail: /assets/state-management-2019.jpg
date: '2019-03-05'
---
Bạn ngồi cùng bàn nhậu với những lập trình viên React và muốn câu chuyện trở nên gay gắt, hãy nhắc đến chủ để state management.

Mỗi người có một sở thích riêng. Fandom Redux yêu thích các action và reducer và saga và thunk và đủ các kiểu. Fandom MobX lại thích observer và action và việc ghi đè object mặc định…

Dĩ nhiên, cả hai đều cho rằng đó là cách đơn giản nhất.

![You don't need Redux](/assets/you-dont-need-redux.png)



> Nhưng đây là 2019, có lẽ bạn đã không còn cần đến một thư viện để quản lý state nữa.

Bạn đang xây dựng một ứng dụng đơn giản với ít thuộc tính được chia sẻ giữa các component? Hãy dùng local state.

### Sức mạnh của local state

Trái với những ý kiến phổ biến, bạn sẽ không cần một thư viện quản lý state phức tạp để xây dựng một
form đăng nhập, chỉ thế này là đủ:

```jsx
class Field extends React.Component {
  state = {
    value: '',
    error: '',
  }
  onChange = event =>
    this.setState(
      {
        value: event.target.value,
      },
      this.validate
    )
  validate = () => {
    const { value } = this.state
    if (!someValidationRequirement(value)) {
      this.setState({
        error: 'My lovely error',
      })
    }
  }
  render() {
    const { value, error } = this.state
    return (
      <>
        <input value={value} onChange={this.onChange} />
        {error}
      </>
    )
  }
}
```

Đây là một input field với hai state là value và error. Khi nội dung được gõ, hàm `onChange` được kích hoạt và cập nhật state. State thay đổi làm component render lại và user có thể nhìn thấy được nội dung họ đã nhập.

Field validation được kích hoạt sau khi cập nhật state, nó sẽ kiểm tra những điều kiện cần thiết và cập
nhật lỗi nếu phát hiện. Bạn thể có dùng state error này để cảnh báo lỗi đến người dùng (đổi màu chữ hay hiện nội dung lỗi).

Một form đăng nhập có thể sử dụng lại component này hai lần:

```jsx
class Login extends React.Component {
  render() {
    return (
      <div>
        <Field />
        <Field />
      </div>
    )
  }
}
```

### Truyền state

Rồi vậy làm thế nào để form đăng nhập có thể lấy được những giá trị này, và những validations này sẽ hoạt động cùng nhau ra sao?

Đúng vậy, thực tế thì form đăng nhập mới là nơi cần dùng tới những giá trị từ input.

```jsx
const Field = ({ onChange, value, error }) => (
    <>
        <input value={value} onChange={onChange} />
        {error}
    </>
)

class Login extends React.Component {
    state = {
        user: {
            value: "",
            error: ""
        },
        pass: {
            value: "",
            error: ""
        },
        error: ""
    }
    validate = () => {
        const { user, pass } = this.state;
        if (!someValidation(user.value) || !someValidation(pass.value)) {
            this.setState({
                error: "A lovely form error"
            });
        }
    }
    onChangeUser = event => this.setState({
        user: {
            value: event.target.value
        }
    }, () => {
        if (!someValidation(event.target.value)) {
            this.setState({
                user: {
                    value: event.target.value,
                    error: "A user error oh my"
                }
            })
        }
    }
    onChangePass = event => this.setState({
        pass: {
            value: event.target.value
        }
    }, () => {
        if (!someValidation(event.target.value)) {
            this.setState({
                pass: {
                    value: event.target.value,
                    error: "A password error oh my"
                }
            })
        }
    }
    render() {
        const { user, pass, error } = this.state;
        return (
            <form>
                <Field value={user.value} error={user.error} onChange={this.onChangeUser} />
                <Field value={pass.value} error={pass.error} onChange={this.onChangePass} />
                {error}
            </form>
        )
    }
}
```

Có thể thấy được những đoạn code ở trên bị lặp khá nhiều, nhưng quan trọng là nó chạy tốt, và bạn không cần dùng thư viện.

Ta vẫn sử dụng kỹ thuật cũ, kết hợp chuyển dữ liệu và logic ra khỏi component field, sau đó copy nó ra rồi điều chỉnh lại.

Bạn có thể cảm nhận được độ phức tạp của kỹ thuật này nếu càng nhiều trường nữa được thêm vào.

### Context API

React Context API mới giải quyết vấn đề này bằng cách tạo những ad-hoc contexts giúp chia sẻ state giữa
nhiều component. Nhờ đó ta có thể đem những logic trở lại input fields.

```jsx
const FormContext = React.createContext()
```

Dòng code trên sẽ tạo ra một form context. Về cơ bản ta có thể hình dung mỗi form trong ứng dụng sẽ
tương ứng với một context này.

```jsx{30,34}
class Field extends React.Component {
    state = {
        value: this.props.value,
        error: ""
    }
    onChange = event => this.setState({
        value: event.target.value
    }, this.validate);
    validate = () => {
        const { value } = this.state;
        if (!someValidationRequirement(value)) {
            this.setState({
                error: "My lovely error"
            })
        } else {
            this.props.returnValue(this.state.value)
        }
    }
    render() {
        const { value, error } = this.state;
        return (
            <>
                <input value={value} onChange={this.onChange} />
                {error}
            </>
        )
    }
}
const ContextField = ({ name }) => (
    <FormContext.Consumer>
        {(state) => (
            <Field value={name} returnValue={value => state.onChange(value, name) />
        )}
    </FormContext>
)
```

Vẫn giữ component input field ban đầu (quản lý state và logic cục bộ). Khác ở chỗ khi form được validate thành công, `this.props.returnValue` sẽ được gọi và trả về giá trị lại cho context.

`ContextField` có tác dụng truyền hàm `returnValue` và giá trị khởi tạo cho input field.

Với context chúng ta có thể render những field này ở mọi nơi, hay ở những file khác nhau, và chúng đều có thể trao đổi dữ liệu và logic với form.

Form đăng nhập cuối cùng sẽ trông như này:

```jsx{25,29}
class Login extends React.Component {
  state = {
    user: '',
    pass: '',
    error: '',
    onChange: (value, field) =>
      this.setState(
        {
          [field]: value,
        },
        this.validate
      ),
  }
  validate = () => {
    const { user, pass } = this.state
    if (!someValidation(user) || !someValidation(pass)) {
      this.setState({
        error: 'A lovely form error',
      })
    }
  }
  render() {
    const { error } = this.state
    return (
      <FormContext.Provider value={this.state}>
        <ContextField name="user" />
        <ContextField name="pass" />
        {error}
      </FormContext.Provider>
    )
  }
}
```

Bây giờ chúng ta đã có được một form với chức năng validate, trao đổi dữ liệu thông qua context, và hiển thị field bằng cách truyền cho nó props `name`.

Với cách này bạn có thể thêm nhiều trường với rất ít sự thay đổi. Bạn còn có thể cải thiện thêm như thêm kiểu của input field, hay truyền validation qua props...

Nhưng mà vẫn còn nữa nha.

### State với Hooks 🍻

Với việc phát hành chính thức của Hooks kể từ React 16.8, chúng ta có được một công cụ hỗ trợ viết code React gọn gàng và đơn giản hơn bao giờ hết.

Nếu chưa biết về React Hooks, bạn có thể đọc thêm [ở đây](https://reactjs.org/docs/hooks-intro.html).

_Tips_: đừng bỏ qua video tuyệt vời giới thiệu React Hooks của [@dan_abramov](https://twitter.com/dan_abramov) tại React Conf 2018.

Dưới đây là một input field hoạt động tương tự được viết bằng React Hooks.

```jsx
const Field = ({ value, returnValue }) => {
  const [state, setState] = useState(value)
  const [error, setError] = useState('')
  useEffect(
    () => {
      if (!someValidationRequirement(state)) {
        setError('My lovely error')
      } else {
        returnValue(state)
      }
    },
    [state]
  )
  return (
    <>
      <input value={state} onChange={event => setState(event.target.value)} />
    </>
  )
}
```

`useState` cho phép bạn khai báo một biến state. Biến được khai báo đầu tiên chính là giá trị state, biến được khai báo thứ hai là phương thức để thay đổi giá trị đó.

`useEffect` cho phép bạn khai báo một side effect, mà ở đây là chạy validate form mỗi khi state thay đổi. Giá trị thứ hai được truyền vào - `[state]` cho biết function sẽ chỉ được thực hiện khi biến state thay đổi.

Bạn có thể làm tiếp input field bằng việc sử dụng `useContext` và kết thúc với việc viết một logic tương tự nhưng ít code hơn nhiều.

### Constate với useContext

Thay vì loay hoai với `useContext`, tôi có một gợi ý sử dụng [Constate](https://github.com/diegohaz/constate). Đó là thư viện ưa thích của tôi vài tháng trở lại đây kể từ khi dùng Context API.

Bạn sẽ thực sự ngạc nhiên về những gì nó đem lại:

```jsx{7}
function useForm() {
    const [user, setuser] = useState("");
    const [pass, setpass] = useState("");
    const [error, setError] = useState("");
    return { user, pass, error, setUser, setPass, setError };
}
const FormContainer = createContainer(userForm);
const ContextField = ({ name }) => (
    const state = useContext(FormContainer.Context);
    return <Field value={state[name]} returnValue={state[`set${name}`} />
)
function Error() {
    const { error, setError, user, pass } = useContext(FormContainer.Context);
    useEffect(() => {
        if (!someValidation(user) || !someValidation(pass)) {
            setError("A lovely form error")
        }
    }, [user, pass])
    return (
        {error}
    )
}
function Login() {
    <ContextField.Provider>
        <ContextField name="user" />
        <ContextField name="pass" />
        <Error />
    </ContextField.Provider>
}
```

**Cách hoạt động:**

1. Khai báo một custom hook với những state và handler cần thiết.
2. Hook trả về những API của nó như một object.
3. Sử dụng phương thức `createContainer` của Constate để gộp custom hook vào một container.
4. Vẫn giống như trước, `ContextField` về cơ bản là một context-based wrapper. Nó nhận thuộc tính `name` và sử dụng nó để lấy giá trị từ state. Trong trường hợp này ta có thể chủ động quyết định hàm `setX` nào sẽ được dùng.
5. `Error` là một phương thức mới. Nhờ có context, ta có thể tách phần xử lý lỗi vào component này. Một lần nữa ta sử dụng `useEffect` để chạy những validation khi user hay pass thay đổi.
6. Form đăng nhập trở nên đơn giản hơn bao giờ hết, chỉ việc render context, fields và error.



`youtube:SneCkM0bJq0`

> Chúc mọi người có một ngày làm việc với nhiều niềm vui.
