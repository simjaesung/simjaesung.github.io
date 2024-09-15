---
title: "화살표 함수(arrow function)는 언제 써야할까?"
category: "JavaScript"
date: "2024-09-08 17:00:00 +09:00"
desc: "일반 함수와 화살표 함수 사용 기준 정하기"
thumbnail: "./images/arrow-function/af.png"
alt: ""
---

현재 참여중인 프로그램에서 현업에 계신 멘토님께 코드 리뷰를 받는 기회가 제공되었고, 배정받은 멘토님께서 많은 피드백을 남겨주셨지만 해당 피드백이 가장 눈에 띄었습니다.

> **일반 함수와 화살표 함수의 차이를 알고, 내가 사용하는 기준 명확하게 정의해야합니다.
> 개인적으론 자바스크립트를 사용한다면 이것에 대해 정리하지 않으면 안된다고 생각합니다.**

Javascript 코드를 작성하면서 화살표 함수를 사용했던 적이 없지는 않지만,

`“왜 이 부분에서 화살표 함수를 사용하셨나요?”` 라는 질문을 듣게 된다면,

간결해서,,? 즉시 실행시키기 위해,,? 솔직히 명확하게 대답할 자신이 없습니다.

그래서 해당 주제로 글을 작성하며 화살표 함수에 대해 깊게 알아보고,

언제 일반 함수를 쓸지 언제 화살표 함수를 쓸지 나름대로 사용 기준을 정해보려합니다.

<br/>

## 화살표 함수란?

ECMAScript 6 (ES6) 표준에서 도입된 함수를 정의하는 간결한 방법입니다.

기존 일반 함수를 선언하는데 사용하는 `function` 키워드 대신에 `⇒` 를 사용함으로써 더 쉽게 함수를 만들 수 있습니다.

```jsx
//일반 함수 정의
function add1(a, b) {
  return a + b
}

// => 를 사용하여 function 키워드 생략
const add2 = (a, b) => {
  return a + b
}

//단일 표현식의 경우 중괄호와 return 키워드 생략 가능
const add3 = (a, b) => a + b

//매개변수가 1개일 경우는 매개변수 소괄호 생략 가능
const square = a => a * a
```

단순하게 `=>` 키워드가 생긴 것 뿐이 아닌

- 단일 표현식(단순 return 문)일 경우는 중괄호와 return 키워드 생략 가능
- 매개변수가 1개일 경우 매개변수 소괄호 생략 가능

등등 정말 우리의 편의를 위해(?) 여러 생략도 가능하게 만들어주셨습니다.

