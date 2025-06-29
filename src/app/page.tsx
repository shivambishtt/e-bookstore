"use client"
import { IProduct } from '@/models/product.model'
import React, { useEffect, useState } from 'react'

function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetch("/api/products");
        
      } catch (error) {

      }
    }
  }, []);
  return (
    <div>

    </div>
  )
}

export default Home
