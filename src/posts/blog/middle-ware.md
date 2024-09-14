---
title: "Express의 본체, 미들웨어에 대해 알아보자"
category: "Node.js"
date: "2024-09-01 21:00:00 +09:00"
desc: "Express 미들웨어에 대해 알아보자!"
thumbnail: "./images/middle-ware/mw.png"
alt: ""
---

## Express 프레임워크

해당 글의 주제인 미들웨어를 알아보기 전에 먼저 Node.js 에서 제공하는 Express에 대해 알아보겠습니다.

Node.js의 Express 프레임워크는 웹 애플리케이션과 API를 구축하는데 널리 사용되는 강력한 도구입니다.

**“Node.js 로 백엔드 개발이 가능하다!”** 이는 아마도 Express 프레임워크 덕분이지 않을까 생각이 듭니다.
<br/>

성능도 꽤 좋다고 알려져있습니다!
구글 개발자 형님들이 Javascript 런타임인 V8엔진을 워낙 기가막히게 만들었기 때문이 아닐까 생각이 드네요. (아마 Node.js 가장 큰 특징인 싱글스레드, 비동기 논블로킹I/O가 한 몫을 하지 않았을까?)
<br/>

아무튼 이러한 특성들로 인해 Express는 웹 개발에서 강력한 도구로 자리잡았습니다.

특히 오늘의 글 주제인 미들웨어 시스템은 Express의 핵심 기능 중 하나로, 개발자들에게 큰 유연성을 제공합니다.

<hr/>

## 미들웨어?

> 그래서 미들웨어가 뭔데?

1. **우선 미들웨어는 함수이자 express의 핵심입니다.**
   (미들웨어가 express의 전부라 해도 이상하지 않을 정도..)
   <br/>

