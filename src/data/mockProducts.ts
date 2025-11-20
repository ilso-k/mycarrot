export interface Product {
    id: string;
    title: string;
    price: number;
    region: string;
    image: string;
    timeAgo: string;
    chatCount: number;
    likeCount: number;
    category: string;
    description: string;
    createdAt?: string; // ISO timestamp for sorting
    seller: {
        name: string;
        avatar: string;
        temperature: number;
    };
}

export const mockProducts: Product[] = [
    {
        id: '1',
        title: '아이폰 14 프로 256기가 자급제',
        price: 1150000,
        region: '서울 강남구 역삼동',
        image: 'https://picsum.photos/seed/iphone/400/400',
        timeAgo: '10초 전',
        chatCount: 3,
        likeCount: 12,
        category: '디지털기기',
        description: '배터리 효율 95%입니다. 기스 하나도 없어요. 직거래 선호합니다.',
        seller: {
            name: '당근이',
            avatar: 'https://picsum.photos/seed/avatar1/100/100',
            temperature: 37.5,
        },
    },
    {
        id: '2',
        title: '스타벅스 아메리카노 쿠폰',
        price: 3500,
        region: '서울 서초구 반포동',
        image: 'https://picsum.photos/seed/coffee/400/400',
        timeAgo: '5분 전',
        chatCount: 1,
        likeCount: 4,
        category: '생활/가공식품',
        description: '유효기간 넉넉합니다. 입금 확인되면 바로 보내드려요.',
        seller: {
            name: '커피러버',
            avatar: 'https://picsum.photos/seed/avatar2/100/100',
            temperature: 36.5,
        },
    },
    {
        id: '3',
        title: '자전거 팝니다 (상태 꿀)',
        price: 150000,
        region: '경기도 성남시 분당구',
        image: 'https://picsum.photos/seed/bike/400/400',
        timeAgo: '1시간 전',
        chatCount: 5,
        likeCount: 20,
        category: '스포츠/레저',
        description: '이사가게 되어서 급하게 팝니다. 상태 정말 좋아요.',
        seller: {
            name: '라이더',
            avatar: 'https://picsum.photos/seed/avatar3/100/100',
            temperature: 40.2,
        },
    },
    {
        id: '4',
        title: '원목 식탁 의자 세트',
        price: 80000,
        region: '서울 송파구 잠실동',
        image: 'https://picsum.photos/seed/table/400/400',
        timeAgo: '3시간 전',
        chatCount: 2,
        likeCount: 8,
        category: '가구/인테리어',
        description: '직접 가져가셔야 합니다. 튼튼해요.',
        seller: {
            name: '가구점',
            avatar: 'https://picsum.photos/seed/avatar4/100/100',
            temperature: 36.8,
        },
    },
    {
        id: '5',
        title: '닌텐도 스위치 OLED',
        price: 320000,
        region: '서울 마포구 서교동',
        image: 'https://picsum.photos/seed/switch/400/400',
        timeAgo: '6시간 전',
        chatCount: 10,
        likeCount: 45,
        category: '게임/취미',
        description: '풀박스입니다. 젤다 칩도 같이 드려요.',
        seller: {
            name: '겜돌이',
            avatar: 'https://picsum.photos/seed/avatar5/100/100',
            temperature: 38.0,
        },
    },
];
