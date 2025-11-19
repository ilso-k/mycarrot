'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const sampleProducts = [
    {
        title: '아이폰 14 프로 256기가 자급제',
        price: 1150000,
        region: '서울 강남구 역삼동',
        image: 'https://picsum.photos/seed/iphone/400/400',
        category: '디지털기기',
        description: '배터리 효율 95%입니다. 기스 하나도 없어요. 직거래 선호합니다.',
        sellerName: '당근이'
    },
    {
        title: '스타벅스 아메리카노 쿠폰',
        price: 3500,
        region: '서울 서초구 반포동',
        image: 'https://picsum.photos/seed/coffee/400/400',
        category: '티켓/교환권',
        description: '유효기간 넉넉합니다. 입금 확인되면 바로 보내드려요.',
        sellerName: '커피러버'
    },
    {
        title: '자전거 팝니다 (상태 꿀)',
        price: 150000,
        region: '경기도 성남시 분당구',
        image: 'https://picsum.photos/seed/bike/400/400',
        category: '스포츠/레저',
        description: '이사가게 되어서 급하게 팝니다. 상태 정말 좋아요.',
        sellerName: '라이더'
    },
    {
        title: '원목 식탁 의자 세트',
        price: 80000,
        region: '서울 송파구 잠실동',
        image: 'https://picsum.photos/seed/table/400/400',
        category: '가구/인테리어',
        description: '직접 가져가셔야 합니다. 튼튼해요.',
        sellerName: '가구점'
    },
    {
        title: '닌텐도 스위치 OLED',
        price: 320000,
        region: '서울 마포구 서교동',
        image: 'https://picsum.photos/seed/switch/400/400',
        category: '게임/취미',
        description: '풀박스입니다. 젤다 칩도 같이 드려요.',
        sellerName: '겜돌이'
    }
];

export default function SeedPage() {
    const [status, setStatus] = useState('대기 중...');

    const seedData = async () => {
        setStatus('데이터 등록 중...');
        try {
            const productsRef = collection(db, 'products');

            for (const product of sampleProducts) {
                await addDoc(productsRef, {
                    ...product,
                    likeCount: Math.floor(Math.random() * 50),
                    chatCount: Math.floor(Math.random() * 10),
                    timeAgo: '방금 전',
                    createdAt: new Date().toISOString(),
                    seller: {
                        name: product.sellerName,
                        avatar: `https://picsum.photos/seed/${Math.random()}/100/100`,
                        temperature: 36.5 + Math.random() * 5
                    }
                });
            }
            setStatus('완료! 5개의 상품이 등록되었습니다.');
        } catch (error) {
            console.error(error);
            setStatus('실패: ' + (error as any).message);
        }
    };

    return (
        <div style={{ padding: 40 }}>
            <h1>DB 초기 데이터 등록</h1>
            <p>상태: {status}</p>
            <button onClick={seedData} style={{ padding: '10px 20px', marginTop: 20 }}>
                데이터 등록하기
            </button>
        </div>
    );
}
