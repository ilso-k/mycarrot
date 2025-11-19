import { NextResponse } from 'next/server';
import { productService } from '@/service/productService';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, category, price, description, images, region, sellerName } = body;

        const newProduct = await productService.addProduct({
            title,
            category,
            price: Number(price) || 0,
            description,
            image: images[0] || 'https://picsum.photos/400/400', // Use first image or placeholder
            region,
            sellerName: sellerName || '익명'
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