2. **미들웨어의 미들(middle) 은 단어 뜻 그대로 중간에 위치하기 때문에 이런 이름이 붙여지게 된 것입니다.**

   어디 중간에 있냐면? 바로 **요청(request)**과 **응답(response)** 사이에 위치합니다.

   대강 그림을 그려보면 아래와 같습니다.

   ![](https://velog.velcdn.com/images/simsorry/post/b14d248f-343a-4361-ab34-4438ffa3cffd/image.png)

   미들웨어는 해당 위치에 존재하면서 요청과 응답을 조작하여 기능을 추가하기도, 나쁜 요청을 걸러내기도 합니다.
   <br/>

3. 주로 사용되는 매개변수는 4개가 있습니다. `req,res,next,err`

   - `req`는 클라이언트로부터의 HTTP 요청을, `res`는 서버에서 클라이언트로 보내는 HTTP 응답을 나타냅니다.

   - `err` 는 에러처리 미들웨어에서 주로 사용되는 인자로, 에러처리가 쉽게 되도록 도와줍니다.
   - 마지막으로 `next` 는 미들웨어간의 사이클이 이루어질 수 있도록 도와주는 녀석입니다.
     <br/>

<hr/>

## 미들웨어 사용방식

미들웨어는 `app.use`와 함께 사용됩니다.

`app.use(미들웨어)` 의 모양을 가지고 있습니다.

<br/>

**미들웨어가 실행되는 형태**

| 미들웨어가 실행되는 형태    | 설명                                            |
| --------------------------- | ----------------------------------------------- |
| `app.use(미들웨어)`         | 모든 요청에서 미들웨어 실행                     |
| `app.use(’/abc’,미들웨어)`  | abc 경로로 들어오는 요청에 미들웨어 실행        |
| `app.post(’/abc’,미들웨어)` | abc 경로로 들어오는 post 요청에서 미들웨어 실행 |

위 형태를 보면 미들웨어가 왜 함수인지 알 수 있습니다.

- `use` 함수에 대해서는 모든 요청에 대한 응답

- 하지만 첫번째 파라미터로 요청 주소를 기입할 시 해당 주소에 요청된거만 응답

- 더불어 `post`, `get`, `delete` 등등 다른 **HTTP의 메서드**를 붙여주면 그 범위를 더 좁힐 수 있습니다.

<br/><hr/>

## 미들웨어의 역할

미들웨어의 역할을 조금 더 자세히 알아보도록 하겠습니다.

미들웨어의 주 역할은 아래 4가지라고 말할 수 있습니다.

<br/>

1. **모든 코드 실행**

- 미들웨어는 요청이 들어오면 어떤 JavaScript 코드든 실행할 수 있습니다.
- 요청이 들어올 때마다, 로그 기록, DB 쿼리문 수행 등등을 시킬 수 있습니다.

```jsx
app.use((req, res, next) => {
  console.log(`지금 날짜는 ${new Date()}`)
  next()
})
```

<br/>

2. **요청 및 응답 객체를 변경**

- 미들웨어는 요청(req) 객체와 응답(res) 객체에 접근하여 이를 수정할 수 있습니다.
- 요청 객체를 수정하여 데이터나 속성을 포함시키거나, 응답 객체를 수정하여 헤더를 설정하거나 내용을 추가할 수 있습니다.

```jsx
app.use((req, res, next) => {
  req.requestTime = Date.now() // 요청 객체에 새로운 속성 추가
  res.setHeader("X-Powered-By", "Express") // 응답 헤더 설정
  next()
})
```

<br/>

3. **요청-응답 주기 종료**

- 미들웨어는 요청-응답 주기를 완전히 종료할 수 있습니다.
- 이는 클라이언트에게 응답을 보내거나, 리다이렉션을 수행하는 등의 방법으로 이루어집니다.
- 주기를 종료하면, 해당 요청에 대해 더 이상의 미들웨어나 라우트 핸들러가 실행되지 않습니다.

```jsx
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized") // 요청-응답 주기 종료
    return // 다음 미들웨어로 진행하지 않음
  }
  next()
})
```

<br/>

4. **다음 미들웨어 함수 호출**

- 미들웨어는 `next()` 함수를 호출하여 다음 미들웨어로 제어를 넘길 수 있습니다.
- 이는 미들웨어 체인을 따라 요청이 처리되도록 합니다.

  - **미들웨어 체인이란?**
    여러 미들웨어를 연결하여 사용하는 방식을 뜻하는 용어입니다.

    ```jsx
    app.use(
      (req, res, next) => {
        console.log("첫 번째 미들웨어")
        next()
      },
      (req, res, next) => {
        console.log("두 번째 미들웨어")
        next()
      },
    )
    ```

- `next()`를 호출하지 않으면, 요청 처리가 해당 미들웨어에서 멈추게 됩니다.

```jsx
app.use((req, res, next) => {
  console.log("첫 번째 미들웨어")
  next() // 다음 미들웨어로 제어 넘김
})

app.use((req, res, next) => {
  console.log("두 번째 미들웨어")
  next()
})
```

<br/><hr/>

## **여러 서드파티 미들웨어**

Express 생태계에는 많은 유용한 서드파티 미들웨어가 존재합니다.

### 1. `morgan 미들웨어`

```jsx
const morgan = require("morgan")

app.use(morgan("dev"))
```

- 요청과 응답에 대한 정보를 콘솔에 기록
- 인수로는 `dev`이외에 `combined`, `short`, `tiny`등이 존재
  - 내가 참고한 자료에서는 대게 개발환경에서는 `dev`, 배포 환경에서는 `combined`를 애용한다고 하네요..!
- `dev` 출력 결과
  <img src="https://velog.velcdn.com/images/simsorry/post/98ed6e96-ab45-4c94-a0d9-4199e059dd80/image.png" width="45%" height="n%">

- `combined` 출력 결과
  ![](https://velog.velcdn.com/images/simsorry/post/84c4ede3-adba-4f36-8c00-1584a98e9b8a/image.png)

<br/>

### 2. `static 미들웨어`

```jsx
app.use(express.static(__dirname + "/public"))
```

- static 미들웨어는 정적파일들을 제공하는 라우터 역할
- 기본적으로 expree에 의해 제공되기에 별도로 설치할 필요가 없음
- 함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정하면 설정 완료

<br/>

### 3. `body-parser 미들웨어`

```jsx
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
```

- 요청(req) 에 본문에 있는 데이터를 해석하여 req.body 객체에 담아주는 미들웨어

- express에 내장되어있으므로 따로 설치할 필요는 없음
- **이를 통해 우리가 데이터교환이 더 쉽게 가능해지는 것**
- 보통 폼 데이터나 AJAX 요청의 데이터를 처리
- 이미지,동영상,파일 데이터 등은 처리는 불가
  - 이는 `multer` 모듈을 통해 처리가 가능하다고 합니다.
- `extended:`
  - `extended: true` : qs모듈을 사용하여 쿼리 스트링 해결
  - `extended: false` : 노드의 querystring모듈을 사용하여 쿼리스트링 해결

<br/>

우선 직접 사용해 본 서드파티만 자세히 작성해보았으며,

위 작성한 미들웨어 이외에도 다양한 서드파티 미들웨어들이 존재합니다.

- **cookie-parser 미들웨어** : `req`에 동봉된 쿠키를 해석해 `req.cookies` 객체로 만들어주는 미들웨어

- **exoress-session 미들웨어** : 세션 관리용 미들웨어. 로그인 등의 기능을 구현할 때 사용하는 세션을 사용자 별로 `req.session` 객체 안에 유지시켜주는 미들웨어

- **multer 미들웨어** : 이미지, 동영상, 파일 데이터 등을 처리해주는 미들웨어

<br/><hr/>

## **에러처리 미들웨어**

에러 처리는 Express 애플리케이션에서 중요한 부분입니다.

Express는 기본적인 에러 처리 기능을 제공하지만, 커스텀 에러 처리 미들웨어를 사용하면 더 세밀한 제어가 가능합니다.

그리고 일반적으로 파일 가장 마지막에 위치시킨다고 합니다.

<br/>

**기본 에러 처리 미들웨어**

```jsx
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err.message)
})
```

이 미들웨어는 애플리케이션에서 발생하는 모든 에러를 캐치하고 처리합니다.
`next(error)`를 통해 전달된 에러는 이 미들웨어에서 처리된다고 보면 될 것 같습니다.

<br/>

**커스텀 에러 생성 및 전달**

```jsx
app.use((req, res, next) => {
  const error = new Error("인증 불가")
  error.status = 401
  next(error)
})
```

이 예제는 특정 조건에서 커스텀 에러를 생성하고 `next()`를 통해 에러 처리 미들웨어로 전달하는 방법입니다.

<br/>

**실전 에러 처리 미들웨어**

실제 개발에서는 조금 더 복잡한 에러처리가 필요할 수 있습니다.

해당 예제는 좀 더 상세한 에러처리 미들웨어 예시입니다.

```jsx
app.use((req, res, next) => {
  const error = new Error(`${res.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}
  res.status(err.status || 500)
  res.render("error")
})
```

- 요청된 라우트가 없을 경우 404 에러를 생성하고 이를 error 처리 미들웨어에 넘겨줍니다.

- error 처리 미들웨어는 발생한 모든 에러를 처리하며, 개발 환경에서는 상세한 에러 정보를, 프로덕션 환경에서는 제한된 정보만 제공합니다.

<br/><hr/>

## 결론

Express의 미들웨어는 강력하고 유연한 도구로, 웹 애플리케이션의 핵심 기능을 모듈화하고 확장하는데 중요한 역할을 합니다.

미들웨어 순서, 한 기능에 집중하는 작은 미들웨어 함수, 비동기 작업 시 적절한 `next()` 호출, 유연한 에러처리 등등을 유의하며 미들웨어를 사용한다면, 견고하고 유지보수가 쉬운 Node.js 애플리케이션을 구축할 수 있을 것이라고 생각이 듭니다!

<hr/>

## 참고

- **Node.js 교과서** **: 기본기에 충실한 노드제이에스 14 입문서**
- https://lakelouise.tistory.com/211
