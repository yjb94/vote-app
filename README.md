## How to run

```
  npm install
  npm run start
```

[http://localhost:3000](http://localhost:3001) 에서 어플리케이션이 실행됩니다.


## Stacks

```
Framework: React.js
Back-end: Firebase(cloud-functions / realtime-database / hosting)
Language: TypeScript
State management: Recoil.js
Routing: react-router-dom
Styling: styled-component / Ant design
```

## Details

### 스토리

- 사용자는 투표를 생성할 수 있어야 한다 
- 투표 생성자는 제목을 입력할 수 있어야 한다 
- 투표를 생성하면 항목이 기본으로 3개가 생성되어야 한다 
- 투표 생성자는 투표 항목의 이름을 변경할 수 있다 
- 투표 생성자는 투표를 저장할 수 있어야 한다 
- 투표자 생성자는 투표를 삭제할 수 있어야 한다 
- 사용자는 만들어진 투표 리스트를 볼 수 있어야 한다 
- 사용자는 투표 리스트에서 제목, 생성자, 기간, 진행 중 여부를 확인 할 수 있어야 한다 
- 사용자는 투표 리스트에서 특정 투표를 클릭시 투표내용 상세보기를 할 수 있다 
- 사용자는 투표 리스트에서 진행중인 투표에 투표 할 수 있다 
- 사용자는 투표 결과를 텍스트로 확인할 수 있어야 한다 
- 투표 생성자는 투표 기간을 설정할 수 있다(시작, 종료) 
- 사용자는 종료시간이 지난 투표는 결과보기만 할 수 있다

### 요구사항
- unit test 
- github public repository에 소스를 등록

### 비고
- Firebase DB 주소가 미국 동부로 설정되어있어 데이터 로드에 약간의 시간이 소요됩니다.
- UI/UX는 ant design의 기본 설정대로 진행했습니다.
- 스토리의 내용대로 구현하였지만, 작성자의 의도가 완벽하게 드러나지는 않을 수도 있습니다.
- 요구사항의 unit test는 아직 project level에서 수행해 본 적이 없어서 진행하지 못했습니다.