# 실시간 공유 문서
이 프로젝트를 통해 로그인한 유저들끼리 실시간으로 문서를 작성, 수정, 저장까지 가능하게 할 수 있다.

### Authors
양선종

***

## 프로젝트 시작하기
### 프로젝트 시작 전 준비사항
이 프로젝트는 기본적으로 Node.Js, Mongodb를 다운로드 한 상태에서 시작합니다.
각각에 대한 링크는 아래를 참조해주시길 바랍니다.

Link: [NodeJs](https://nodejs.org/en/, "노드 홈페이지로")

Link: [MongoDb](https://nodejs.org/en/, "몽고디비 홈페이지로")


+ 패키지 다운로드
    + 실행 파일 이름 : Backend, Frontend
        ```
        $ npm install
        ```

+ .env 설정
    + 실행 파일 이름 : Backend, Frontend
        ```
        $ mkdir .env
        ```
    + 중요 env 설정 
        + Frontend : Firebase
            Link: [FireBase](https://firebase.google.com/, "firebae")
            ```
            firebase 관련 env같은 경우 참조한 링크를 참조하여 사용해 주 시길 바랍니다.
            // 예시 입니다.
            // React 를 사용하기 때문에 반드시 REACT_APP_... 의 형식으로 설정해주시길 바랍니다.
            REACT_APP_FIREBASE_API_KEY = "Your Own Secret Firebase API Key"
            ```
        + Backend : MongoDB_URI
            ```
            MONGODB_URI = 사용자의 아틀란스 서버를 입력해주세요
            ```

### 프로젝트 준비 완료 후 시작하기
+ 실행 파일 이름 : Frontend
    ```
    클라이언트 접속

    > http://localhost:3000/ 으로 접속
    $ npm start
    ```
+ 실행 파일 이름 : Backend
    ```
    서버접속

    $ npm start
    ```

*****

## 프로젝트 기능 설명 <각 페이지 별로>
### 로그인 페이지 : http://localhost:3000/login
#### ● 로그인 및 회원가입을 지원하는 페이지
![login] (https://user-images.githubusercontent.com/76609548/194014119-9b8ee0c6-fbf0-465c-94aa-b009938c5675.png")

이 페이지에서 지원하는 기능은 다음과 같습니다.
1. 로컬 로그인 : passport-local 전략 이용
> 사용자는 회원가입시 작성한 자신의 이메일 및 비밀번호를 입력하여 문서목록이 작성된 위치로 이동할 수 있습니다.
> 만약 회원가입된 정보와 다른 정보의 입력시 로그인이 되지 않습니다.
> 로그인 하지 않은 사람의 경우 회원가입 버튼을 클릭하여 회원가입을 진행할 수 있도록 구성되어있습니다.

2. 로컬 회원가입
> 사용자는 개인의 이메일, 비밀번호, 닉네임을 작성하여 로그인에 필요한 정보를 등록 할 수 있습니다.
> 기존에 입력한 이메일 정보로 가입된 유저가 있을 경우 회원가입되지 않습니다.
> 회원가입이 성공적으로 되면 "회원가입이 완료되었습니다." 메시지와 함께 다시 로그인 페이지로 넘어가 로그인을 진행 할 수 있습니다.
> 이미 회원가입이 된 유저의 경우 로그인하기 버튼을 누르면 로그인 정보를 입력할 수 있게 합니다.

3. 소셜(구글) 회원가입
> 페이지 내 존재하는 "G" 버튼을 통해 "Google 회원가입"이 가능합니다.
>> Google 회원가입의 경우 Firebase auth 를 통해 기능 구현을 하였습니다.
> 기존 Google로 회원가입을 한 사람이 존재하는 경우 회원가입되지 않습니다.
> 회원가입이 성공적으로 되면 "회원가입이 완료되었습니다." 메시지와 함께 다시 로그인 페이지로 넘어가 로그인을 진행 할 수 있습니다.

4. 소셜(구글) 로그인 : passport-local 전략 활용
> 페이지 내 존재하는 "G" 버튼을 통해 "Google 로그인"이 가능합니다. [ 따로 이메일, 비밀번호 입력을 하지 않아도 가능]
>> Google 로그인의 경우 Firebase auth 및 passport-local 전략을 활용해 기능 구현을 하였습니다.
> 등록된 정보가 없으면 로그인에 실패합니다.

5. 참고사항
> 소셜 or 로컬 회원가입시 모든 정보들은 해당하는 서버의 USERS 관련 데이터베이스에 저장이 됩니다. 
> 소셜 or 로컬 로그인을 선택하여 로그인시 로그인 한 유저들에게 JWT 토큰이 발급되며 토큰은 로컬 스토리지에 저장이 됩니다.
> 로그인을 하지 않은 유저의 경우 "/login" 페이지를 제외한 모든 페이지에 대한 이용이 불가능 합니다.

로그인에 성공시 메인 페이지로 넘어가게 됩니다.

### 메인 페이지  : http://localhost:3000/
#### ● 모든 문서의 정보들을 보여주는 페이지 입니다.

![main] (https://user-images.githubusercontent.com/76609548/194014503-d5fb01eb-1a71-4b87-a6de-801f5f336d75.png)

이 페이지에서 지원하는 기능은 다음과 같습니다.
1. 로그인한 사람에 대한 정보
> 로그인한 사람에 대한 정보가 반영되어 나타납니다.

2. 작성 진행중인 문서에 대한 정보
> 작성 진행중인 문서에 대한 제목과 그 문서를 누가 만든지에 대한 정보가 반영이 되어 나타닙니다.
> 그 문서들은 서버의 데이터베이스 내에서 Docs 모델에 대한 정보들을 가져옵니다.
> 해당 문서 작업하기를 누르게 되면 'http://localhost:3000/작업할 문서id' 링크로 넘어가게 됩니다.

3. 내가 작성한 작업 문서로 이동하기
> 로그인한 유저가 만든 작업 문서 페이지로 이동합니다.
> 'http://localhost:3000/own/로그인한 유저 id'

4. 새로운 문서 작성하기
>  새로운 문서를 작성할 수 있는 페이지로 이동합니다.
> 'http://localhost:3000/makeDocs'

5. 로그아웃
> 로그아웃 버튼을 클릭하게 되면 사용자의 JWT 토큰이 로컬 스토리지에서 제거 됨과 동시에 로그인 페이지로 다시 넘어가게 됩니다.

### 문서 생성 페이지 : http://localhost:3000/makeDocs
#### ● 문서를 작업하기 전 만드는 문서를 생성하는 페이지입니다

![make] (https://user-images.githubusercontent.com/76609548/194014712-c09503a0-55b3-42ac-a32c-7f7b3baccd8f.png)

1. 문서 생성
> 특정 문서를 작업하기 위해서 해야하는 기능이며 [제목] 란에 정보를 입력하여 "제출" 버튼을 클릭 할 경우 서버에 저장이 되어짐과 동시에 메인 페이지로 넘어갑니다.
> 메인페이지에서는 생성한 문서 정보가 반영이 되어 나타납니다.

2. 문서 목록으로 돌아가기 버튼
> 사용자들은 문서를 생성하지 않아도 문서 목록으로 돌아가기 버튼을 통해 메인 페이지로 넘어갈 수 있습니다.

### 개인 문서 목록 페이지 : http://localhost:3000/own/로그인한 유저 Id
#### ● 개인이 생성한 문서를 따로 보여주는 페이지입니다.

![myPage] (https://user-images.githubusercontent.com/76609548/194015019-0ffd939b-ff2e-4af7-a3c6-72ce7e03a31f.png)

1. 문서를 생성한 적이 없을 경우
> 문서를 생성한 적이 없을 경우에 어떠한 목록도 뜨지 않으며 , "만드신 문서가 존재하지 않습니다" 가 화면에 렌더링이 되어집니다
2. 문서를 생성한 적이 없을 경우
> 기본적으로 화면은 "메인 페이지"의 형식으로 구성되어집니다. 
> 다만 개인이 생성한 문서 목록만을 따로 보여줍니다. 타인이 생성한 문서 목록들은 문서 목록에서 제거 된 상태로 화면에 표시 되어집니다.

### 문서 작업 페이지 'http://localhost:3000/작업할 문서 Id'   
#### ● 실시간 문서가 작성되는 페이지입니다.

**핵심 페이지 입니다.**

![liveDocs] (https://user-images.githubusercontent.com/76609548/194015069-1837c471-8ce6-4def-af50-893a6071e430.png)

1. 문서 불러오기
> 사용자가 메인 페이지 혹은 개인 문서 목록 페이지를 통해 작성할 문서를 선택하여 들어오게 될 경우 해당 문서에 대한 정보가 서버의 docs 데이터 베이스 내에서 불러와 집니다.
> 해당 데이터 베이스에서 가져오는 정보는 크게 title, content 가 있으며 각각의 역활은 제목 및 문서의 내용에 해당 합니다.
> 제일 마지막으로 사용자에 의해 저장된 정보들이 반영되어 문서 제목 및 내용란에 저장이 됩니다.

2. 문서 작성
> 사용자들이 textarea란에 텍스트를 입력할 경우 그 텍스트가 실시간으로 공유가 됩니다.
>> 클라이언트가 달라도 한 클라이언트에서 텍스트를 입력할시 다른 클라언트에서도 그 입력된 정보가 반영되어집니다.
>> 이 기능은 socket을 활용하여 구현했습니다. 하단의 링크를 참조
>> Link: [Socket](https://socket.io/, "socket 홈페이지로")

3. 문서 저장 기능
    * 문서 저장 기능은 총 두개의 기능으로 구현되었습니다.
        * 문서 자동 저장
            > 문서 자동 저장 기능의 경우 문서 작성 페이지를 들어간 시점부터 "20"초가 지날 때 마다 현재의 정보들을 자동적으로 저장이 됩니다.
            >>  해당 기능은 useInterval 이라는 커스텀 훅을 사용하였습니다.
            > 저장된 정보는 서버의 docs 데이터베이스에 반영이 되어집니다.
        * 문서 수동 저장
            > 문서 수동 저장 기능의 경우 사용자는 문서 자동 저장 시간과 상관 없이 진행이 되어집니다.
            > 문서에 대한 텍스트를 저장하고 싶을 때 저장버튼을 누르게 되면 해당 텍스트가 바로 서버의 docs 데이터베이스 내에서 업데이트 됩니다.
            > 수동 저장 버튼을 누른다 하더라도 해당 작성 페이지에서 나가지지 않으며 계속 작성할 수 있도록 되었습니다.