그리고 이 화살표 함수는 [커피스크립트](https://namu.wiki/w/CoffeeScript)에서 많은 영감을 받았다는 이야기도 존재합니다.

<br/>

## 화살표 함수를 만든 의도

**‘기존 일반적으로 함수를 정의하는 방식이 편한데, 굳이 화살표 함수를 사용할 필요가 있을까?’**

화살표 함수에 처음 접했을 때 이런 생각이 들었던 기억이 있습니다.

(하지만 이번엔 다르다..!) 자바스크립트에 깊은 관심을 갖게된 저는 화살표 함수를 만든 의도가 궁금했습니다.

<br/>

최근에 우아한테크세미나에서 **생성AI로 똑똑하게 일하는 법**에 대한 강연을 진행한 적이 있었는데,

해당 강연에서 제안해준 생성AI에게 `CoT(Chain of Thought)` 를 하도록 유도하는 방식을 사용해보기로 했습니다.

> 해당 강연을 보시지 못한 분은 시간내어 보시는 것을 추천합니다!
>
> https://www.youtube.com/live/v2icwh-nyl4

<br/>

제가 사용하는 Claude AI 에게 TC39(Ecma International의 기술 위원회)의 사고를 가지게 한다음에 화살표 함수 제작 의도를 물어보고 저의 언어로 다시 정리해보았습니다.

화살표 함수는 아래와 같은 의도로 JavaScript를 더 강력하고 사용하기 쉬운 언어로 만들기 위한 것

1. **간결성 향상**

- 기존 함수 표현식 보다 더 짧고 간결한 문법을 제공함으로써 코드의 가독성을 높이고 작성하는데 시간을 줄이기 위함
- 특히 함수를 인자로 전달하는 경우가 많은 JavaScript에서, 화살표 함수를 통해 코드 단순화를 목표

2. **렉시컬 this 바인딩**

- JavaScript 개발자들이 자주 겪는 'this' 바인딩 문제를 해결하기 위함
- 화살표 함수를 통해 자신만의 'this'를 생성하지 않고 렉시컬 스코프의 'this'를 사용함으로써 이 문제를 해결하고자 했음

3. **함수형 프로그래밍 지원**

- JavaScript에서 함수형 프로그래밍 패턴의 사용이 증가함에 따라, 화살표 함수의 간결한 문법을 통해 이러한 패턴을 더 쉽게 구현할 수 있도록 하기 위함

4. **콜백 패턴 개선**

- JavaScript에서 자주 사용하는 콜백은 패턴을 화살표 함수를 통해 콜백을 더 간결하고 읽기 쉽게 만들어 주기 위함

5. **암묵적 반환**

- 단일 표현식 함수일 경우, return 키워드 없이 값을 반환할 수 있도록 더더욱 간결한 코드 작성이 가능하도록 하기 위함

<br/>

해당 의도들을 읽어보며 생각이든 것은

화살표 함수는 기존의 함수 선언 방식을 대체하려는 목적으로 만든 것이 아닌,
**개발자들에게 더 많은 선택지를 제공하고 상황에 따라 가장 적합한 방식을 선택할 수 있도록 만든 것이 아닐까?** 라는 생각이 들었습니다.

<br/>

## 화살표 함수를 피해야 할 상황

장점만 있을 것 같은 화살표 함수이지만, 이러한 화살표 함수가 결코 완벽한 문법은 아닙니다.

화살표 함수를 사용하지 말아야할 상황도 여러 존재하는데, 이는 기존 'this' 바인딩 문제 해결책으로 등장한 **렉시컬 this 바인딩**에서 비롯됩니다.

**`화살표 함수는 일반 함수와는 달리 자신만의 this를 가지지 않습니다.`**

<img src="https://velog.velcdn.com/images/simsorry/post/815247ed-ee80-41d3-9886-6174eeebf57d/image.png" width="80%" height="n%">

그래서 화살표 함수에서 this 키워드로 접근하면, 자신이 아닌 자신의 바로 바깥에 위치한 값을 가져옵니다.

이를 설명하는 대표적인 예시인 `객체 메서드`를 통해 살펴보겠습니다.

### 1. 객체 메서드

```jsx
const obj = {
  name: "재성",
  greet: () => {
    console.log(`Hello, ${this.name}`)
  },
}
obj.greet() // 출력: Hello, undefined

const obj = {
  name: "재성",
  greet() {
    console.log(`Hello, ${this.name}`)
  },
}
obj.greet() // 출력: Hello, 재성
```

객체 메서드를 일반함수로 선언하는 경우에는 this 를 선언한 위치의 객체를 본 것과 달리,

화살표 함수로 선언하는 경우에는 this를 객체 바깥에 있는 window를 가르킵니다.

자신을 this를 가질 수 없는 문제점은 객체 메서드만이 아닌 다양한 부분에서 대두될 수 있습니다.

<br/>

### **2. 프로토타입 메서드**

프로토타입 메서드에서 발생하는 this 바인딩 문제

```jsx
function Person(name) {
  this.name = name
}

const person = new Person("재성")
```

`화살표 함수`

```jsx
Person.prototype.greet = () => {
  console.log(`Hello, ${this.name}`)
}

person.greet()
// 출력: Hello, undefined
```

`일반 함수`

```jsx
Person.prototype.greet = function () {
  console.log(`Hello, ${this.name}`)
}

person.greet()
// 출력: Hello, 재성
```

<br/>

### **3. 동적 this가 필요한 이벤트 핸들러**

이벤트 핸들러에서 this 요소는 정말 중요합니다.

하지만 화살표 함수는 의도한 this를 가르키는데 방해가 될 수 있습니다.

`화살표 함수`

```jsx
button.addEventListener("click", () => {
  this.classList.toggle("on")
})
```

`일반 함수`

```jsx
button.addEventListener("click", function () {
  this.classList.toggle("on")
})
```

<br/>

### **4. call, apply, bind 메서드와 함께 사용할 때**

해당 메서드들은 this를 명시적으로 바인딩하려고 할 때 사용되는데, 화살표 함수는 이를 무시합니다.

`2개의 객체`

```jsx
const obj1 = { name: "심재" }
const obj2 = { name: "재성" }
```

`화살표 함수`

```jsx
const greet = () => {
  console.log(`Hello, ${this.name}`)
}

greet.call(obj1) // 출력: Hello, undefined
greet.apply(obj2) // 출력: Hello, undefined
```

`일반 함수`

```jsx
function greetCorrect() {
  console.log(`Hello, ${this.name}`)
}

greetCorrect.call(obj1) // 출력: Hello, 심재
greetCorrect.apply(obj2) // 출력: Hello, 재성
```

<br/>

### **5. 생성자 함수**

화살표 함수는 생성자로 사용될 수 없어, new 키워드와 함께 사용하면 오류가 발생합니다.

`화살표 함수`

```jsx
const Person = name => {
  this.name = name
}

const brian = new Person("재성") // TypeError: Person is not a constructor
```

`일반 함수`

```jsx
function Person(name) {
  this.name = name
}

const brianCorrect = new PersonCorrect("재성") // 정상 작동
```

<br/>

### **6. arguments 객체가 필요한 경우**

자바스크립트 함수에서는 `arguments` 라는 인수들을 담고 있는 배열 객체를 사용할 수 있지만,

화살표 함수는 자체 `arguments 객체`를 가지지 않습니다.

`화살표 함수`

```jsx
const sum = () => {
  return Array.from(arguments).reduce((acc, val) => acc + val, 0)
}

console.log(sum(1, 2, 3)) // ReferenceError: arguments is not defined
```

`일반 함수`

```jsx
function sum() {
  return Array.from(arguments).reduce((acc, val) => acc + val, 0)
}

console.log(sum(1, 2, 3)) // 출력: 6
```

<br/>

**화살표 함수 피해야하는 상황을 한줄 요약하자면!**

> this를 통해 함수를 작성하여 무언가 하려 할 때, 화살표 함수 사용은 일단 배제를 하면 좋을 것 같습니다.

<br/>

## 화살표 함수를 사용하면 좋은 상황

상단 소제목으로 둔, **`화살표 함수를 만든 의도`** 와 어느 정도 상통하는 주제입니다.

**`화살표 함수를 피해야 할 상황`** 에서 너무 다양한 예시를 들어둔 상황이라,

**`화살표 함수를 사용하면 좋은 상황`** 에 예시를 들어두지 않으면 화살표 함수가 섭섭해할 것 같습니다.

<br/>

### 1. 간단한 콜백 함수로 사용할 때

map, filter, reduce 등의 배열 메소드와 함께 사용할 때 화살표 함수를 사용하면 코드가 매우 간결해집니다.

`일반 함수 표현식 사용 (ES5 이전)`

```jsx
var numbers = [1, 2, 3, 4, 5]
var squared = numbers.map(function (n) {
  return n * n
})
console.log(squared) // 출력: [1, 4, 9, 16, 25]
```

`화살표 함수 사용`

```jsx
const numbers = [1, 2, 3, 4, 5]
const squared = numbers.map(n => n * n)
console.log(squared) // 출력: [1, 4, 9, 16, 25]
```

<br/>

### 2. 상위 스코프의 this를 그대로 사용해야 할 때

이벤트 핸들러나 타이머 함수 등에서는 외부 this를 참조해야할 일이 정말 많습니다.

자신만의 this를 가지지 않는 것이 상단에서 언급한 개발자들이 많이 겪었던 'this' 바인딩 문제를 해결해주었습니다.

`화살표 함수 등장 이전`

변수에 this 할당하는 Self Pattern을 통해 원하는 객체에 접근했었습니다.

```jsx
var counterVar = {
  count: 0,
  start: function () {
    var self = this
    setInterval(function () {
      self.count++
      console.log(self.count)
    }, 1000)
  },
}
counterVar.start()
```

`화살표 함수 등장 이후`

외부 this를 자동적으로 참조한다는 점에서 원하는 this를 가지기 위한 추가적인 작업이 필요없어졌습니다.

```jsx
const counter = {
  count: 0,
  start: function () {
    setInterval(() => {
      this.count++
      console.log(this.count)
    }, 1000)
  },
}
counter.start()
```

<br/>

### 3. 함수형 프로그래밍 패턴을 구현할 때

화살표 함수를 사용하면 함수 합성 및 고차함수를 더 쉽게 표현할 수 있습니다.

```jsx
const compose =
  (...fns) =>
  x =>
    fns.reduceRight((y, f) => f(y), x)
const addOne = x => x + 1
const double = x => x * 2
const addOneThenDouble = compose(double, addOne)
console.log(addOneThenDouble(3)) // 출력: 8
```

<br/>

### 4. 즉시 실행 함수(IIFE)로 사용할 때

`IIFE = Immediately Invoked Function Expression`

필요없는 전역 변수 생성을 줄이거나, private 한 변수를 만들기 위한 즉시 실행 함수를 쉽게 만들 수 있습니다.

```jsx
;(() => {
  const privateVar = "저는 외부에서 접근되기 싫은 변수에요."
  console.log(privateVar)
})()
```

<br/>

### 5. 메소드 체이닝에서 중간 함수로 사용할 때

this 바인딩이 필요 없는 경우에서 메소드 체이닝을 중간 함수로 사용할 때 가독성이 좋아집니다.

```jsx
const result = [1, 2, 3, 4, 5]
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((a, b) => a + b, 0)
console.log(result) // 출력: 12
```

<br/>

## 결론

화살표 함수는 다양한 측면에서 일반함수에 비해 많은 장점을 가지지만, 일반 함수의 모든 기능을 대변하지 못합니다.

따라서 자바스크립트를 사용하는 개발자는 각 함수 유형의 특성을 이해하고 상황에 맞게 선택해야 합니다.

일반 함수와 화살표 함수의 차이를 명확히 하는데 해당 글이 도움이 되길 바랍니다! 😊

<br/>

## 참고

- [https://inpa.tistory.com/entry/JS-📚-자바스크립트-화살표-함수-정리](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98-%EC%A0%95%EB%A6%AC)
- [https://jongminfire.dev/java-script-즉시실행함수-iife](https://jongminfire.dev/java-script-%EC%A6%89%EC%8B%9C%EC%8B%A4%ED%96%89%ED%95%A8%EC%88%98-iife)
- [https://velog.io/@yjh8806/화살표-함수와-일반-함수의-차이](https://velog.io/@yjh8806/%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98%EC%99%80-%EC%9D%BC%EB%B0%98-%ED%95%A8%EC%88%98%EC%9D%98-%EC%B0%A8%EC%9D%B4)
