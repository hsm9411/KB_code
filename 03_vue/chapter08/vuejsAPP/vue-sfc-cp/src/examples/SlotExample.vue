<template>
  <section class="page">
    <!--
      slot은 "컴포넌트를 진짜 재사용 가능하게 만드는 핵심 도구
      slot을 처음 배우면 보통 이렇게 생각합니다.
      "그냥 태그 안에 내용을 넣는 거 아닌가요?"
      맞습니다. 처음 출발은 맞습니다.
      하지만 slot은 단순히 내용 삽입만 하는 기능이 아닙니다.
      이 기능은 결국  "자식이 틀을 만들고, 부모가 내용을 통제한다"
      라는 컴포넌트 설계 철학으로 이어집니다.

      --------------------------------------------------
      [slot이 필요한 이유]
      --------------------------------------------------

      예를 들어 카드 컴포넌트를 만든다고 가정해 보겠습니다.

      카드의 겉모양은 항상 비슷합니다.
      - 바깥 박스
      - 제목 영역
      - 본문 영역
      - 버튼 영역

      그런데 실제 내용은 매번 달라집니다.
      - 회원 정보 카드
      - 상품 소개 카드
      - 공지 카드
      - 이벤트 카드

      이때 자식 컴포넌트가 제목, 본문, 버튼까지 전부 고정해 버리면
      재사용성이 낮아집니다.

      그래서
      - 자식은 "틀"만 만들고
      - 부모는 "안에 들어갈 내용"을 결정하게 합니다.

      이때 사용하는 자리가 바로 slot입니다.

      --------------------------------------------------
      [이 예제는 3단계 흐름으로 봐야 합니다]
      --------------------------------------------------

      1. SlotCard (기본 slot 사용)
         - 기본 슬롯과 명명된 슬롯을 사용
         - 카드라는 틀은 같지만 안의 내용은 부모가 다르게 넣음
         - "컴포넌트 재사용"의 출발점

      2. LayoutFrame(레이아웃까지 slot으로)
         - slot을 레이아웃 수준으로 확장
         - header, sidebar, content, footer를 각각 부모가 채움
         - "화면 틀 자체도 컴포넌트화할 수 있다"는 걸 보여줌

      3. ProductList(범위 슬롯)
         - 범위 슬롯(scoped slot)
         - 자식이 가진 데이터를 부모 슬롯에서 사용
         - 이 시점부터 slot은 단순 HTML 삽입이 아니라,
           "자식 데이터 기반의 부모 렌더링"으로 발전함

      --------------------------------------------------
      [slot을 정의하면...]
      --------------------------------------------------

      slot은 그냥 구멍이 아닙니다.
      slot은 "재사용 가능한 틀"과 "유연하게 바뀌는 내용"을 분리하는 장치입니다.

      기본 슬롯은 내용 넣는 자리, 명명된 슬롯은 여러 위치를 분리하는 자리,
      범위 슬롯은 자식의 데이터를 부모 렌더링에 연결하는 자리입니다.   
      slot을 배우는 목적은 문법 암기가 아니라
      "컴포넌트를 더 유연하게 설계하는 방법"을 익히는 데 있습니다.
    -->

    <h1>슬롯 예제</h1>

    <p class="guide">
      기본 슬롯, 명명된 슬롯, 범위 슬롯을 한 화면에서 확인할 수 있습니다.
    </p>

    <div class="card-grid">
      <SlotCard>
        <template v-slot:header>
          <h3>회원 정보 카드</h3>
        </template>

        <template v-slot:default>
          <p>이름: 김자바</p>
          <p>직무: 백엔드 개발자</p>
          <p>설명: 구조는 카드지만 내용은 부모가 자유롭게 넣습니다.</p>
        </template>

        <template v-slot:footer>
          <button class="primary-btn">상세 보기</button>
        </template>
      </SlotCard>

      <SlotCard>
        <template v-slot:header>
          <h3>상품 소개 카드</h3>
        </template>

        <template v-slot:default>
          <p>Vue 실전 강의</p>
          <p>컴포넌트 재사용과 UI 구성을 학습합니다.</p>
          <p>같은 카드 틀에 서로 다른 내용을 끼워 넣는 구조입니다.</p>
        </template>

        <template v-slot:footer>
          <button class="dark-btn">구매하기</button>
        </template>
      </SlotCard>
    </div>

    <h2 class="sub-title">명명된 슬롯으로 Layout 구성</h2>

    <LayoutFrame>
      <template v-slot:header>
        <h2>관리자 대시보드</h2>
      </template>

      <template v-slot:sidebar>
        <ul class="menu">
          <li>회원 관리</li>
          <li>주문 내역</li>
          <li>설정</li>
        </ul>
      </template>

      <template v-slot:default>
        <p>오늘의 방문자 수: 128명</p>
        <p>신규 주문: 23건</p>
        <p>레이아웃 구조를 통째로 컴포넌트화한 예제입니다.</p>
      </template>

      <template v-slot:footer>
        <strong>마지막 업데이트: 10분 전</strong>
      </template>
    </LayoutFrame>

    <h2 class="sub-title">범위 슬롯</h2>

    <ProductList :items="products">
      <template v-slot:badge="slotProps">
        <span class="badge" :class="{ active: slotProps.sale }">
          {{ slotProps.sale ? "SALE" : "NORMAL" }}
        </span>
      </template>

      <template v-slot:default="slotProps">
        <div class="product-box">
          <strong>{{ slotProps.item.name }}</strong>
          <p>{{ slotProps.item.price.toLocaleString() }}원</p>
        </div>
      </template>
    </ProductList>
  </section>
</template>

<script>
import SlotCard from "../components/slot/SlotCard.vue";
import LayoutFrame from "../components/slot/LayoutFrame.vue";
import ProductList from "../components/slot/ProductList.vue";

export default {
  name: "SlotExample",
  components: {
    SlotCard,
    LayoutFrame,
    ProductList,
  },
  data() {
    return {
      products: [
        { id: 1, name: "Vue 마스터 클래스", price: 45000, sale: true },
        { id: 2, name: "Spring API 실습", price: 39000, sale: false },
        { id: 3, name: "React UI 패턴", price: 42000, sale: true },
      ],
    };
  },
};
</script>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
}

.guide {
  color: #555;
  margin-bottom: 24px;
  line-height: 1.7;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 30px;
}

.primary-btn,
.dark-btn {
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
}

.primary-btn {
  background: #2f80ed;
  color: white;
}

.dark-btn {
  background: #222;
  color: white;
}

.sub-title {
  margin: 34px 0 14px;
}

.menu {
  margin: 0;
  padding-left: 18px;
  line-height: 1.8;
}

.badge {
  min-width: 80px;
  text-align: center;
  padding: 8px 10px;
  border-radius: 999px;
  background: #e9edf5;
  color: #666;
  font-size: 13px;
  font-weight: bold;
}

.badge.active {
  background: #ffe0e0;
  color: #d63c3c;
}

.product-box p {
  margin: 6px 0 0;
  color: #555;
}
</style>
