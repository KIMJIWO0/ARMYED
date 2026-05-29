import { Clue, Room } from '../types';

export const CLUE_DATA: Record<string, Clue> = {
  sq1_erasedLog: {
    id: "sq1_erasedLog",
    title: "SQ-01: 지워진 기록 (총기관리대장)",
    room: "방 1. 생활관 (총기보간대 부근)",
    text: "22:15 — 이준철 이병 보관함 접근 확인 / 당직 이종혁",
    details: "이종혁 하사가 이준철 이병이 총기 보관함 근처를 서성이는 모습을 목격하고도 해당 상황 일지를 고의로 지웠음을 나타냅니다."
  },
  sq2_lockedLocker: {
    id: "sq2_lockedLocker",
    title: "SQ-02: 잠긴 관물대 (이준철의 일기)",
    room: "방 1. 생활관 (이준철의 관물대)",
    text: "극심한 군 생활 부적응, 도피 욕구, 우울함 및 탈영에 대한 비정상적인 집착이 기록된 일기장.",
    details: "이준철 이병이 심리적 붕괴 상태에 다다랐으며, 강력한 탈출 충동 하에 오작동을 계획했음이 드러나는 정서적 동기입니다."
  },
  sq3_hiddenRifle: {
    id: "sq3_hiddenRifle",
    title: "SQ-03: 숨겨진 총기 (천장 환풍구)",
    room: "방 1. 생활관 (이준철의 침상 위 환풍구)",
    text: "생활관 천장 틈새 환풍구를 뜯어 열자 먼지 쌓인 틈에 고이 놓인 실종 K2 소총이 발견됩니다.",
    details: "총포의 약실과 노리쇠는 개방되어 있으나, 결정적으로 내부에 '수지 실탄(탄약)'은 단 1발도 들어있지 않은 무장 상태입니다."
  },
  sq4_dvdSecret: {
    id: "sq4_dvdSecret",
    title: "SQ-04: DVD 안의 비밀 (김지우의 선반)",
    room: "방 1. 생활관 (김지우 병장의 선반)",
    text: "케이스 내 숨겨진 자필 메모: '지우야, 이준철 오늘 총기 쪽 계속 보던데. 네가 좀 봐둬. — 종혁' 및 22:05 타각된 PX 구매 대장 영수증.",
    details: "김지우 병장은 이종혁 하사의 특별 감시 요청을 받았으나, 사건 발생 전후인 22:05에 근무지를 이탈해 PX를 이용했음이 확정되어 알리바이가 성립합니다."
  },
  sq5_storageTrace: {
    id: "sq5_storageTrace",
    title: "SQ-05: 창고의 흔적 (보일러 공구 창고)",
    room: "방 2. 당직실 및 연계 창고",
    text: "창고 안쪽 바닥의 흙먼지 위에 깊게 박힌 선명한 아웃솔 무늬. 보급 전투화 275mm 규격으로, 검수 결과 이종혁 하사의 군화 자국과 완전히 대조 매칭됩니다.",
    details: "이종혁 하사가 상황 근무 도중 은밀하게 부대 창고 구석구석을 홀로 수색했거나 모종의 흔적을 남겼 음을 입증합니다."
  }
};

export const ROOMS: Room[] = [
  {
    id: "room1",
    number: "내무 거주 구역",
    name: "방 1. 생활관",
    subtitle: "총기 분실 사건의 시발점이 된 야간 내무반 구역",
    unlocked: true,
    time: "2004.05.13 00:10",
    description:
      "어두운 침상, 철제 구형 관물함, 그리고 적색 조명이 야간의 비극적인 무게감을 드러내고 있는 공포와 적막의 내무 거소.",
    required: null,
  },
  {
    id: "room2",
    number: "지휘 통제 구역",
    name: "방 2. 당직실",
    subtitle: "왜곡된 장부와 은밀한 부사관 비밀 금고가 공존하는 당직 통제소",
    unlocked: false,
    time: "2004.05.13 00:35",
    description:
      "구형 유선 통신기, 군용 백그라운드 무전 수신음, 그리고 미로 같은 공구 부품 창고 방으로 직접 연결되는 긴장감 도는 밤의 행정반.",
    required: "sq1_erasedLog",
  },
];
